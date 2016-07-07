var q = require('q');

// ********** EXPORTING ALL HELPER FUNCTIONS ********** \\

module.exports.addUser = addUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserById = getUserById;
module.exports.setObject = setObject;
module.exports.getAllObjects = getAllObjects;
module.exports.getObjectById = getObjectById;
module.exports.setTerrain = setTerrain;
module.exports.getTerrain = getTerrain;
module.exports.addPlayer = addPlayer;
module.exports.deletePlayer = deletePlayer;
module.exports.getPlayerById = getPlayerById;


// ********* ERROR HANDLING ********** \\

function handleError(resolve, reject) {
  return function(err, data) {
    if(err === null) {
      resolve(data);
    } else{
      reject(err);
    }
  }
}

// ********** USER HANDLING ********** \\

function addUser(id, zombies, client){
  return q.Promise(function(resolve, reject){
    client.multi()
    .hmset('user:' + id, 'id', id, 'zombies', zombies)
    .lrem('users', -1, 'user' + ':' + id)
    .lpush('users', 'user' + ':' + id)
    .exec(handleError(resolve, reject));
  });
}

function deleteUser(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .del('user:' + id)
    .exec(handleError(resolve, reject));
  });
}

function getUserById(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall('user:' + id)
    .exec(handleError(resolve, reject))
  });
}

function addZombie(id, zombie, client) {
  return q.Promise(function(resolve, reject){
    client.multi()
    .hmset('user:' + id, 'id', id, 'zombies', zombies)
    .lpush()
    .lpush('users', 'user' + ':' + id)
    .exec(handleError(resolve, reject));
  });
}
// ********** TERRAIN OBJECTS HANDLING ********** \\

function setObject(type, data, client) {
  return q.Promise(function(resolve, reject) {
    for (var key in data) {
      client.multi()
      .hmset(type + ':' + data[key].id, 'id', data[key].id, 'x', data[key].x, 'y', data[key].y, 'z', data[key].z)
      .lpush(type, type + ':' + data[key].id)
      .exec(handleError(resolve, reject));
    }
  });
}

function getObjectById(type, id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall(type + ':' + id)
    .exec(handleError(resolve, reject))
  });
}

// ********** GET ALL OBJECTS AND USERS ********** \\

function getAllObjects(type, client) {
  var results = [];
  return q.Promise(function(resolve, reject) {
    client.multi()
    .lrange(type, 0, -1)
    .exec(function(err, indexes) {
      if (indexes[0].length > 0) {
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
              resolve(results.filter(function(val) {
                return val !== null; 
              }));
            }
          });
        }
      } else {
        resolve([]); 
      }
    });
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
      .exec(handleError(resolve, reject));
    }
  })
}

function getTerrain(client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .lrange('terrain', 0, -1)
    .exec(handleError(resolve, reject));
  }); 
}

// ********** PLAYER HANDLING ********** \\

function addPlayer(id, mass, client){
  console.log('adding!'); 
  return q.Promise(function(resolve, reject){
    client.multi()
    .hmset('player:' + id, 'id', id, 'mass', mass)
    .lpush('players', 'player' + ':' + id)
    .exec(handleError(resolve, reject));
  });
}

function deletePlayer(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .del('player:' + id)
    .exec(handleError(resolve, reject));
  });
}

function getPlayerById(id, client) {
  return q.Promise(function(resolve, reject) {
    client.multi()
    .hgetall('player:' + id)
    .exec(handleError(resolve, reject)); 
  });
}
