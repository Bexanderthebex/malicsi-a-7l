// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.login = (req, res) => {
	query = `SELECT id, username, type FROM user WHERE username = ? AND password = ?`;

	connection.query(query, [req.body.username, req.body.password], function(err, rows){
		console.log(req.body.username)
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
	connection.query('INSERT INTO user (username, password, email, contact, type, is_active) values(?,?,?,?,?, true)',
		[req.body.username, req.body.password, req.body.email, req.body.contact, req.body.type], function(err, rows){
		if(err) {
			console.log(err);
			return res.status(404).send({ 'message' : 'Error inserting new user!'});
		}else{
			req.session.user = {
				id: rows.insertId,
				username: req.body.username,
				type: req.body.type
			};
			return res.status(200).send({ 'message' : 'Successfully inserted new user'});
		}
	});
}

exports.update = (req, res) =>{
	connection.query('UPDATE user SET username = ?, password = ?, email = ?, contact = ? WHERE id = ?', [req.body.username, req.body.password, req.body.email, req.body.contact, req.session.user.id], function (err, rows){
		if(err) return next(err);
		else if (rows.affectedRows === 0) {
			res.status(404).send({ 'message': 'User was not updated.' });
		} else {
			req.session.user.username = req.body.username;
			res.status(200).send(rows);
		}
	});
}
