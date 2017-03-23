'use strict'

// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.login = (req, res) => {
	let query = `SELECT id, username, type FROM user WHERE username = ? AND password = ?`;

	connection.query('SELECT id, username, type FROM user WHERE username = ? AND password = ?', [req.body.username, req.body.password], function(err, rows){
		if(!err) {
			if (rows.length == 1) {
				req.session.user = rows[0];
				return res.status(200).send({ 'message' : 'Successfully logged in'});
			} else {
				return res.status(404).send({ 'message' : 'Incorrect credentials'});
			}
		} else {
			console.log(err);
			return res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}

exports.register = (req, res) => {
	console.log(req.body);

	connection.query('INSERT INTO user (username, password, is_active, is_admin, contact, email) values(?,?,?,?,?,?)',
		[req.body.username, req.body.password, req.body.active, req.body.admin, req.body.contact, req.body.email], function(err, rows){
		if(err) {
			console.log(err);
			return res.status(404).send({ 'message' : 'Error inserting new user!'});
		}else{
			return res.status(200).send({ 'message' : 'Successfully inserted new user'});
		}
	});
}

exports.getUserInfo = (req,res) => {
	currentUser = req.session.user;
	connection.query('SELECT * from user ' + 'WHERE user.id = ?', [currentUser.id], function(err, rows, fields) {
		if(!err) {
			returnObject = rows[0];

			if(currentUser.user_type == 'competitor') {
				connection.query('SELECT birthday, sex, first_name, last_name, nickname from competitor WHERE id = ?', [currentUser.id], function(err, rows, fields){
					if(!err) {
						returnObject.push(
							{
								key: "birthday",
								value: rows[0].birthday
							},
							{
								key: "sex",
								value: rows[0].sex
							},
							{
								key: "first_name",
								value: rows[0].first_name
							},
							{
								key: "last_name",
								value: rows[0].last_name
							},
							{
								key: "nickname",
								value: rows[0].nickname
							}
						);

						res.status(200).send(returnObject);
						return returnObject;
					} else {
						console.log(err);
					}
				})
			} else if (currentUser.user_type == 'organizer') {
				connection.query('SELECT name, description form organizer where id = ?', [currentUser.id], function(err, rows, fields) {
					if(!err) {
						returnObject.push(
							{
								key: "name",
								value: rows[0].name
							},
							{
								key: "description",
								value: rows[0].description
							}
						);

						res.status(200).send(returnObject);
						return returnObject;
					} else {
						console.log(err);
					}
				});
			}
		} else {
			console.log(err);
		}
	});
}
