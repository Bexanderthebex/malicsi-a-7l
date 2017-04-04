const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.viewAllLogs = (req, res) => {
	query = 'SELECT * FROM log';

	connection.query(query, function (err, rows) {
		if(!err) {
			res.status(200).send(rows);
			return rows;
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}

exports.viewLogsByDate = (req, res) => {
	query = 'SELECT * FROM log WHERE date_created BETWEEN ? AND ?';

	connection.query(query, [req.body.startDate, req.body.endDate], function (err, rows) {
		if(!err) {
			res.status(200).send(rows);
			return rows;
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}