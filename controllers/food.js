var express = require('express');
var client = require('../redis/redis')
var q = require('q');
var utils = require('../redis/utils');

var router = express.Router();

router.route('/add')
  .post(function(req, res) {
    var response = req.body.food;
    utils.setObject('food', response, client)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.route('/get_all', client)
  .get(function(req, res) {
    utils.getAllObjects('food', client)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.error(err);
  });
});

router.route('/:food_id', client)
  .get(function(req, res) {
    utils.getObjectById('food', req.params.food_id, client)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.error(err);
  });
});


module.exports = router;