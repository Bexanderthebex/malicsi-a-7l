// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	query = `SELECT id, username, password, type FROM user WHERE username = ?`;

	connection.query(query, [req.body.username, req.body.password], function(err, rows){
		if(!err) {
			if (rows.length == 1) {
				bcrypt.compare(req.body.password, rows[0].password, (err, isCorrect) => {
					if (isCorrect) {
						req.session.user = {
							id: rows[0].id,
							username: rows[0].username,
							type: rows[0].type
						}
						res.status(200).send({ 'message' : 'Successfully logged in'});
					} else {
						res.status(404).send({ 'message' : 'Incorrect credentials'});
					}
				});
			} else {
				res.status(404).send({ 'message' : 'Incorrect credentials'});
			}
		} else {
			res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}

exports.register = (req, res) => {
	connection.query('INSERT INTO user (username, password, email, contact, type, is_active) values(?,?,?,?,?, true)',
		[req.body.username, req.body.password, req.body.email, req.body.contact, req.body.type], function(err, rows){
		if(err) {
			console.log(err);
			res.status(404).send({ 'message' : 'Error inserting new user!'});
		}else{
			req.session.user = {
				id: rows.insertId,
				username: req.body.username,
				type: req.body.type
			};
			res.status(200).send({ 'message' : 'Successfully inserted new user'});
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
