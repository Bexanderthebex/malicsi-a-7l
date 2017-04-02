'use strict'
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addMatch = (req, res) => {
	connection.userType('A').query('CALL add_match(?, ?, ?, ?)', 
		[req.body.timeStart,
		 req.body.timeEnd,
		 req.body.date,
		 req.body.sportID], 
		(err, rows) => {
		if (!err){
			connection.userType('A').query('CALL view_last_inserted_match()', (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}


exports.editMatch = function(req, res, next){
	let query = 'CALL edit_match(?, ?, ?, ?, ?);';
	connection.userType('A').query(query,
		[req.body.timeStart,
		 req.body.timeEnd,
		 req.body.date,
		 req.body.remarks,
		 req.body.matchID],
		(err, rows) => {
		if(!err){
		    connection.userType('A').query('CALL view_match(?)', req.body.matchID, (err, rows) => {
				res.status(200).send(rows[0]);
			});
		}else{
		    res.status(404).send(err);
		}
	})
}

exports.editTeamRankingInMatch = function(req, res, next){
	connection.userType('A').query("CALL edit_team_ranking_in_match(?, ?, ?)"
		[req.body.ranking,
		 req.body.matchID,
		 req.body.teamID],
		(err, rows) => {
		if(!err){
		    connection.userType('A').query('CALL view_team_in_match(?)', req.body.matchID, (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}else{
		    res.status(404).send("Not Found");
		}
	});
}

exports.viewMatchInSport = (req, res) => {
	let query = "call view_match_sport(?)"
	connection.userType('A').query(query, 
		[req.query.sportId], 
		(err, rows, fields) => {
		if (!err){
			res.status(200).send(rows[0]);
		}else{
			console.log(err);
			res.status(500).send("Internal Server Error");
		}
	})
}

exports.viewMatchDetails = (req, res) => {
	let query = 'call view_match_details(?);';

	connection.userType('A').query(query, 
		[req.query.matchId], 
		(err, results, fields) => {

		if (!err && results[0].length!=0) {
			res.status(200).send(results);
		}
		else if (results[0].length==0){
			res.status(404).send("Match not found.");
		}		
		else{
			res.status(500).send("An error occurred.");
		}		
	});
}

exports.viewAllMatch = (req, res) => {
	let query = 'SELECT * FROM sport_match';
	connection.userType('A').query(query,
		(err, results) => {
			if(!err){
				res.status(200).send(results);
				
			} 
			else{
				res.status(500).send("Internal Server Error");
			}
		});
}
exports.deleteMatch = (req, res) => {
	let query = 'CALL delete_match(?);'
	connection.query(query, [req.body.matchId], function(err, rows) {
		if(!err){
			if (rows.length == 0) {
				res.status(501).send('Not Implemented');
			} else {
				 res.status(200).send('Sucessful');
			}
		}else{
			res.status(500).send("Internal Server Error");
		}
	});
}