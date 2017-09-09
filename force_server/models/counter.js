const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let CounterSchema = new Schema({
  name: {
    type: String, 
    required: 'name is required'
  },
  count: {
    type: Number,
    required: 'count is required',
    default: 0
  }
})

module.exports = mongoose.model('Counter', CounterSchema)
