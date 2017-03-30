'use strict'
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.viewMatchInSport = (req, res) => {
	let query = "call view_match_sport(?)"
	connection.userType('A').query(query, [req.params.sportId], (err, rows, fields) => {
		if (!err){
			res.status(200).send(rows[0]);
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}



exports.viewMatchDetails = (req, res) => {
	let query = 'call view_match_details(?);';

	connection.userType('A').query(query, 
		[req.params.matchId], 
		(err, results, fields)	=> {

		if (!err && results[0].length!=0) {
			res.status(200).send(results);
		}
		else if (results[0].length==0){
			res.status(404).send("Match not found.");
		}		
		else{
			console.log(err.code);
			res.status(500).send("An error occurred.");
			throw err;
		}
		
	});


}