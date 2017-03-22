

// retrieve and update users

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

var currentUser = {};
var returnObject = {}

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

						res.send(returnObject);
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
							};
						);
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

// passes all information again for editing
exports.editCompetitor = (req,res) => {
	currentUser = req.session.user;
	query = `UPDATE competitor SET first_name = ?, last_name = ?, birthday = ?, nickname = ?, sex = ? WHERE id = ?`;

	connection.query(query, [req.body.first_name, req.body.last_name, req.body.birthday, req.body.nickname, req.body.sex, currentUser.id], function(err, rows){
		if(!err) {
			return res.status(200).send({ 'message' : 'Sucessfully updated info'});
		} else {
			return res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}

exports.editOrganizer = (req,res) => {
	currentUser = req.session.user;
	query = `UPDATE organizer SET name = ?, description = ? WHERE id = ?`;

	connection.query(query, [req.body.name, req.body.description, currentUser.id], function(err, rows){
		if(!err) {
			return res.status(200).send({ 'message' : 'Sucessfully updated info'});
		} else {
			return res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}