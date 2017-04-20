'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');



exports.createGame = (req, res) => {
	console.log(req.body);
	let query = 'CALL create_game(?,?,?,?,?,?);'
	connection.userType('A').query(query, 
		[	
			req.body.orgID,
			req.body.gameName,
			req.body.startDate,
			req.body.endDate,
			req.body.locat,
			req.body.descrip
	    ], 
	    (err, results) => {
			if(!err){
				connection.userType('A').query('CALL view_last_inserted_game()',(err, rows) => {
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
	connection.userType('A').query(query, 
		[
			gameId,
			req.body.name,
			req.body.startDate,
			req.body.endDate,
			req.body.location,
			req.body.description,
		], (err, rows) =>{
				if(!err){
					connection.userType('A').query('CALL view_game_details(?)', gameId, (err, rows) => {
						return res.status(200).send(rows[0]);
				
					});
				}
				else{
					res.status(500).send("Internal Server Error");
				}
	});
}

exports.viewGameDetails = (req, res) => {
	let query = 'call view_game_details(?);';
	let param = parseInt(req.query.gameId);	
	if (!isNaN(param)){
		connection.userType('A').query(query,
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
		connection.userType('A').query(query,

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

		connection.userType('A').query(query, 
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
					res.status(500).send("An error occurred.");
				}
			});
	} else res.status(400).send("Invalid parameter.")
}

exports.deleteGame = (req, res) => {
	let query = 'CALL view_game_details(?);'
	let gameId = req.body.gameId;
	connection.userType('A').query(query, 
		[
			gameId
		], 
		(err, rows) => {
		let deleted = rows;
		if(!err){
			if (rows.length == 0) {
				res.status(501).send('Not Implemented');
			} else {
				connection.userType('A').query('CALL delete_game(?)', gameId, (err, rows) => {
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
	connection.userType('A').query(query,
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
	connection.userType('A').query(query, 
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

exports.viewAllOngoingMatchesInGame = (req, res) => {
	let query = 'CALL view_all_ongoing_matches_in_game(?)';
	connection.userType('A').query(query,
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
	connection.userType('A').query(query,
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
	connection.userType('A').query(query,
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
		connection.userType('A').query(query,
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

/**
exports.addOrganizationToGame = (req, res) =>{
	connection.userType('A').query('CALL check_organization(?)', 
		[req.body.orgName], 
		(err, rows) => {
		if (!err && rows.length != 0) {
			connection.userType('A').query('CALL add_organization_to_game(?, ?)', [req.body.orgId, req.body.gameId], (err, rowers) => {
				if(!err){
					return res.status(200).send("Successfully Added");
				}else{
					res.status(500).send("Internal Server Error");
				}
			})			
		}else{
			res.status(401).send("Organization not yet registered, Cannot add to game");
		}	


	})
}
**/

exports.viewAllOrganization = (req, res) => {
	connection.userType('A').query('CALL view_all_organization(?)', 
		[req.body.gameId], 
		(err, rows) => {
		if (!err) {
			return res.status(200).send(rows);		
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}

exports.addOrganizationToGame = (req, res) =>{
	connection.userType('A').query('CALL add_organization_to_game(?, ?)', 
		[req.body.orgId, req.body.gameId], 
		(err, rows) => {
		if (!err) {
			return res.status(200).send("Successfully Added");		
		}else{
			res.status(500).send("Internal Server Error");
		}	


	})
}

exports.deleteOrganizationFromGame = (req, res) =>{
	connection.userType('A').query('CALL delete_organization_from_game(?, ?)', 
		[req.body.orgId, req.body.gameId], 
		(err, rows) => {
		if (!err) {
			return res.status(200).send("Successfully Deleted");		
		}else{
			res.status(500).send("Internal Server Error");
		}	


	})
}



