var express = require('express');
var client = require('../redis/redis')
var q = require('q');
var utils = require('../redis/utils');

var router = express.Router();

router.route('/add')
.post(function(req, res) {
  var id = req.body.id;
  var mass = req.body.mass;
  utils.addPlayer(id, mass, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.route('/get_all')
.get(function(req, res) {
  utils.getAllObjects('players', client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  }); 
}); 

router.route('/:player_id', client)
.get(function(req, res) {
  utils.getPlayerById(req.params.player_id, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.route('/delete/:player_id', client)
.get(function(req, res) {
  utils.deletePlayer(req.params.player_id, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

module.exports = router;