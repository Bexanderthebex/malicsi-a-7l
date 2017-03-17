// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.login = (req, res) => {
	connection.query('SELECT COUNT(*) cnt FROM user WHERE username=?', [req.body.username], function(err, rows){
		if(rows[0]["cnt"] === 1) {
			checkPassword();
		} else {
			return res.status(404).send({ 'message' : 'User does not exist!'});
		}
	});

	var checkPassword = () => {
		connection.query('SELECT COUNT(*) cnt FROM user WHERE username=? AND password=?', [req.body.username, req.body.password], function(err, rows){
			if(rows[0]["cnt"] === 1) {
				return res.status(200).send({ 'message' : 'Successfully logged in'});
			} else {
				return res.status(404).send({ 'message' : 'Incorrect password'});
			}
		});
	}
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






exports.returninfo = (req, res) => {
	connection.query('SELECT id, username, active FROM user WHERE username=?', [req.body.username], function(err, rows){
		if(rows[0]) {
			//console.log('User Information: ', rows);
			return rows[0];
		} else {
			return res.status(404).send({ 'message' : 'User does not exist!'});
		}
	});

	
}

