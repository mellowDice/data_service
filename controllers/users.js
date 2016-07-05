var express = require('express');
var client = require('../redis/redis')
var q = require('q');
var utils = require('../redis/utils');

var router = express.Router();

router.route('/add')
  .post(function(req, res) {
    var user = req.body.user;
    var id = req.body.id;
    var mass = req.body.mass;
    var zombie = req.body.zombie;
    utils.addUser(user, id, mass, zombie, client)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.error(err);
    });
});

router.route('/:user_id', client)
  .get(function(req, res) {
    console.log(req.params.user_id);
    utils.getUser(req.params.user_id, client)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      console.error(err);
  });
});

module.exports = router;