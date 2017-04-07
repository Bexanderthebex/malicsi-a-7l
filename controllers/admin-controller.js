'use strict';
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const connection = require('./../config/db-connection.js');

/**
* POST /organizer
* createOrganizer: Adds a new organizer
*
* PARAMERTERS:
* username: username of new organizer
* password: password of new organizer
* name: name of new organizer
* description: description of new organizer
*/

exports.createOrganizer = (req, res) => {
	let query = 'SELECT id FROM user WHERE username = ?';
	let insert_query1 = 'CALL create_user(?, ?, ?, ?, ?)';
	let insert_query2 = 'CALL create_organizer(?, ?, ?)';

	connection.userType('A').query(insert_query1, [req.body.username, req.body.password, req.body.email, req.body.contact, 'O'], function(err, rows){
		if(!err){
			connection.userType('A').query(query, [req.body.username], function(err, rows){
				if(!err){
					if(rows.length == 1){
						connection.userType('A').query(insert_query2, [rows[0].id, req.body.name, req.body.description], function(err, rows){
							if(!err){
								return res.status(200).send({'message': 'Successfully created organizer.'});
							}else{
								console.log(err);
								if(err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({'message':'Missing field.'});
								else if(err.code == 'ER_DUP_ENTRY') return res.status(400).send({'message':'Duplicate entry.'})
								else return res.status(500).send({'message':'Unknown error'});
							}
						});
					}else{
						return res.status(404).send({'message': 'User does not exists.'});
					}
				}else{
					return res.status(500).send({'message':'Unknown error'});
				}
			});
		}else{
			console.log(err);
			return res.status(500).send({'message':'Unknown error'});
		}
	});
}

exports.changeActivity = (req, res) => {
	let query = 'CALL update_activity(?, ?)';
	connection.userType('A').query(query, [req.body.is_active, req.params.id], (err, rows) => {
		if(!err){
			console.log(rows);
			if(rows.affectedRows == 0) {
				return res.status(404).send({'message': 'User does not exist.'});
			}else{
				return res.status(200).send({'message': 'User activity status successfully updated.'});
			}
		}else{
			console.log(err);
			if(err.code == 'ER_BAD_NULL_ERROR') {
				return res.status(400).send({ 'message' : 'Missing field.' });
			}
		}
	});
}

exports.getUsersByType = (req, res) => {
	let query = 'SELECT * FROM user WHERE type = ?';
	connection.userType('A').query(query, [
		req.body.type
	], (err, rows) => {
		if(!err){
			res.status(200).send(rows);
		}else{
			console.log(err);
			res.status(500).send({ 'message' : 'Internal Server Error.' });
		}
	});
}

exports.getAllUsers = (req, res) => {
	let query = 'SELECT * FROM user';
	connection.userType('A').query(query, [], (err, rows) => {
		if(!err){
			res.status(200).send(rows);
		}else{
			console.log(err);
			res.status(500).send({ 'message' : 'Internal Server Error.' });
		}
	});
}

exports.createAdmin = (req, res) => {
	let query = 'call create_user(?, ?, ?, ?, \'A\')';
	connection.userType('A').query(query, [
		req.body.username,
		req.body.password,
		req.body.email,
		req.body.contact
	], (err, rows) => {
		if (!err) {
			res.status(200).send({'message': 'Successfully created admin'});
		} else {
			console.log(err);
			res.status(500).send({ 'message' : 'Internal Server Error.' });
		}
	})
}

exports.searchAdmin = (req, res) => {
	let query = 'call search_admin(?)';

	connection.userType('A').query(query, [
		'%' + req.query.search + '%'
	], (err, rows) => {
		if (!err) {
			res.status(200).send(rows[0]);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	});
}
