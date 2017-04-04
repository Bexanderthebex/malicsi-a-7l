const express = require('express');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

var routes = require('./routes/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// place session
//sha256 of the string 'malicsi' (minus quotes)
app.use(cookieSession({secret: '65508d52c495cc86e75eed713f253d9777c27fb2bda2701a50581334b95f4ac2'}));

// public files
app.use('/', express.static(path.join(__dirname, 'public')));

// place other routing stuff
app.use(routes);

app.listen(3000, function(){
	console.log('Server running at localhost:3000');
});
