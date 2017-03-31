'use strict'

// const mysql = require('mysql');
// const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	let select_query = `SELECT id, username, type, password FROM user WHERE username = ?`;

	connection.query(select_query, [req.body.username], function(err, rows){
		if(!err) {
			if(rows.length == 1){
				bcrypt.compare(req.body.password, rows[0].password, (err, isCorrect) => {
					if (isCorrect) {
						req.session.user = {
							id: rows[0].id,
							username: rows[0].username,
							type: rows[0].type
						}
						res.status(200).send({ 'message' : 'Successfully logged in.'});
					} else {
						res.status(401).send({ 'message' : 'Incorrect password.'});
					}
				});
			} else {
				console.log(rows);
				res.status(404).send({ 'message' : 'User does not exist.'});
			}
		} else {
			if (err.code == 'ER_BAD_NULL_ERROR') res.status(400).send({ 'message' : 'Missing credentials.'});
			else res.status(500).send({ 'message' : 'Unknown'});
		}
	});
}

exports.logout = (req, res) => {
	req.session = null;
	res.status(200).send({'message': 'Logout successful'});
}

exports.register = (req, res, next) => {
	let insert_query = 'INSERT INTO user (username, password, email, contact, type, is_active) values(?,?,?,?,?, 1)';

	connection.query(insert_query, [
		req.body.username,
		req.body.password,
		req.body.email,
		req.body.contact,
		req.body.type
	], function(err, rows){
		if(!err) {
			req.body.id = rows.insertId;
			next();
		}else{
			console.log(err);
			if (err.code == 'ER_BAD_NULL_ERROR') {
				res.status(400).send({ 'message' : 'Missing field.' });
			} else if (err.code == 'ER_DUP_ENTRY') {
				res.status(400).send({ 'message' : 'Duplicate entry.' });
			} else {
				res.status(500).send({ 'message': 'Unknown' });
			}
		}
	});
}

exports.update = (req, res) =>{
	let update_query = 'UPDATE user SET username = ?, password = ?, email = ?, contact = ? WHERE id = ?';

	/*
		NOTE FOR FRONT END: Must make sure that if a field is empty, pass the old value.
		Example, use did not provide password. req.body.password must be the user's old password.
	*/

	connection.query(update_query, [
		req.body.username, 
		req.body.password, 
		req.body.email, 
		req.body.contact, 
		req.session.user.id
	], function (err, rows){
		console.log(req.body);
		if(!err){
			if (rows.affectedRows === 0) {
				res.status(500).send({'message': 'User does not exists.'});
			}else{
				req.session.user.username = req.body.username;
				res.status(200).send({'message': 'User successfully updated.'});
			}
		}else{
			console.log(err);
			if(err.code == 'ER_BAD_NULL_ERROR') res.status(400).send({'message':'Missing field.'});
			else if(err.code == 'ER_DUP_ENTRY') res.status(400).send({'message':'Duplicate entry.'})
			else res.status(500).send({'message':'Unknown error'});
		}
	});
}

exports.registerCompetitor = (req, res) => {
	let query = 'INSERT INTO competitor (id, birthday, first_name, last_name, nickname, sex) values(?,?,?,?,?,?)';
	connection.query(query, [
		req.body.id,
		req.body.birthday,
		req.body.first_name,
		req.body.last_name,
		req.body.nickname,
		req.body.sex
	], function(err, rows){
		if(!err) {
			req.session.user = {
				id: req.body,
				username: req.body.username,
				type: req.body.type
			};

			res.status(200).send({ 'message' : 'Successfully inserted new user competitor'});
			/*returnObject.push(
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
			return returnObject;*/
		}else{
			console.log(err);
			if (err.code == 'ER_BAD_NULL_ERROR') {
				res.status(400).send({ 'message' : 'Missing field' });
			} else if (err.code == 'ER_DUP_ENTRY') {
				res.status(400).send({ 'message' : 'Duplicate entry' });
			} else {
				res.status(500).send({ 'message': 'Error inserting new competitor!' });
			}
		}
	});
}

exports.getUserInfo = (req,res) => {
	let query = 'SELECT * from user WHERE user.id = ?';
	connection.query(query, [req.params.id], function(err, rows, fields) {
		if(!err) {
			var returnObject = rows[0];

			if(returnObject.type == 'O'){
				connection.query('SELECT name, description from organizer where id = ?', [req.params.id], function(err, rows, fields) {
					console.log(rows);
					if(!err) {
						returnObject["name"] = rows[0].name;
						returnObject["description"] = rows[0].description;

						res.status(200).send(returnObject);
						return returnObject;
					} else {
						console.log(err);
						res.status(500).send({'message':'Unknown error.'});
					}
				});
			}else if(returnObject.type == 'C') {
				connection.query('SELECT birthday, sex, first_name, last_name, nickname from competitor WHERE id = ?', [req.params.id], function(err, rows, fields){
					if(!err) {
						returnObject["birthday"] = rows[0].birthday;
						returnObject["first_name"] = rows[0].first_name;
						returnObject["last_name"] = rows[0].last_name;
						returnObject["nickname"] = rows[0].nickname;
						returnObject["sex"] = rows[0].sex;

						res.status(200).send(returnObject);
						return returnObject;
					} else {
						console.log(err);
						res.status(500).send({'message':'Unknown error.'});
					}
				});
			}else{
				res.status(200).send(returnObject);
				return returnObject;
			}
		}else{
			res.status(404).send({'message':'User does not exist.'});
		}
	});
}