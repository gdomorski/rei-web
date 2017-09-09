const express = require('express')
const _ = require('underscore')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Product = require("./models/products")
const News = require('./models/news')
const Counter = require('./models/counter')
const cors = require('cors')

// TODO Double-check the env variable when deploying to heroku (e.g. mongolab)
const mongoHost = 'mongodb://rei:test@ds039115.mlab.com:39115/gdomorski'
mongoose.connect(mongoHost, err => {
  if (err) {
    console.error("There was an error connecting to the MongoDB server.")
    throw err
  }
})




const { postSentiment } = require('./api_calls')
const { T } = require('./config/config.js')
const routes = require('./routes')
const server = app.listen(5000, err => {
  console.log('Listening @ http://localhost:5000/')
})




const io = require('socket.io')(server)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const publishTweet = async (socket, itemToSearchFor, category, tweet) => {
  let sentiment = await postSentiment(tweet.text)

  const primarySentiment = sentiment.probabilities[0].label
  const filters = itemToSearchFor.sentiment
  const isGlobalReiTweets = !category

  console.log(
    'PUBLISHING TWEET',
    filters.includes(primarySentiment),
    primarySentiment,
    filters,
    tweet.text
  )

  if(filters.includes(primarySentiment)) {
    let newText = tweet.text.slice(0, tweet.text.lastIndexOf('http'))
    socket.emit('myroom', {
      text: newText,
      name: tweet.user.name,
      screenName: tweet.user.screen_name,
      img: tweet.entities.media ? tweet.entities.media[0].media_url : "",
      profileImg: tweet.user.profile_image_url_https
    })
  }


  if (isGlobalReiTweets) {
    if (primarySentiment === 'positive') {
      Counter.findOneAndUpdate({ name: 'positive' }, { $inc: { count: 1 } }).exec()
    } else if (primarySentiment === 'negative') {
      Counter.findOneAndUpdate({ name: 'negative' }, { $inc: { count: 1 } }).exec()
    } else if (primarySentiment === 'neutral') {
      Counter.findOneAndUpdate({ name: 'neutral' }, { $inc: { count: 1 } }).exec()
    }
  }
}



io.on('connection', socket => {
  console.log('user connected')

  let twitterSet = new Set()
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  let twitterStream

  socket.on('room', async data => {
    let itemToSearchFor

    if(data.category === 'products') {
      itemToSearchFor = await Product.findOne({name: data.room})
    } else if (data.category === 'news') {
      itemToSearchFor = await News.findOne({name: data.room})
    } else {
      itemToSearchFor = {feedTxt: ['@REI', '@rei', '@Rei'], sentiment: ['positive'], name: 'REI'}
    }

    const track = itemToSearchFor.feedTxt
    twitterStream && twitterStream.stop()
    twitterStream = T.stream('statuses/filter', { track, language: "en" })

    const throttledTweetProcessor = _.throttle(publishTweet.bind(null, socket, itemToSearchFor, data.category), 3000)
    twitterStream.on('tweet', throttledTweetProcessor)

    console.log('SUBSCRIBED TO TRACK', track)
  });
});




routes(app);
