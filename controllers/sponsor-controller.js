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