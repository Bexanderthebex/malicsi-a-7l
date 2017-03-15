// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.login = (req, res) => {
	query = `SELECT id, username, type FROM user WHERE username = ? AND password = ?`;

	connection.query(query, [req.body.username, req.body.password], function(err, rows){
		if(!err) {
			if (rows.length == 1) {
				req.session.user = rows[0];
				return res.status(200).send({ 'message' : 'Successfully logged in'});
			} else {
				return res.status(404).send({ 'message' : 'Incorrect credentials'});
			}
		} else {
			return res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}

exports.register = (req, res) => {
	//console.log(req.body);

	connection.query('INSERT INTO user (username, password, active) values(?,?,?)',
		[req.body.username, req.body.password, req.body.active], function(err, rows){
		if(err) {
			return res.status(404).send({ 'message' : 'Error inserting new user!'});
		}else{
			return res.status(200).send({ 'message' : 'Successfully inserted new user'});
		}
	});
}
