var q = require('q');


// setting up export functions
module.exports.addUser = addUser;
module.exports.getUser = getUser;
// module.exports.setFood = setFood;
// module.exports.getFood = getFood;
// module.exports.setObstacle = setObstacle;
// module.exports.getObstacle = getObstacle;

function addUser(user, id, mass, zombie, client){
  return q.Promise(function(resolve, reject){
    client.multi()
    .hmset(user + ':' + id, 'mass ' + mass, 'zombie ' + zombie)
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

// function setFood(data) {
//   for (var i in data) {

//   }
// }





