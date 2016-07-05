var q = require('q');

var client = require('../redis/redis')
var express = require('express');
var utils = require('../redis/utils');

var router = express.Router();

router.route('/add')
  .post(function(req, res) {
    console.log(req.body)
    var response = req.body;
    utils.setTerrain(response, client)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.error(err);
  });
});

router.route('/get')
  .get(function(req, res) {
    utils.getTerrain(client)
    .then(function(data) {
      res.send(data);
    })
    .catch(function(err) {
      console.error(err);
  });
})

module.exports = router;