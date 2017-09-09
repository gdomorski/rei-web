const jwt = require('jsonwebtoken')
const fs = require('fs')
const fetch = require('fetch-everywhere')
const FormData = require('form-data')
const { T } = require('../config/config.js')
const privateKey = fs.readFileSync('./keys/einstein_platform.pem', 'UTF-8')
const Counter = require('../models/counter')
const Product = require('../models/products')


/*----------------------*/
//CORE API CALLS...

const postSentiment = async document => {
  const token = await createToken()
  const body = JSON.stringify({ modelId: 'CommunitySentiment', document })
  const res = await fetch('https://api.einstein.ai/v2/language/sentiment', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body
  })
  return await res.json()
}


const getTweets = async (text, category, item) => {
  const res = await T.get('search/tweets', { q: text, lang: "en", count: 35 })
  // console.log(res, 'RESPONSE')
  let resultsArr = [];


  //filtering the twitter results through Salesforce Einstein
  return await Promise.all(res.data.statuses.filter(async tweet => {
    let sentiment = await postSentiment(tweet.text)
    let primarySentiment = sentiment.probabilities[0].label
    if (text.includes('rei sale')) {
      if (primarySentiment === 'positive') {
        Counter.findOneAndUpdate({ name: 'positive' }, { $inc: { count: 1 } }).exec()
      } else if (primarySentiment === 'negative') {
        Counter.findOneAndUpdate({ name: 'negative' }, { $inc: { count: 1 } }).exec()
      } else if (primarySentiment === 'neutral') {
        Counter.findOneAndUpdate({ name: 'neutral' }, { $inc: { count: 1 } }).exec()
      }
    }
    if(text.includes('rei sale') && sentiment.probabilities[0].label === 'positive') {
      return true
    }
    if(category === 'news' && sentiment.probabilities[0].label === 'positive') {
      return true
    }
    if(category === 'products'){
      itemToSearchFor = await Product.findOne({name: item})
      console.log(tweet.text, sentiment.probabilities[0].label)
      if(itemToSearchFor.sentiment.indexOf(sentiment.probabilities[0].label) !== -1){
        return true;
      }
    }

  }))
  return await resultsArr
}

const createToken = async () => {
  const now = Math.floor(new Date().getTime() / 1000)
  const details = {
    sub: 'greg.domorski@gmail.com',
    aud: 'https://api.einstein.ai/v2/oauth2/token',
    exp: now + 86400
  }
  const assertion = jwt.sign(details , privateKey, { algorithm: 'RS256' })

  const res = await fetch('https://api.einstein.ai/v2/oauth2/token', {
    method: 'POST',
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${assertion}`,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
  const tokenObject = await res.json()
  const token = tokenObject.access_token
  return token
}


//Always good to keep track of requests to Einstein to make sure we don't go over usuage
const getAPIUsage = async () => {
  const token = await createToken()
  const res = await fetch('https://api.einstein.ai/v2/apiusage', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await res.json()
}



/*----------------------*/
//EXPERIMENTAL... PHASE 2

const createDataSet = async () => {
  const token = await createToken()
  const body  = new FormData()
  body.append('name', 'Bla Bla Beach')
  body.append('labels', 'beach,mountain')
  body.append('type', 'image')
  const res = await fetch('https://api.einstein.ai/v2/vision/datasets', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      ...body.getHeaders()
    },
    body
  })
  return await res.json()
}

const deleteDataSet = async (type, id) => {
  const token = await createToken()
  const res = await fetch(`https://api.einstein.ai/v2/${type}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}

const getDataSets = async type => {
  const token = await createToken();
  const res = await fetch(`https://api.einstein.ai/v2/${type}/datasets`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  return await res.json()
}

// const postVision = async () => {
//   const token = await createToken()
//   const body  = new FormData()
//   body.append('modelId', '1011927')
//   body.append('sampleLocation', 'https://media-cdn.tripadvisor.com/media/photo-s/0f/4a/5f/34/cliff-path-at-one-end.jpg')
//
//   const res = await fetch('https://api.einstein.ai/v2/vision/predict', {
//     method: 'POST',
//     headers: {
//       'Authorization': 'Bearer ' + token,
//       ...body.getHeaders()
//     },
//     body
//   })
//   return await res.json()
// }

module.exports = {
  getTweets,
  postSentiment,
  createToken,
  createDataSet,
  deleteDataSet,
  getAPIUsage,
  getDataSets
}
