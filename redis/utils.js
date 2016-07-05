var q = require('q');
var _ = require('underscore');

// setting up export functions
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.setFood = setFood;
module.exports.getAllFood = getAllFood;
module.exports.getFoodById = getFoodById;
module.exports.setObstacle = setObstacle;
module.exports.getAllObstacles = getAllObstacles;


function addUser(user, id, mass, zombie, client){
  return q.Promise(function(resolve, reject){
    client.multi()
    .hmset(user + ':' + id, 'mass', mass, 'zombie', zombie)
    .exec(function(err, data){
      if(err === null){
          resolve(data);
      }else{
          reject(err);
      }
    });
  });
}

function getUser(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall('user:' + id)
    .exec(function(err, data) {
      if(err === null){
          resolve(data);
      }else{
          reject(err);
      }
    })
  });
}

function setFood(data, client) {
  return q.Promise(function(resolve, reject) {
    for (var key in data) {
      client.multi()
      .hmset("food:" + data[key].id, 'x', data[key].x, 'y', data[key].y, 'z', data[key].z)
      .exec(function(err, data) {
        if (err === null) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    }
  });
}

function getAllFood(client) {
  return q.Promise(function(resolve, reject) {
    // fill in redis iteration function
  });
}

function getFoodById(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall('food:' + id)
    .exec(function(err, data) {
      if(err === null){
          resolve(data);
      } else{
          reject(err);
      }
    })
  });
}



