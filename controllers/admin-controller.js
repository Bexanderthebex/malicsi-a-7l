'use strict'
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
	let query = `
		INSERT INTO user SET ?;
	`;

	let userParams = {
		username: req.body.username,
		password: req.body.password,
		active: true
	}

	connection.query(query, userParams, (err, rows) => {
		if (!err) {
			console.log(rows);

			query = `
				INSERT INTO organizer SET ?;
			`;

			let organizerParams = {
				id: rows.insertId,
				name: req.body.name,
				description: req.body.description
			}

			connection.query(query, organizerParams, (err, rows) => {
				if (!err) {
					res.status(200).send('Organizer added.');
				} else {
					res.status(200).send('An error occured.');
				}
			});
		} else {
			res.status(200).send('An error occured.');
		}
	});
};

exports.changeActivity = (req, res) => {
	connection.query('UPDATE user SET is_active=? WHERE id = ?', [req.body.active, req.body.id], (err, rows) => {
		if (!err) {
			console.log(rows);
			if (rows.affectedRows > 0) {
				res.status(200).send({'message': 'User activity status successfully updated.'});
			} else {
				res.status(404).send({'message': 'User does not exist.'});
			}
		} else {
			res.status(404).send({'message': 'Database error.', 'data': err});
		}
	});
}
