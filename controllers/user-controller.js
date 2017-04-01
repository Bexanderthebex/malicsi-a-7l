'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	let select_query = 'SELECT id, username, password, type FROM user WHERE username = ?';

	connection.userType('A').query(select_query, [req.body.username], function(err, rows){
		if(!err) {
			if(rows.length == 1){
				bcrypt.compare(req.body.password, rows[0].password, (err, isCorrect) => {
					if (isCorrect) {
						req.session.user = {
							id: rows[0].id,
							username: rows[0].username,
							type: rows[0].type
						}
						return res.status(200).send({ 'message' : 'Successfully logged in.'});
					} else {
						return res.status(401).send({ 'message' : 'Incorrect password.'});
					}
				});
			} else {
				console.log(rows);
				return res.status(404).send({ 'message' : 'User does not exist.'});
			}
		} else {
			if (err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({ 'message' : 'Missing credentials.'});
			else return res.status(500).send({ 'message' : 'Unknown'});
		}
	});
}

exports.logout = (req, res) => {
	req.session = null;
	res.status(200).send({'message': 'Logout successful'});
}

exports.register = (req, res) => {
	let insert_user_query = 'CALL create_user(?, ?, ?, ?, ?)';
	let select_user_query = 'SELECT * FROM user WHERE username = ?';
	let insert_comp_query = 'CALL create_competitor(?,?,?,?,?,?)';

	connection.userType('A').query(insert_user_query, [req.body.username, req.body.password, req.body.email, req.body.contact, req.body.type], function(err, rows){
		if(!err){
			connection.userType('A').query(select_user_query, [req.body.username], function(err, rows){
				var returnObject = rows[0];

				req.session.user = {
					id: rows.insertId,
					username: req.body.username,
					type: req.body.type
				};

				if(returnObject.type == 'C' || returnObject.type == 'O'){
					if(!err){
						connection.userType('A').query(insert_comp_query, [
							returnObject.id, 
							req.body.birthday, 
							req.body.first_name, 
							req.body.last_name, 
							req.body.nickname, 
							req.body.sex
						], function(err, rows){
							if(!err){
								returnObject["birthday"] = req.body.birthday;
								returnObject["first_name"] = req.body.first_name;
								returnObject["last_name"] = req.body.last_name;
								returnObject["nickname"] = req.body.nickname;
								returnObject["sex"] = req.body.sex;
								res.status(200).send({'message':'Successfully created competitor.'});
								return returnObject;
							}else{
								console.log(err);
								if (err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({ 'message' : 'Missing field' });
								else if (err.code == 'ER_DUP_ENTRY') return res.status(400).send({ 'message' : 'Duplicate entry' });
								else return res.status(500).send({ 'message': 'Unknown error.' });
							}
						});
					}else{
						console.log(err);
						return res.status(404).send({'message':'User does not exist.'});
					}
				}else{
					return res.status(500).send({'message':'User is neither competitor or organizer.'});
				}
			});
		}else{
			console.log(err);
			if (err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({ 'message' : 'Missing field' });
			else if (err.code == 'ER_DUP_ENTRY') return res.status(400).send({ 'message' : 'Duplicate entry' });
			else return res.status(500).send({ 'message': 'Unknown error.' });
		}
	});
}

exports.update = (req, res) =>{
	let update_query = 'CALL update_user(?, ?, ?, ?, ?)';

	/*
		NOTE FOR FRONT END: Must make sure that if a field is empty, pass the old value.
		Example, use did not provide password. req.body.password must be the user's old password.
	*/

	connection.userType('A').query(update_query, [
		req.body.username, 
		req.body.password, 
		req.body.email, 
		req.body.contact, 
		req.session.user.id
	], function (err, rows){
		console.log(req.body);
		if(!err){
			if (rows.affectedRows === 0) {
				return res.status(500).send({'message': 'User does not exists.'});
			}else{
				req.session.user.username = req.body.username;
				return res.status(200).send({'message': 'User successfully updated.'});
			}
		}else{
			console.log(err);
			if(err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({'message':'Missing field.'});
			else if(err.code == 'ER_DUP_ENTRY') return res.status(400).send({'message':'Duplicate entry.'})
			else return res.status(500).send({'message':'Unknown error'});
		}
	});
}

exports.getUserInfo = (req,res) => {
	let query = 'SELECT * from user WHERE user.id = ?';
	connection.userType('A').query(query, [req.params.id], function(err, rows, fields) {
		if(!err) {
			var returnObject = rows[0];

			if(returnObject.type == 'O'){
				connection.userType('A').query('SELECT name, description from organizer where id = ?', [req.params.id], function(err, rows, fields) {
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
				connection.userType('A').query('SELECT birthday, sex, first_name, last_name, nickname from competitor WHERE id = ?', [req.params.id], function(err, rows, fields){
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
			console.log(err);
			return res.status(404).send({'message':'User does not exist.'});
		}
	});
}