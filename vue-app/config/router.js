const router = require('express').Router();
const cinemas = require('../controllers/cinemas');

router.route('/cinemas')
  .get(venues.index)

module.exports = router;
