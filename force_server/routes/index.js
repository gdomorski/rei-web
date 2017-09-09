const { postSentiment, createToken, createDataSet,
        deleteDataSet,getTweets, getAPIUsage,getDataSets } = require('../api_calls')


const Products = require('../controllers/products.js')
const News = require('../controllers/news.js')
const Counter = require('../controllers/counter.js')

module.exports = app => {
  app.get('/sentiment/:text', async (req, res) => {
    const sentiment =  await postSentiment(decodeURI(req.params.text))
    res.status(200).json(sentiment)
  })
  app.get('/data/vision', async (req, res) => {
    const visionDataSets = await getDataSets('vision')
    res.status(200).json(visionDataSets)
  })

  app.get('/data/language', async (req, res) => {
    const languageDataSets = await getDataSets('language')
    res.status(200).json(languageDataSets)
  })

  app.get('/create-vision-data', async (req, res) => {
    const allDataSets = await createDataSet('vision')
    res.status(200).json(allDataSets)
  })

  app.get('/image', async (req, res) => {
    const allVisionData = await postVision()
    res.status(200).json(allVisionData)
  })

  app.get('/data/vision/:id', async (req, res) => {
    const deleteData = await deleteDataSet('vision', decodeURI(req.params.text))
    res.status(200).json(deleteData)
  })

  app.route('/products')
    .get(Products.list_all_products)
    .post(Products.create_a_product)

  app.route('/products/:slug')
    .get(Products.read_a_product)
    .put(Products.update_a_product)
    .delete(Products.delete_a_product)

  app.route('/news')
    .get(News.list_news)
    .post(News.create_news)

  app.route('/news/:newsId')
    .get(News.read_news)
    .put(News.update_news)
    .delete(News.delete_news)

  app.route('/counter')
    .get(Counter.list_counter)
    .post(Counter.create_counter)

  app.route('/counter/:id')
    .put(Counter.update_counter)

  app.route('/tweets')
     .post(async (req, res) => {
      let twitterData = await getTweets(req.body.tweets, req.body.category, req.body.room)

      //get rid of duplicate tweets
      let twitterSet = new Set()
      twitterData  = twitterData.filter(eachTweet => {
        let firstTenCharacters = eachTweet.text.slice(0,10)
        if (twitterSet.has(firstTenCharacters)){
          return false;
        } else {
          twitterSet.add(firstTenCharacters)
          return true;
        }
      }).map(eachTweet => {
        let newText = eachTweet.text.slice(0, eachTweet.text.lastIndexOf('http'))
        return ({
          text: newText,
          name: eachTweet.user.name,
          screenName: eachTweet.user.screen_name,
          img: eachTweet.entities.media ? eachTweet.entities.media[0].media_url : "",
          profileImg: eachTweet.user.profile_image_url_https
        }
      )}
    )
    res.status(200).json(twitterData)
  })

}
