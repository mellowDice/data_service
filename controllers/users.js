var express = require('express');
var router = express.Router();

var Users = require('../models/users');

router.route('/add').post(function(req, res) {
  var data = req.body;
  Users.add(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      res.json('user', {user: data});
    }
  });
});

router.get('/id', function(req, res) {
  var data = 'user:' + req.user;
  Users.get(function(err, data) {
    res.json('user', {user: data})
  });
});

module.exports = router;