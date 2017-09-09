const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the product'
  },
  headline: {
    type: String,
    required: 'Kindly enter the headline of the product'
  },
  feedTxt: {
    type: Array,
    required: 'Kindly enter the name of the product'
  },
  uri: {
    type: String,
    required: 'Kindly enter the uri of the product'
  },
  icon: {
    type: String,
    required: 'Kindly enter the icon of the product'
  },
  highlightedProduct: {
    type: String,
    required: "Kindly enter in the top product"
  },
  highlightedProductSellPrice: {
    type: Number,
    required: "Kindy enter in the top product sell price"
  },
  productLink: {
    type: String,
    required: "Kindly enter in the top product url"
  },
  sentiment: {
    type: [{
      type: String,
      enum: ['positive', 'neutral', 'negative']
    }],
    default: ['positive']
  }
})

module.exports = mongoose.model('Products', ProductSchema)
