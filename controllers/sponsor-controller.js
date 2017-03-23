const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addSponsorToGame = (req, res) => {
	var query = 'INSERT into sponsor_games SET ?';
	var params = {
		sponsor_id : req.body.sponsorId,
		game_id : req.body.gameId
	}
	connection.query(query, 
		params, 
		(err, results, fields)	=> {	
		if(!err){
			res.status(204).send("Successfully added sponsor to game!");		
		}	
		else{
			if(err.code == 'ER_DUP_ENTRY') {
				res.status(400).send("Unable to add sponsor. Reason: Duplicate/Already a sponsor of the game.");
			}
			else if (err.code == 'ER_NO_REFERENCED_ROW_2'){
				res.status(400).send("Unable to add sponsor. Reason: Sponsor being added or game being added to does not exist.");
			}
			else if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'){
				res.status(400).send("Unable to add sponsor. Reason: Invalid values.");
			}
			else{
				console.log(err.code);
				res.status(500).send("Unknown error.");
			}


		} 
	})

}

exports.editSponsorDetails = (req, res) => {
	var query = 'UPDATE sponsor_institution SET description = ? WHERE sponsor_id = ?';
	connection.query(query, 
		[req.body.description, 
		req.body.sponsor_id
		], 
		(err, results, fields) => {
		if(err) {
			res.status(404).send("Unable to update sponsoring institution details!");
			throw err;
		}
		else res.status(200).send("Successfully updated sponsoring institution details!");
	})
}

exports.deleteSponsorFromGame = (req, res) => {
	var query = 'DELETE FROM sponsor_institution WHERE sponsor_id = ? AND game_id = ?';
	connection.query(query, 
		[req.body.sponsor_id,
		 req.body.game_id
		], 
		(err, results, fields) => {
		if(err) {
			res.status(404).send("Unable to delete sponsoring institution!");
			throw err;
		}
		else res.status(200).send("Successfully deleted sponsoring institution!");
	})
}