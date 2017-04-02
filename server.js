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

app.use((req, res, next) => {
	if (req.session.user === undefined) {
		if (req.originalUrl.startsWith('/login')) {
			next();
		} else if (req.originalUrl.startsWith('/assets')) {
			next();
		} else if (req.originalUrl.startsWith('/controllers')) {
			next();
		} else if (req.originalUrl.startsWith('/css')) {
			next();
		} else if (req.originalUrl.startsWith('/fa')) {
			next();
		} else if (req.originalUrl.startsWith('/fonts')) {
			next();
		} else if (req.originalUrl.startsWith('/js')) {
			next();
		} else if (req.originalUrl.startsWith('/services')) {
			next();
		} else if (req.originalUrl.startsWith('/frontend_modules')) {
			next();
		} else {
			res.redirect('/login.html');
		}
	} else {
		if (req.originalUrl.startsWith('/login')) {
			res.redirect('/home-page.html');
		} else {
			next();
		}
	}
});

// public files
app.use('/', express.static(path.join(__dirname, 'public')));

// place other routing stuff
app.use(routes);

app.listen(3000, function(){
	console.log('Server running at localhost:3000');
});
