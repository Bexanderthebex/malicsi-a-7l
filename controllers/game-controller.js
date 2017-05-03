'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const logs = require('./../controllers/log-controller.js');


exports.createGame = (req, res) => {
	console.log(req.body);
	let query = 'CALL create_game(?,?,?,?,?,?);'
	connection.userType(req.session.user.type).query(query,
		[
			req.body.orgID,
			req.body.gameName,
			new Date(req.body.startDate),
			new Date(req.body.endDate),
			req.body.locat,
			req.body.descrip
	    ],
	    (err, results) => {
			if(!err){
				connection.userType(req.session.user.type).query('CALL view_last_inserted_game()',(err, rows) => {
					logs.createLog(req.session.user.id, "Created Game");
					return res.status(200).send(rows[0]);
				});
			}
			else{
				console.log(err);
				res.status(500).send(err);

			}
	});
}



exports.updateGame = (req, res) => {
	let query = 'CALL update_game(?,?,?,?,?,?);'
	let gameId = req.body.gameId;
	connection.userType(req.session.user.type).query(query,
		[
			gameId,
			req.body.name,
			new Date(req.body.startDate),
			new Date(req.body.endDate),
			req.body.location,
			req.body.description,
		], (err, rows) =>{
				if(!err){
					connection.userType(req.session.user.type).query('CALL view_game_details(?)', gameId, (err, rows) => {
						logs.createLog(req.session.user.id, "Edited Game");
						return res.status(200).send(rows[0]);

					});
				}
				else{
					res.status(500).send("Internal Server Error");
				}
	});
}

exports.viewAllGames = (req, res) => {
	console.log(req.body);
	let query = 'CALL view_all_games();';
	connection.userType('G').query(query,
	    (err, results) => {
			if(!err){
				return res.status(200).send(results[0]);
			}
			else{
				console.log(err);
				res.status(500).send(err);

			}
	});
}

exports.viewGameDetails = (req, res) => {
	let query = 'call view_game_details(?);';
	let param = parseInt(req.query.gameId);
	if (!isNaN(param)){
		connection.userType('G').query(query,
		param,
		(err, results, fields)	=> {
		if (!err && results[0].length!=0) {
			res.status(200).send(results[0][0]);
		}
		else if (results[0].length==0){
			res.status(404).send("Game not found.");
		}
		else{
			console.log(err.code);
			res.status(500).send("An error occurred.");
		}
	});

	}
	else res.status(400).send("Invalid parameter.");
}

exports.searchForGameByKeyword = (req,res) => {
	let query = 'call search_for_game_by_keyword(?);';
	if(req.query.keyword != ''){
		connection.userType('G').query(query,

			[
				'%' + req.query.keyword + '%'
			], (err, rows, fields) => {
				console.log(err);
				console.log(rows);
				if (!err) {
					return res.status(200).send(rows[0]);
				}
				else{
					console.log(err.code);
					res.status(500).send("An error occurred.");
				}
			});
	}else{
		return res.status(200).send([]);
	}
}

exports.viewAllSportsInGame = (req, res) => {
	let query = 'call view_all_sports_in_game(?);';
	let param = parseInt(req.params.gameId);
	if (!isNaN(param)){

		connection.userType('G').query(query,
			param,
			(err, rows, fields)	=> {
				if (!err && rows[0].length!=0) {
					return res.status(200).send(rows[0]);
				}
				else if (rows[0].length==0){
					res.status(200).send([]);
				}

				else{
					console.log(err.code);
					return res.status(500).send("An error occurred.");
				}
			});
	} else return res.status(400).send("Invalid parameter.")
}

exports.deleteGame = (req, res) => {
	let query = 'CALL view_game_details(?);'
	let gameId = req.body.gameId;
	connection.userType(req.session.user.type).query(query,
		[
			gameId
		],
		(err, rows) => {
		let deleted = rows;
		if(!err){
			if (rows.length == 0) {
				res.status(501).send('Not Implemented');
			} else {
				connection.userType(req.session.user.type).query('CALL delete_game(?)', gameId, (err, rows) => {
				logs.createLog(req.session.user.id, "Deleted Game");
				return res.status(200).send(deleted[0]);

				});
			}
		}else{
			res.status(500).send("Internal Server Error");
		}
	});
}

exports.countGameOrganizer = (req, res) => {
	let query = 'CALL count_game_organizer(?)';
	connection.userType('G').query(query,
		[
			req.params.organizerId
		], (err, rows, fields) => {
			if(!err){
				return res.status(200).send(rows);
			}
			else{
				res.status(500).send("Internal Server Error");
			}
		});
}

exports.viewUpcomingOngoingGames = (req,res) =>{
	let query = 'call view_all_upcoming_ongoing_games();';
	connection.userType('G').query(query,
		(err, rows, fields)	=> {
			if (!err && rows[0].length!=0) {
				return res.status(200).send(rows[0]);
			}
			else if (rows[0].length==0){
				res.status(404).send("No upcoming/ongoing games.");
			}
			else{
				console.log(err.code);
				res.status(500).send("An error occurred.");
			}
	});
}

exports.viewUpcomingOngoingGamesNotLimited = (req,res) =>{
	let query = 'call view_all_upcoming_ongoing_games_not_limited();';
	connection.userType('G').query(query,
		(err, rows, fields)	=> {
			console.log(rows);
			if (!err && rows[0].length!=0) {
				return res.status(200).send(rows[0]);
			}
			else if (rows[0].length==0){
				res.status(404).send("No upcoming/ongoing games.");
			}
			else{
				console.log(err.code);
				res.status(500).send("An error occurred.");
			}
	});
}

exports.viewAllOngoingMatchesInGame = (req, res) => {
	let query = 'CALL view_all_ongoing_matches_in_game(?)';
	connection.userType('G').query(query,
		[
			req.query.gameId
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);
			}else if(rows[0].length ==0 ){
				res.status(200).send([]);
			}else{
				res.status(500).send("Internal Server Error Occured");
			}
		});
}

exports.viewAllPastMatchesInGame = (req, res) => {
	let query = 'CALL view_all_past_matches_in_game(?)';
	connection.userType('G').query(query,
		[
			req.query.gameId
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);

			}else if(rows[0].length == 0 ){
				res.status(200).send([]);
			}
			else{
				res.status(500).send("Internal Server Error Occured");
			}
		});
}

exports.viewAllUpcomingMatchesInGame = (req, res) => {
	let query = 'CALL view_all_upcoming_matches_in_game(?)';
	connection.userType('G').query(query,
		[
			req.query.gameId
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);
			}else if(rows[0].length ==0 ){
				res.status(200).send([]);
			}else{
				res.status(500).send("Internal Server Error Occured");
			}
		});
}

exports.retrieveOrgRankings = (req, res, next) => {
	let query = 'CALL retrieve_org_rankings_from_game(?)';
	let param = parseInt(req.params.gameId);
	if(!isNaN(param)){
		connection.userType('G').query(query,
			param,
			(err, rows) =>{
				if(!err){
					return res.status(200).send(rows[0]);
				}
				else if(rows.length == undefined){
					res.status(404).send("Rankings are unavailable.");
				}
				else{
					console.log(err);
					res.status(500).send("Internal server error.");
				}
			});

	}
	else{
		res.status(400).send("Invalid parameter.");
	}
}

exports.viewAllOrganizationForGame = (req, res) => {
	connection.userType('G').query('CALL view_all_organization_for_game(?)',
		[req.query.gameId],
		(err, rows) => {
		if (!err) {
			return res.status(200).send(rows[0]);
		}else{
			console.log(err);
			return res.status(500).send("Internal Server Error");
		}
	})
}

exports.viewAllOrganizationInGame = (req, res) => {
	connection.userType('G').query('CALL view_all_organization_in_game(?)',
		[req.query.gameId],
		(err, rows) => {
		if (!err) {
			return res.status(200).send(rows[0]);

		}else{
			console.log(err);
			return res.status(500).send("Internal Server Error");
		}
	})
}

exports.addOrganizationToGame = (req, res) =>{
	connection.userType(req.session.user.type).query('CALL add_organization_to_game(?, ?)',
		[req.body.orgId, req.body.gameId],
		(err, rows) => {
		if (!err) {
			logs.createLog(req.session.user.id, "Added Organization to Game");
			return res.status(200).send("Successfully Added");
		}else{
			return res.status(500).send("Internal Server Error");
		}


	})
}

exports.deleteOrganizationFromGame = (req, res) =>{
	connection.userType(req.session.user.type).query('CALL delete_organization_from_game(?, ?)',
		[req.body.orgId, req.body.gameId],
		(err, rows) => {
		if (!err) {
			logs.createLog(req.session.user.id, "Removed Organization from Game");
			return res.status(200).send("Successfully Deleted");
		}else{
			return res.status(500).send("Internal Server Error");
		}


	})
}


exports.viewAllOngoingGames = (req, res) => {
	let query = 'CALL view_all_ongoing_games(?)';

	connection.userType('G').query(query,
		[
			req.query.organizer_id
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);
			}else if(rows[0].length == 0){
				return res.status(200).send([]);
			}else{
				return res.status(500).send("Internal Server Error Occured");
			}
		});
}

exports.viewAllUpcomingGames = (req, res) => {
	let query = 'CALL view_all_upcoming_games(?)';
	
	connection.userType('G').query(query,
		[
			req.query.organizer_id
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);
			}else if(rows[0].length == 0){
				return res.status(200).send([]);
			}else{
				return res.status(500).send("Internal Server Error Occured");
			}
		});
}

exports.viewAllRecentGames = (req, res) => {
	let query = 'CALL view_all_recent_games(?)';

	connection.userType('G').query(query,
		[
			req.query.organizer_id
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);
			}else if(rows[0].length ==0 ){
				return res.status(200).send([]);
			}else{
				return res.status(500).send("Internal Server Error Occured");
			}
		});
}

exports.viewGameOrganizerDetails = (req, res) => {
	let query = 'CALL view_game_organizer_details(?)';
	connection.userType('G').query(query, [req.query.gameId],
		(err, rows, fields) => {
			if(!err)
				return res.status(200).send(rows[0]);
			else
				return res.status(500).send("Internal Server Error");

		})
}
