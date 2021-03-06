var express = require('express');
var client = require('../redis/redis')
var q = require('q');
var utils = require('../redis/utils');

var router = express.Router();

// q.Promise.prototype.handleError = function() {

// };

router.route('/add')
.post(function(req, res) {
  var id = req.body.id;
  var zombie = '';
  utils.addUser(id, zombie, client)
  .then(function(data) {
    res.json(data);
  })
  .catch(function(err) {
    console.error(err);
  });
});

router.route('/add_zombie')
.post(function(req, res) {
  var id = req.body.id;
  var zombie = req.body.zombie; 
  utils.getUserById(req.body.id, client)
    .then(function(data) {
      console.log('user-data', data, zombie); 
      var zombies = data[0]['zombies'] + ' ' + zombie;
      console.log('zombies', zombies); 
      utils.addUser(id, zombies, client)
        .then(function(data) {
          res.json(data); 
        })
        .catch(function(err) {
          console.error(err); 
        }); 
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