const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addSponsorToGame = (req, res) => {
	var query = 'INSERT into sponsor_games VALUES(?, ?)';
	connection.query(query, [req.body.sponsor_id, req.body.game_id], function(err, results, fields){
		if(err) {
			res.status(404).send("Unable to add sponsor.");
			throw err;

		}
		else res.status(200).send("Successfully added sponsor to game!");
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

exports.deleteSponsorFromGame = (req, res) => {
	var query = 'DELETE FROM sponsor_institution WHERE sponsor_id = ? AND game_id = ?';
	connection.query(query, [req.body.sponsor_id, req.body.game_id], function(err, results, fields){
		if(err) {
			res.status(404).send("Unable to delete sponsoring institution!");
			throw err;
		}
		else res.status(200).send("Successfully deleted sponsoring institution!");
	})
}