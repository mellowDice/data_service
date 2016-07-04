var express = require('express');
var redis = require('./redis');
var config = require('./config');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

var port = 3000;


// ROUTES FOR OUR API
// =============================================================================
app.use('/users', require('./controllers/users'));
// app.use('/food', require('./controllers/food'));
// app.use('/obstacles', require('./controllers/obstacles'));


var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});