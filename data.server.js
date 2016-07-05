var express = require('express');
var redis = require('./redis/redis');
var config = require('./config');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json({ limit:1024*1024*20, type:'application/json' });
var urlencodedParser = bodyParser.urlencoded({ extended:true, limit:1024*1024*20, type:'application/x-www-form-urlencoding' })

var app = express();
app.use(jsonParser);
app.use(urlencodedParser);

var port = 3000;
// ROUTES FOR OUR API
// =============================================================================
app.use('/users', require('./controllers/users'));
app.use('/food', require('./controllers/food'));
app.use('/obstacles', require('./controllers/obstacles'));
app.use('/terrain', require('./controllers/terrain'));
app.use('/flush', require('./controllers/redis'));


app.listen(port, function() {
  console.log("Listening on 3000");
});