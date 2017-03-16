const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.getSampleSession = (req, res) => {
	res.send(req.session.user);
}
// this is a sample controller
// something
