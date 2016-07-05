var q = require('q');
var _ = require('underscore');

// setting up export functions
module.exports.setTerrain = setTerrain;
module.exports.getTerrain = getTerrain;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.setFood = setFood;
module.exports.getAllFood = getAllFood;
module.exports.getFoodById = getFoodById;
module.exports.setObstacle = setObstacle;
module.exports.getAllObstacles = getAllObstacles;
module.exports.getObstacleById = getObstacleById;


function setTerrain(data, client) {
  return q.Promise(function(resolve, reject) {
    console.log('data', data.length);
    var length = data.length;
    for (var i = 0; i < length; i++) {
      console.log(data[i]);
      client.multi()
      .lpush("terrain", data[i])
      .exec(function(err, data) {
        if (err === null) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    }
  })
}

function getTerrain(client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .lrange('terrain', 0, -1)
    .exec(function(err, data) {
      if (err === null) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

function addUser(user, id, mass, zombie, client){
  return q.Promise(function(resolve, reject){
    client.multi()
    .hmset(user + ':' + id, 'mass', mass, 'zombie', zombie)
    .exec(function(err, data){
      if(err === null){
          resolve(data);
      } else{
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

// ********** DRY THE BELOW FNs INTO ONE OBJECT FUNCTION ********** \\

function setFood(data, client) {
  return q.Promise(function(resolve, reject) {
    for (var key in data) {
      client.multi()
      .hmset('food:' + data[key].id, 'x', data[key].x, 'y', data[key].y, 'z', data[key].z)
      .lpush('food', 'food:' + data[key].id)
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
    client.multi()
    .lrange('food', 0, -1)
    .exec(function(err, data) {
      if (err === null) {
        resolve(data);
      } else {
        reject(err);
      }
    })
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

function setObstacle(data, client) {
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

function getAllObstacles(client) {
  return q.Promise(function(resolve, reject) {
    // fill in redis iteration function
  });
}

function getObstacleById(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall('obstacle:' + id)
    .exec(function(err, data) {
      if(err === null){
          resolve(data);
      } else{
          reject(err);
      }
    })
  });
}



