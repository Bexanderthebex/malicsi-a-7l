'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');


exports.viewAllLogs = (req, res) => {
	let query = 'CALL get_logs()';

	let type = req.session.user.type;
	connection.userType(type).query(query, [], (err, rows) => {
		if(!err) {
			res.status(200).send(rows[0]);
			return rows;
		} else {
			return res.status(500).send(err);
		}
	});
}

exports.viewUserLogs = (req, res) => {
	let query = 'CALL get_user_logs(?);';

	let type = req.session.user.type;
	connection.userType(type).query(query,
		[
			req.query.id
		], (err, rows) => {
		if(!err) {
			res.status(200).send(rows[0]);
			return rows;
		} else {
			return res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}

exports.viewLogsByDate = (req, res) => {
	let query = 'SELECT * FROM log WHERE date_created BETWEEN ? AND ?';

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

exports.searchLog = (req, res) => {
	let query = 'call search_logs(?, ?, ?)';
	let type = req.session.user.type;
    connection.userType(type).query(query,
        [
            '%' + req.query.username + '%',
			new Date(req.query.startDate),
			new Date(req.query.endDate)
        ], (err, rows) => {
            if(!err) {
				console.log(rows);
                return res.status(200).send(rows[0]);
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.createLog = (id, message) => {
    connection.userType('A').query(query,
        [
            id,
            message
        ], (err, rows) => {
            if(!err) {
                return true;
            } else {
                return false;
            }
        }
    );
}
