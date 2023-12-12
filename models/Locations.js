const mongoose = require('mongoose')

const Schema = mongoose.Schema

const placesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  rating: {
    type: String,
    required: true
  },
  placeType: {
    type: String,
    required: true
  },
}, { timestamps: true })

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  places: [placesSchema]
}, { timestamps: true })

module.exports = mongoose.model('Location', locationSchema)