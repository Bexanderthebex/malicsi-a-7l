'use strict'

// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	let query = `SELECT id, username, type, password FROM user WHERE username = ?`;

	connection.query(query, [req.body.username], function(err, rows){
		if(!err) {
			if (rows.length == 1) {
				console.log(rows[0].password)
				bcrypt.compare(req.body.password, rows[0].password, (err, isCorrect) => {
					if (isCorrect) {
						req.session.user = {
							id: rows[0].id,
							username: rows[0].username,
							type: rows[0].type
						}
						res.status(200).send({ 'message' : 'Successfully logged in'});
					} else {
						console.log('hello')
						res.status(404).send({ 'message' : 'Incorrect credentials'});
					}
				});
			} else {
				console.log(rows);
				res.status(404).send({ 'message' : 'Incorrect credentials'});
			}
		} else {
			res.status(404).send({ 'message' : 'An error occured', 'data': err});
			return err;
		}
	});
}

exports.logout = (req, res) => {
	req.session = null;
	res.status(200).send({'message': 'Logout successful'});
}

exports.register = (req, res, next) => {
	// console.log(req.body);
	var insert_query = 'INSERT INTO user (username, password, email, contact, type, is_active) values(?,?,?,?,?,true)';

	connection.query(insert_query, [
		req.body.username,
		req.body.password,
		req.body.email,
		req.body.contact,
		req.body.type
	], function(err, rows){
		console.log(next);
		if(!err) {
			console.log(rows)
			req.session.user = {
				id: rows.insertId,
				username: req.body.username,
				type: req.body.type
			};
			console.log(req.session.user)

			next();

		}else{
			console.log(err);
			res.status(501).send({ 'message' : 'Not implemented'});
		}
	});
}

exports.update = (req, res) =>{
	connection.query('UPDATE user SET username = ?, password = ?, email = ?, contact = ? WHERE id = ?', [req.body.username, req.body.password, req.body.email, req.body.contact, req.session.user.id], function (err, rows){
		if(err) res.status(404).send({ 'message' : 'Error updating user!', 'data': err});
		else if (rows.affectedRows === 0) {
			res.status(404).send({ 'message': 'User was not updated.' });
		} else {
			req.session.user.username = req.body.username;
			res.status(200).send(rows);
		}
	});
}

exports.returnInfo = (req, res) => {
	connection.query('SELECT id, username, is_active, email, contact, type FROM user WHERE id=?', [req.params.id], function(err, rows){
		if (err) {
			res.status(404).send({ 'message' : 'Error getting user info!', 'data': err});
		} else {
			if(rows[0]) {
				res.status(200).send(rows[0]);
			} else {
				res.status(404).send({ 'message' : 'User does not exist!'});
			}
		}
	});
}

exports.registerCompetitor = (req, res) => {
	connection.query('SELECT * from competitor WHERE username = ?', [req.body.username],
		function(err, rows){
			returnObject = rows[0];
		if(!err) {
			connection.query('INSERT INTO competitor (id, birthday, first_name, last_name, nickname, sex) values(?,?,?,?,?,?)',
				[returnObject.id, req.body.birthday, req.body.first_name, req.body.last_name, req.body.nickname, req.body.sex], function(err, rows){
				if(!err) {
					res.status(200).send({ 'message' : 'Successfully inserted new user competitor'});
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
					return returnObject;
				}else{
					console.log(err);
					return res.status(500).send({ 'message' : 'Error inserting new competitor!'});
				}
			});
		}else{
			console.log(err);
			return res.status(500).send({ 'message' : 'Error getting new user!'});
		}
	});
}

exports.getUserInfo = (req,res) => {	//beili paayos nung return mechanism nito
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
