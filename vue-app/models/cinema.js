const mongoose = require('mongoose')

const cinemaSchema = new mongoose.Schema({
  cinema_id: Number,
  cinema_name: String,
  address: String,
  city: String,
  county: String,
  postcode: String,
  lat: Number,
  lng: Number,
  distance: Number,
  logo_url: String
})

module.exports = mongoose.model('Cinema', cinemaSchema)
