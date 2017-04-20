'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.viewAllLogs = (req, res) => {
	query = 'SELECT * FROM log';

	let type = req.session.user.type;
	connection.userType(type).query(query, (err, rows) => {
		if(!err) {
			res.status(200).send(rows);
			return rows;
		} else {
			return res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}

exports.viewLogsByDate = (req, res) => {
	query = 'SELECT * FROM log WHERE date_created BETWEEN ? AND ?';

	let type = req.session.user.type;
	connection.userType(type).query(query,
		[
			req.body.startDate,
			req.body.endDate
		], (err, rows) => {
			if(!err) {
				res.status(200).send(rows);
				return rows;
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}
