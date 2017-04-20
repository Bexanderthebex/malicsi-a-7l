'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');


exports.viewAllLogs = (req, res) => {
	query = 'CALL get_logs()';

	let type = req.session.user.type;
	connection.userType(type).query(query, (err, rows) => {
		if(!err) {
			res.status(200).send(rows[0]);
			return rows;
		} else {
			return res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}

exports.viewUserLogs = (req, res) => {
	query = 'CALL get_user_logs(?);';

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

exports.createLog = (req, res) => {
    currentUser = req.session.user;
    query = "CALL create_log(?, ?)";


	let type = req.session.user.type;
    connection.userType(type).query(query,
        [
            req.body.id, 
            req.body.message 
        ], (err, rows) => {
            if(!err) {
                return res.status(200).send({ 'message' : 'Sucessfully created log'});
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}
