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
	let query1 = 'select * from log where date_created between ? and ?';
	let query2 = 'select * from log where user_id = ?'
	let query3 = 'select * from log where user_id = ? and date_created between ? and ?';
	let query4 = 'select id from user where username = ?'

	console.log(req.query);

	if(req.query.username === undefined){
		connection.userType('A').query(query1, 
			[
				req.query.startDate,
				req.query.endDate
			], (err, rows) => {
				if(!err) {
					res.status(200).send(rows);
					return rows;
				} else {
					if(err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({'message':'Missing field.'});
					else return res.status(500).send({'message' : 'Internal Server Error'});
				}
			}
		);
	}else if(req.query.startDate === undefined || req.query.endDate === undefined){
		console.log('query 2 pumasok');
		connection.userType('A').query(query4, 
			[
				req.query.username
			], (err, rows) => {
				if(!err) {
					console.log(rows.length);
					if(rows.length === 1){
						connection.userType('A').query(query2,
							[
								rows[0].id
							], (err, rows) => {
								if(!err){
									return res.status(200).send(rows);
								}else{
									console.log('Walang startDate or endDate', err);
									if(err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({'message':'Missing field.'});
									else res.status(500).send({ 'message' : 'Internal Server Error.' });
								}
							}
						);
					}else{
						return res.status(404).send({'message': 'User has no log entry.'});
					}
				} else {
					return res.status(500).send({'message' : 'Internal Server Error'});
				}
			}
		);
	}else{
		connection.userType('A').query(query4,
			[
				req.query.username
			], (err, rows) => {
				if(!err) {
					if(rows.length === 1){
						connection.userType('A').query(query3,
							[
								rows[0].id,
								req.query.startDate,
								req.query.endDate
							], (err, rows) => {
								if(!err){
									return res.status(200).send(rows);
								}else{
									console.log('Complete lahat', err);
									if(err.code == 'ER_BAD_NULL_ERROR') return res.status(400).send({'message':'Missing field.'});
									else res.status(500).send({ 'message' : 'Internal Server Error.' });
								}
							}
						);
					}else{
						return res.status(404).send({'message': 'User has no log entry.'});
					}
				} else {
					return res.status(500).send({'message' : 'Internal Server Error'});
				}
			}
		);
	}
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
