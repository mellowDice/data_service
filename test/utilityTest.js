var assert = require('assert');
var client = require('fakeredis').createClient('test');
var utils = require('../redis/utils');

describe('Utility Test', function() {
  beforeEach(function() {
    client.flushdb();
  });

  afterEach(function() {
    client.flushdb();
  });

  it('addUser should add user data', function(done) {
    var user = utils.addUser('001', '10', 'zombie:003', client);
    user.done(function() {
      client.hgetall('user:001', function(err, data) {
        assert.equal(data, {'mass 10': 'zombie zombie:003'});
        done();
      })
    });
  });

});
