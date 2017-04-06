'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');



exports.createGame = (req, res) => {
	let query = 'CALL create_game(?,?,?,?,?,?);'
	connection.userType('A').query(query, 
		[	
			req.body.orgID,
			req.body.gameName,
			req.body.startDate,
			req.body.endDate,
			req.body.locat,
			req.body.descrip
	    ], (err, rows) => {
			if(!err){
				return res.status(200).send("Successfully");
			}
			else{
				res.status(500).send(err);
			}
	});
}



exports.updateGame = (req, res) => {
	let query = 'CALL update_game(?,?,?,?,?,?);'
	connection.userType('A').query(query, 
		[
			req.body.gameId,
			req.body.name,
			req.body.startDate,
			req.body.endDate,
			req.body.location,
			req.body.description,
		], (err, rows) =>{
				if(!err){
					return res.status(200).send("Successfully");
				}
				else{
					res.status(500).send("Internal Server Error");
				}
	});
}

exports.viewGameDetails = (req, res) => {
	let query = 'call view_game_details(?);';
	let param = parseInt(req.params.gameId);
	if (!isNaN(param)){
		connection.userType('A').query(query, param, 
		(err, rows, fields)	=> {
			if (!err && rows[0].length!=0) {
				return res.status(200).send(rows[0]);
			}
			else if (rows[0].length==0){
				res.status(404).send("Game not found.");
			}		
			else{
				console.log(err.code);
				res.status(500).send("An error occurred.");
			}	
		});
	} else res.status(400).send("Invalid parameter.");
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
				if (!err && rows[0].length!=0) {
					return res.status(200).send(rows[0]);
				}
				else if (rows[0].length==0){
					res.status(404).send("Game not found.");
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
					res.status(404).send("Sports not found. The game doesn't have sports yet, or the game doesn't exist yet.");
				}		
				else{
					console.log(err.code);
					res.status(500).send("An error occurred.");
				}
			});
	} else res.status(400).send("Invalid parameter.");
}

exports.deleteGame = (req, res) => {
	let query = 'CALL delete_game(?);'
	connection.userType('A').query(query, [req.body.gameId], function(err, rows) {
		if(!err){
			if (rows.length == 0) {
				res.status(501).send('Not Implemented');
			} else {
				return res.status(200).send('Sucessful');
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

exports.viewAllMatchesInGame = (req, res) => {
	let query = 'CALL view_all_matches_in_game(?)';
	connection.userType('A').query(query,
		[
			req.body.gameId
		], (err, rows, fields) => {
			if(!err && rows[0].length != 0){
				return res.status(200).send(rows[0]);
			}else if(rows[0].length ==0 ){
				res.send(404).send("No ongoing games");
			}else{
				res.status(500).send("Internal Server Error Occured");
			}
		});
}