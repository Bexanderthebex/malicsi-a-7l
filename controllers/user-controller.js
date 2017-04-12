'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
	var query = 'CALL select_user_with_password_from_username(?)';
	connection.userType('A').query(query, [
		req.body.username
	], function(err, rows) {
		if(!err) {
			if (rows[0].length == 1) {
				bcrypt.compare(req.body.password, rows[0][0].password, (err, isCorrect) => {
					if (isCorrect) {
						req.session.user = {
							id: rows[0][0].id,
							username: rows[0][0].username,
							type: rows[0][0].type
						}

						return res.status(200).send({ 'message' : 'Successfully logged in'});
					} else {
						// console.log('hello')
						return res.json({ 'message' : 'Incorrect credentials', 'userdata' : rows[0]}).status(401);
						//console.log(res);
					}
				});
			} else {
				//console.log(rows);
				return res.status(401).send({ 'message' : 'Incorrect credentials'});
			}
		} else {
			if (err.code == 'ER_BAD_NULL_ERROR') {
				return res.status(500).send({ 'message' : 'Missing credentials'});
			} else {
				return res.status(500).send({ 'message' : 'Unknown'});
			}

		}
	});
}

exports.logout = (req, res) => {
	req.session = null;
	return res.status(200).send({'message': 'Logout successful'});
}

exports.register = (req, res) => {
	let insert_user_query = 'CALL create_user(?, ?, ?, ?, ?)';
	let select_user_query = 'CALL select_user_from_username(?)';
	let insert_comp_query = 'CALL create_competitor(?,?,?,?,?,?)';

	//let type = req.session.user.type;
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
						var returnObject = rows[0][0];

						req.session.user = {
							id: returnObject.id,
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
					return res.status(500).send({ 'message' : 'Missing field' });
				} else if (err.code == 'ER_DUP_ENTRY') {
					return res.status(500).send({ 'message' : 'Duplicate entry' });
				} else {
					return res.status(500).send({ 'message': 'Unknown' });
				}
				//return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}

exports.update = (req, res) =>{
	let update_query = 'CALL update_user(?, ?, ?, ?)';

	/*
		NOTE FOR FRONT END: Must make sure that if a field is empty, pass the old value.
		Example, use did not provide password. req.body.password must be the user's old password.
	*/

	//let type = req.session.user.type;
	connection.userType('A').query(update_query, [
		req.body.username,
		req.body.email,
		req.body.contact,
		req.body.id !== undefined ? req.body.id : req.session.user.id // was the id included in the request? if not, default to session user id.
	], function (err, rows) {
		if(err) return res.status(404).send({ 'message' : 'Error updating user!', 'data': err});
		else if (rows.affectedRows === 0) {
			return res.status(404).send({ 'message': 'User was not updated.' });
		} else {
			req.session.user.username = req.body.username;
			return res.status(200).send(rows);
		}
	});
}

exports.searchUser = (req, res) => {
	let query = "CALL search_user(?)";

	connection.userType('A').query(query,
		[
			"%" + req.query.keyword + "%"
		], (err, rows) => {
			if(!err){
				if(rows[0].length == 1) {
					return res.status(200).send(rows[0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.updatePassword = (req, res) => {
	let update_query = 'CALL update_user_password(?, ?)';

	//let type = req.session.user.type;
	connection.userType('A').query(update_query, [
		req.body.password,
		req.body.id !== undefined ? req.body.id : req.session.user.id
	], function (err, rows) {
		if(err) return res.status(404).send({ 'message' : 'Error updating user!', 'data': err});
		else if (rows.affectedRows === 0) {
			return res.status(404).send({ 'message': 'User was not updated.' });
		} else {
			req.session.user.username = req.body.username;
			return res.status(200).send(rows);
		}
	});
}

exports.returnInfo = (req, res) => {
	var query = 'CALL select_user(?)';
	connection.query(query, [
		req.params.id
	], function(err, rows) {
		if (err) {
			return res.status(404).send({ 'message' : 'Error getting user info!', 'data': err});
		} else {
			if(rows[0][0]) {
				return res.status(200).send(rows[0][0]);
			} else {
				return res.status(404).send({ 'message' : 'User does not exist!'});
			}
		}
	});
}

exports.getUserInfo = (req,res) => {	//beili paayos nung return mechanism nito
	if (req.session == null || req.session.user == undefined) {
		res.status(200).send(null);
	} else {
		let currentUser = req.session.user;
		// console.log("id: " + currentUser.id);
		connection.userType('A').query('CALL select_user(?)', [currentUser.id], function(err, rows, fields) {
			if(!err) {
				let returnObject = rows[0];
				// console.log("1st: ");
				// console.log(returnObject[0]);
				if(currentUser.type == 'C') {
					connection.userType('A').query('SELECT birthday, sex, first_name, last_name, nickname, bio from competitor WHERE id = ?', [currentUser.id], function(err, rows, fields){
						if(!err) {
							returnObject[0]['birthday'] = rows[0].birthday;
							returnObject[0]['sex'] = rows[0].sex;
							returnObject[0]['first_name'] = rows[0].first_name;
							returnObject[0]['last_name'] = rows[0].last_name;
							returnObject[0]['nickname'] = rows[0].nickname;
							returnObject[0]['bio'] = rows[0].bio;

							// console.log("2nd: ")
							// console.log(returnObject[0]);
							return res.status(200).send(returnObject[0]);
						} else {
							console.log(err);
						}
					})
				} else if (currentUser.type == 'O') {
					connection.userType('A').query('SELECT name, description from organizer where id = ?', [currentUser.id], function(err, rows, fields) {
						if(!err) {
							returnObject[0]['name'] = rows[0].name;
							returnObject[0]['description'] = rows[0].description
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

							return res.status(200).send(returnObject);
						} else {
							console.log(err);
						}
					});
				} else {
					return res.status(200).send(returnObject);
				}
			} else {
				console.log(err);
			}
		});
	}
}
