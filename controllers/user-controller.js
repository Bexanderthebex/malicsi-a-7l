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

exports.update = (req, res) =>{
	connection.query('UPDATE user SET username = ?, password = ?, email = ?, contact = ? WHERE id = ?', [req.body.username, req.body.password, req.body.email, req.body.contact, req.session.user.id], function (err, rows){
		if(err) return next(err);
		else if(rows.affectedRows === 0){
			res.status(404).send({ 'message': 'User ('+ req.body.username') was not updated.' });
		}else{
			req.session.user.username = req.body.username;
			res.status(200).send(rows);
		}
	});
}
