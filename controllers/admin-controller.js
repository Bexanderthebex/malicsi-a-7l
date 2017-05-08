'use strict';
// const mysql = require('mysql');
// const bodyParser = require('body-parser');

const connection = require('./../config/db-connection.js');
const logs = require('./log-controller')

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
	let type = req.session.user.type;

	// admin only can create organizer
	connection.userType(type).query(insert_query1, [
		req.body.username,
		req.body.password,
		req.body.email,
		req.body.contact,
		'O'
	], (err, rows) => {
		if(!err){
			connection.userType(type).query(query, [
				req.body.username
			], (err, rows) => {
				if(!err){
					if(rows.length == 1){
						connection.userType(type).query(insert_query2, [
							rows[0].id,
							req.body.name,
							req.body.description
						], (err, rows) => {
							if(!err){
								logs.createLog(req.session.user.id, 'Created Organizer')
								return res.status(200).send({'message': 'Successfully created organizer.'});
							}else{
								if(err.code == 'ER_BAD_NULL_ERROR') return res.status(500).send({'message':'Missing field.'});
								else if(err.code == 'ER_DUP_ENTRY') return res.status(500).send({'message':'Duplicate user.'})
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
			if(err.code == 'ER_BAD_NULL_ERROR') return res.status(500).send({'message':'Missing field.'});
			else if(err.code == 'ER_DUP_ENTRY') return res.status(500).send({'message':'Duplicate user.'})
			else return res.status(500).send({'message':'Unknown error'});
		}
	});
}

exports.changeActivity = (req, res) => {
	let query = 'CALL update_activity(?, ?)';
	let type = req.session.user.type;

	connection.userType(type).query(query, [
		req.body.is_active,
		req.params.id
	], (err, rows) => {
		if(!err){
			if(rows.affectedRows == 0) {
				return res.status(500).send({'message': 'User does not exist.'});
			}else{
				if (req.body.is_active) logs.createLog(req.session.user.id, 'Activated User');
				else logs.createLog(req.session.user.id, 'Deactivated User');
				return res.status(200).send({'message': 'User activity status successfully updated.'});
			}
		}else{
			if(err.code == 'ER_BAD_NULL_ERROR') {
				return res.status(500).send({ 'message' : 'Missing field.' });
			}
		}
	});
}

exports.getUsersByType = (req, res) => {
	let query = 'SELECT id, username, email, contact, is_active FROM user WHERE type = ?';
	let type = req.session.user.type;
	
	connection.userType(type).query(query, [
		req.body.type
	], (err, rows) => {
		if(!err){
			res.status(200).send(rows);
		}else{
			res.status(500).send({ 'message' : 'Internal Server Error.' });
		}
	});
}

exports.getAllUsers = (req, res) => {
	let query = 'SELECT id, username, email, contact, type, is_active FROM user';
	let type = req.session.user.type;
	
	connection.userType('A').query(query, [], (err, rows) => {
		if(!err){
			return res.status(200).send(rows);
		}else{
			return res.status(500).send({ 'message' : 'Internal Server Error.' });
		}
	});
}

exports.createAdmin = (req, res) => {
	let query = 'call create_user(?, ?, ?, ?, \'A\')';
	let type = req.session.user.type;
	
	connection.userType(type).query(query, [
		req.body.username,
		req.body.password,
		req.body.email,
		req.body.contact
	], (err, rows) => {
		if (!err) {
			logs.createLog('Created Admin');
			res.status(200).send({'message': 'Successfully created admin'});
		} else if (err.code === 'ER_DUP_ENTRY') {
			res.status(500).send({ 'message' : 'User exists' });
		} else if (err.code === 'ER_BAD_NULL_ERROR') {
			res.status(500).send({ 'message' : 'Missing fields' });
		}
	})
}

exports.searchAdmin = (req, res) => {
	let query = 'call search_admin(?)';
	let type = req.session.user.type;
	
	connection.userType(type).query(query, [
		'%' + req.query.search + '%'
	], (err, rows) => {
		if (!err) {
			res.status(200).send(rows[0]);
		} else {
			res.status(500).send(err);
		}
	});
}
