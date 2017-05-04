'use strict'
const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const logs = require('./../controllers/log-controller.js');


exports.addMatch = (req, res) => {
	connection.userType('G').query('CALL add_match(?, ?, ?, ?)', 
		[req.body.timeStart,
		 req.body.timeEnd,
		 req.body.date,
		 req.body.sportID], 
		(err, rows) => {
		if (!err){
			connection.userType('G').query('CALL view_last_inserted_match()', (err, rows) => {
				logs.createLog(req.session.user.id, "Created Match");
				return res.status(200).send(rows[0]);
			})
		}else{
			return res.status(500).send("Internal Server Error");
		}
	})
}

exports.countMatchBySport = (req, res) => {
	let query = 'CALL count_match_by_sport(?)';
	connection.userType('G').query(query, 
		[
		req.params.sportID
		], 
		(err, rows) => {
		if (!err){
			return res.status(200).send(rows[0]);
		}else{
			return res.status(500).send("Internal Server Error");
		}
	});
}

exports.editMatch = function(req, res, next){
	let query = 'CALL edit_match(?, ?, ?, ?, ?);';
	connection.userType(req.session.user.type).query(query,
		[
			req.body.timeStart,
			req.body.timeEnd,
			req.body.date,
			req.body.remarks,
			req.body.matchID
		 ],
		(err, rows) => {
		if(!err){
		    connection.userType(req.session.user.type).query('CALL view_match_details(?)', req.body.matchID, (err, rows) => {
				logs.createLog(req.session.user.id, "Updated Match");
				return res.status(200).send(rows[0]);
				
			});

		}else{
		    return res.status(404).send("Not Found");
		}
	})
}

exports.editTeamRankingInMatch = function(req, res, next){
	connection.userType(req.session.user.type).query("CALL edit_team_ranking_in_match(?, ?, ?)"
		[req.body.ranking,
		 req.body.matchID,
		 req.body.teamID],
		(err, rows) => {
		if(!err){
		    connection.userType(req.session.user.type).query('CALL view_team_in_match(?)', req.body.matchID, (err, rows) => {
				logs.createLog(req.session.user.id, "Updated Team Ranking in Match");
				return res.status(200).send(rows[0]);
			})
		}else{
		    return res.status(404).send("Not Found");
		}
	});
}

exports.viewMatchInSport = (req, res) => {
	let query = "call view_match_sport(?)"
	connection.userType('G').query(query, 
		[req.query.sportId], 
		(err, rows, fields) => {
		if (!err){
			return res.status(200).send(rows[0]);
		}else{
			return res.status(500).send("Internal Server Error");
		}
	})
}

exports.viewMatchDetails = (req, res) => {
	let query = 'call view_match_details(?);';

	connection.userType('G').query(query, 
		[req.query.matchId], 
		(err, rows) => {

		if (!err && rows[0].length!=0) {
			return res.status(200).send(rows);
		}
		else if (rows[0].length==0){
			return res.status(404).send("Match not found.");
		}		
		else{
			return res.status(500).send("An error occurred.");
		}		
	});
}

exports.viewAllMatch = (req, res) => {
	let query = 'CALL view_all_match()';
	connection.userType('G').query(query,
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows);
			} 
			else{
				return res.status(500).send("Internal Server Error");
			}
		});
}
exports.deleteMatch = (req, res) => {
	let query = 'CALL view_match_details(?);';
	let matchId = req.body.matchId
	
	connection.userType(req.session.user.type).query(query, 
		matchId, 
		(err, rows) => {
		let deleted = rows;
		if(!err){
			if (rows.length == 0) {
				return res.status(501).send('Not Implemented');
			} else {
				   connection.userType(req.session.user.type).query('CALL delete_match(?)', matchId , (err, rows) => {
						logs.createLog(req.session.user.id, "Deleted Match");
						return res.status(200).send(deleted[0]);
					})
			}
		}else{
			return res.status(500).send("Internal Server Error");
		}
	});
}

//start of new added controllers
exports.viewCurrentMatch = (req, res) => {
	let query = 'CALL view_current_match(?)';

	connection.userType('G').query(query,
		[req.params.sportId],
		(err, rows, fields) => {
		if(!err){
			if(rows.length == 0){
				return res.status(200).send([]);
			}
			else{
				return res.status(200).send(rows[0]);
			}
		}else{
			return res.status(500).send("Internal server error occurred");
		}
	});
}

exports.viewPastMatch = (req, res) => {
	let query = 'CALL view_past_match(?)';

	connection.userType('G').query(query,
		[req.params.sportId],
		(err, rows, fields) => {
		if(!err){
			if(rows.length == 0){
				return res.status(200).send([]);
			}
			else{
				return res.status(200).send(rows[0]);
			}
		}else{
			return res.status(500).send("Internal server error occurred");
		}
	});
}

exports.viewFutureMatch = (req, res) => {
	let query = 'CALL view_future_match(?)';

	connection.userType('G').query(query,
		[req.params.sportId],
		(err, rows, fields) => {
		if(!err){
			if(rows.length == 0){
				return res.status(200).send([]);
			}
			else{
				return res.status(200).send(rows[0]);
			}
		
		}else{
			return res.status(500).send("Internal server error occurred");
		}
	});
}

exports.retrieveTeamsInMatch = (req, res) => {
	let query = 'CALL retrieve_teams_in_match(?)';

	connection.userType('G').query(query,
		[req.params.matchId],
		(err, rows, fields) => {
		if(!err){
			console.log(rows);
			if(rows.length == 0){
				return res.status(200).send([]);
			}
			else{
				return res.status(200).send(rows[0]);
			}
		
		}else{
			console.log(err)
			return res.status(500).send("Internal server error occurred");
		}
	});
}


exports.retrieveMatchWinner = (req, res) => {
	let query = 'CALL retrieve_match_winner(?)';

	connection.userType('G').query(query,
		[req.params.sportId],
		(err, rows, fields) => {
		if(rows.length === 0){
			return res.status(200).send(rows[0]);
		}else if(!err){
			return res.status(404).send("There are no current match winners");
		}else{
			return res.status(500).send("Internal server error occurred");
		}
	});
}
