var redis = require('../redis');

exports.add = function(data) {
  var user = "user:" + data.user;
  var data = {
    mass: data.mass,
    zombie: data.zombie,
  }
  redis.hmset(user, JSON.stringify(data));
}

exports.get = function(data) {

  redis.get().hgetall("user");
}