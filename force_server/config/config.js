const Twit = require('twit')
const { consumerKey, consumerSecret, accessToken, accessTokenSecret} = require('../keys/constants.js');

const T = new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
  timeout_ms: 60*1000,
})

module.exports = {
  T
}
