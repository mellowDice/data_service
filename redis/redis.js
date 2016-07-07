var redis = require('redis');

var client = redis.createClient('6379', redis);

client.on('connect', function() {
  console.log('Redis connected');
});

module.exports = client;