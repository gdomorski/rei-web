const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let NewsSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the product'
  },
  headline: {
    type: String,
    required: 'Kindly enter the headline of the product'
  },
  feedTxt: {
    type: String,
    required: 'Kindly enter the name of the product'
  },
  uri: {
    type: String,
    required: 'Kindly enter the uri of the product'
  },
  sentiment: {
    type: [{
      type: String,
      enum: ['positive', 'neutral', 'negative']
    }],
    default: ['positive']
  }
})

module.exports = mongoose.model('News', NewsSchema)
