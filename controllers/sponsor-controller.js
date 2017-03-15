const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.editSponsorDetails = (req, res) => {
	var query = 'UPDATE sponsor_institution SET description = ? WHERE sponsor_id = ?';
	connection.query(query, [req.body.description, req.body.sponsor_id], function(err, results, fields){
		if(err) {
			res.status(404).send("Unable to update sponsoring institution details!");
			throw err;
		}
		else res.status(200).send("Successfully updated sponsoring institution details!");
	})
}

exports.editSponsorDetails = (req, res) => {
	var query = 'UPDATE sponsor_institution SET description = ? WHERE sponsor_id = ?';
	connection.query(query, [req.body.description, req.body.sponsor_id], function(err, results, fields){
		if(err) {
			res.status(404).send("Unable to update sponsoring institution details!");
			throw err;
		}
		else res.status(200).send("Successfully updated sponsoring institution details!");
	})
}