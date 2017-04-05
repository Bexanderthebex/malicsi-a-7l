'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	var query = 'SELECT id, username, type, password FROM user WHERE username = ?';
	connection.userType('A').query(query, [
		req.body.username
	], function(err, rows) {
		if(!err) {
			if (rows.length == 1) {
				bcrypt.compare(req.body.password, rows[0].password, (err, isCorrect) => {
					if (isCorrect) {
						req.session.user = {
							id: rows[0].id,
							username: rows[0].username,
							type: rows[0].type
						}
						console.log(req.session.user.type);
						res.status(200).send({ 'message' : 'Successfully logged in'});
					} else {
						console.log('hello')
						res.json({ 'message' : 'Incorrect credentials', 'userdata' : rows[0]}).status(401);
						//console.log(res);
					}
				});
			} else {
				//console.log(rows);
				res.status(401).send({ 'message' : 'Incorrect credentials'});
			}
		} else {
			if (err.code == 'ER_BAD_NULL_ERROR') {
				res.status(500).send({ 'message' : 'Missing credentials'});
			} else {
				res.status(500).send({ 'message' : 'Unknown'});
			}

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

	connection.userType('A').query(insert_user_query,
		[
			req.body.username,
			req.body.password,
			req.body.email,
			req.body.contact,
			req.body.type
		], (err, rows) => {
			if(!err){
				connection.userType('A').query(select_user_query,
					[
						req.body.username
					], (err, rows) => {
						var returnObject = rows[0];

						req.session.user = {
							id: rows.insertId,
							username: req.body.username,
							type: req.body.type
						};

						if(returnObject.type == 'C' || returnObject.type == 'A'){
							if(!err){
								connection.userType('A').query(insert_comp_query, [
									returnObject.id,
									req.body.birthday,
									req.body.first_name,
									req.body.last_name,
									req.body.nickname,
									req.body.sex
								], (err, rows) => {
									if(!err){
										returnObject["birthday"] = req.body.birthday;
										returnObject["first_name"] = req.body.first_name;
										returnObject["last_name"] = req.body.last_name;
										returnObject["nickname"] = req.body.nickname;
										returnObject["sex"] = req.body.sex;
										return res.status(200).send(returnObject);
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
					}
				);
			}else{
				console.log(err);
				if (err.code == 'ER_BAD_NULL_ERROR') {
					res.status(500).send({ 'message' : 'Missing field' });
				} else if (err.code == 'ER_DUP_ENTRY') {
					res.status(500).send({ 'message' : 'Duplicate entry' });
				} else {
					res.status(500).send({ 'message': 'Unknown' });
				}
				//res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
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
	], function (err, rows) {
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
	var query = 'SELECT id, username, is_active, email, contact, type FROM user WHERE id=?';
	connection.query(query, [
		req.params.id
	], function(err, rows) {
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
	var query = 'INSERT INTO competitor (id, birthday, first_name, last_name, nickname, sex) values(?,?,?,?,?,?)';
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
				res.status(500).send({ 'message' : 'Missing field' });
			} else if (err.code == 'ER_DUP_ENTRY') {
				res.status(500).send({ 'message' : 'Duplicate entry' });
			} else {
				res.status(500).send({ 'message': 'Error inserting new competitor!' });
			}
		}
	});
}

exports.getUserInfo = (req,res) => {	//beili paayos nung return mechanism nito
	if (req.session == null || req.session.user == undefined) {
		res.status(200).send(null);
	} else {
		let currentUser = req.session.user;
		connection.userType('A').query('SELECT * FROM user WHERE user.id = ?', [currentUser.id], function(err, rows, fields) {
			if(!err) {
				let returnObject = rows[0];

				if(currentUser.type == 'C') {
					connection.userType('A').query('SELECT birthday, sex, first_name, last_name, nickname from competitor WHERE id = ?', [currentUser.id], function(err, rows, fields){
						if(!err) {

							returnObject['birthday'] = rows[0].birthday;
							returnObject['sex'] = rows[0].sex;
							returnObject['first_name'] = rows[0].first_name;
							returnObject['last_name'] = rows[0].last_name;
							returnObject['nickname'] = rows[0].nickname;

							/*
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
							);*/

							res.status(200).send(returnObject);
							return returnObject;
						} else {
							console.log(err);
						}
					})
				} else if (currentUser.type == 'O') {
					connection.userType('A').query('SELECT name, description form organizer where id = ?', [currentUser.id], function(err, rows, fields) {
						if(!err) {
							returnObject['name'] = rows[0].name;
							returnObject['description'] = rows[0].description
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
}
