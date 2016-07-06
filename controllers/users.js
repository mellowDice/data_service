var express = require('express');
var client = require('../redis/redis')
var q = require('q');
var utils = require('../redis/utils');

var router = express.Router();

router.route('/add')
.post(function(req, res) {
  var id = req.body.id;
  var mass = req.body.mass;
  var zombie = req.body.zombie || null;
  utils.addUser(id, mass, zombie, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.route('/get_all')
.get(function(req, res) {
  utils.getAllObjects('users', client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  })
})

router.route('/:user_id', client)
.get(function(req, res) {
  utils.getUserById(req.params.user_id, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.route('/delete/:user_id', client)
.get(function(req, res) {
  utils.deleteUser(req.params.user_id, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

module.exports = router;