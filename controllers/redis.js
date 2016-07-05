var express = require('express');
var client = require('../redis/redis')
var q = require('q');

var router = express.Router();

router.route('/')
  .get(function(req, res) {
    client.flushdb(function(err, success) {
      if (err === null) {
        console.log('DB flushed');
        res.json('Successful flush');
      } else {
        console.error(err);
        res.json(err);
      }
    });
});


module.exports = router;