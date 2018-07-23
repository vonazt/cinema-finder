const Cinema = require('../models/cinema')

function index (req, res, next) {
  Cinema
    .find()
    .then(cinemas => res.json(cinemas))
    .catch(next)
}

module.exports = {
  index
}
