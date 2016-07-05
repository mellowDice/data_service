var q = require('q');
var _ = require('underscore');

// setting up export functions
module.exports.setTerrain = setTerrain;
module.exports.getTerrain = getTerrain;
module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.setObject = setObject;
module.exports.getAllObjects = getAllObjects;
module.exports.getObjectById = getObjectById;

// ********** USER HANDLING ********** \\

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

// ********** TERRAIN HANDLING ********** \\

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

// ********** TERRAIN OBJECTS HANDLING ********** \\

function setObject(type, data, client) {
  return q.Promise(function(resolve, reject) {
    for (var key in data) {
      client.multi()
      .hmset(type + ':' + data[key].id, 'id', data[key].id, 'x', data[key].x, 'y', data[key].y, 'z', data[key].z)
      .lpush(type, type + ':' + data[key].id)
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

function getAllObjects(type, client) {
  var results = [];
  return q.Promise(function(resolve, reject) {
    client.multi()
    .lrange(type, 0, -1)
    .exec(function(err, indexes) {
      console.log(indexes[0].length);
      for (var i = 0; i < indexes[0].length; i++) {
        client.multi()
        .hgetall(indexes[0][i])
        .exec(function(err, data) {
          if (err !== null) {
            reject(err);
            return;
          }
          results.push(data[0]);
          if(results.length === indexes[0].length) {
            resolve(results);
          }
        });
      }
    })
  });
}

function getObjectById(type, id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall(type + ':' + id)
    .exec(function(err, data) {
      if(err === null){
          resolve(data);
      } else{
          reject(err);
      }
    })
  });
}
