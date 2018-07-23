const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Cinema = require('../models/cinema')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, db => {
  db.dropDatabase()

  Cinema
    .create([{
      'cinema_id': 42846,
      'cinema_name': 'Queen of Hoxton - Rooftop Cinema Club',
      'address': '1 Curtain Road - Shoreditch',
      'city': 'London',
      'county': '',
      'postcode': 'EC2A 3JX',
      'lat': 51.52177,
      'lng': -0.08184,
      'distance': 0.48061621659191,
      'logo_url': 'https://d2z9fe5yu2p0av.cloudfront.net/chainlogos/uk/UK-1808-sq.jpg'
    }, {
      'cinema_id': 24095,
      'cinema_name': 'Electric Cinema Shoreditch',
      'address': '64-66 Redchurch Street',
      'city': 'London',
      'county': 'Greater London',
      'postcode': 'E2 7DP',
      'lat': 51.524239,
      'lng': -0.07405,
      'distance': 0.54499033321746,
      'logo_url': 'https://d2z9fe5yu2p0av.cloudfront.net/chainlogos/uk/UK-2022-sq.jpg'
    }, {
      'cinema_id': 10261,
      'cinema_name': 'Rich Mix Cinema',
      'address': '35-47 Bethnal Green Road',
      'city': 'London',
      'county': 'Greater London',
      'postcode': 'E1 6LA',
      'lat': 51.524288,
      'lng': -0.07318,
      'distance': 0.57510748785209,
      'logo_url': 'https://d2z9fe5yu2p0av.cloudfront.net/chainlogos/uk/UK-0-sq.jpg'
    }, {
      'cinema_id': 10261,
      'cinema_name': 'Rich Mix Cinema',
      'address': '35-47 Bethnal Green Road',
      'city': 'London',
      'county': 'Greater London',
      'postcode': 'E1 6LA',
      'lat': 51.524288,
      'lng': -0.07318,
      'distance': 0.57510748785209,
      'logo_url': 'https://d2z9fe5yu2p0av.cloudfront.net/chainlogos/uk/UK-0-sq.jpg'
    }, {
      'cinema_id': 42068,
      'cinema_name': 'Close-Up Film Centre',
      'address': '97 Sclater Street',
      'city': 'London',
      'county': 'Greater London',
      'postcode': 'E1 6HR',
      'lat': 51.523571,
      'lng': -0.07204,
      'distance': 0.64268529800021,
      'logo_url': 'https://d2z9fe5yu2p0av.cloudfront.net/chainlogos/uk/UK-0-sq.jpg'
    }, {
      'cinema_id': 9531,
      'cinema_name': 'Barbican Centre',
      'address': 'Silk Street',
      'city': 'London',
      'county': 'Greater London',
      'postcode': 'EC2Y 8DS',
      'lat': 51.520142,
      'lng': -0.0929,
      'distance': 0.67541836304927,
      'logo_url': 'https://d2z9fe5yu2p0av.cloudfront.net/chainlogos/uk/UK-0-sq.jpg'
    }])
    .then(venues => console.log(`${venues.length} venues created!`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close())
})
