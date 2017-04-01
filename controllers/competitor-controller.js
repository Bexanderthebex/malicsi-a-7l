const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchCompetitor = (req, res) => {
	query = "CALL search_competitor(?)";

	connection.userType('A').query(query, 
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
		    if(!err) {
		    	if(rows[0].length == 1) {
					res.status(200).send(rows[0][0]);
					return rows[0][0];
				} else {
					res.status(200).send(rows[0]);
					return rows;
				}
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getCompetitor = (req, res) => {
	query = "CALL get_competitor(?)";

	connection.userType('A').query(query, 
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
		    if(!err) {
				res.status(200).send(rows[0]);
				return rows;
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.editCompetitor = (req,res) => {
	currentUser = req.session.user;
	query = "CALL edit_competitor(?,?,?,?,?,?)";
	query1 = "CALL getCompetitor(?)";

	connection.userType('A').query(query,
		[
			req.body.first_name, 
			req.body.last_name, 
			req.body.birthday, 
			req.body.nickname, 
			req.body.sex, 
			req.body.id
		], (err, rows) => {
			if(!err) {
				connection.query(query1, 
					[
						req.body.id
					], (err, rows) => {
					if(!err) {
						res.status(200).send(rows[0]);
						return rows[0];
					}
				});
			} else {
				return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}