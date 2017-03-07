const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));

var routes = require('./routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// place session

// place other routing stuff
app.use(routes);

app.listen(3000, function(){
	console.log('Server running at localhost:3000');
});