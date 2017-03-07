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