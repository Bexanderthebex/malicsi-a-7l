'use strict'

var connection = require(__dirname + './../config/db-connection');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const logs = require('./../controllers/log-controller.js');


exports.editSport = (req, res, next) => {
	let query = 'CALL edit_sport(?, ?, ?, ?, ?, ?, ?, ?, ?)';
	connection.userType(req.session.user.type).query(query,
	[
		req.body.sportName,
		req.body.mechanics,
		req.body.timeStart,
		req.body.timeEnd,
		req.body.startDate,
		req.body.endDate,
		req.body.maxTeams,
		req.body.scoringSystem,
		req.body.sportId
	], (err, rows) => {
		if(!err){
			logs.createLog(req.session.user.id, "Updated Sport");
			return res.status(200).send(rows);
		} 
		else{
			return res.status(500).send("Edit unsuccessful. Error occured");
		}
	});
}


exports.createSport = (req, res) => {
  	let query = 'CALL create_sport(?, ?, ?, ?, ?, ?, ?, ?, ?);';
	connection.userType(req.session.user.type).query(query, 
		[
			req.body.sportName,
			req.body.mechanics,
			req.body.timeStart,
			req.body.timeEnd,
			req.body.startDate,
			req.body.endDate,
			req.body.maxTeams,
			req.body.scoringSystem,
			req.body.gameID
		], (err, rows) => {
			if (!err){
				connection.userType(req.session.user.type).query('CALL view_last_inserted_sport()', (err, rows) => {
					logs.createLog(req.session.user.id, "Created Sport");
					return res.status(200).send(rows[0]);
				})
			}else{
				return res.status(500).send("Internal Server Error");
		}
	});
}

exports.countSportByGame = (req, res) => {
	let query = 'CALL count_sport_by_game(?)';
	connection.userType('G').query(query, 
		[
			req.params.gameID
		], (err, rows) => {
			if (!err){
				return res.status(200).send(rows[0]);
			}else{
				return res.status(500).send("Internal Server Error");
			}
	});
}

exports.viewSportDetails = (req, res) => {
	let query = 'CALL view_sport(?)';
	connection.userType('G').query(query, 
		[
		req.query.sportID
		], 
		(err, rows) => {
		if (!err){
			return res.status(200).send(rows[0][0]);
		}else{
			return res.status(500).send("Internal Server Ercvror");
		}
	});
}


exports.addWinnerSport = (req, res, next) => {
	let query = 'CALL add_winner_sport(?,?)';
	connection.userType(req.session.user.type).query(query,
		[
			req.body.winner,
			req.body.sportId
		], (err, rows) => {
				if(!err && !rows){
					return res.status(200).send(rows);
				}
				else if(rows.length = undefined){
					return res.status(404).send(req.body.sport_id + " already updated");
				}
				else{
					return res.status(500).send("update unsuccessful. error occured");
				}
		
		});
}

exports.deleteSport = (req, res, next) => {
	let query = 'CALL delete_sport(?)';

	connection.userType(req.session.user.type).query(query,
		[
			req.body.sportId
		], (err,rows) => {
				if(!err) {
					logs.createLog(req.session.user.id, "Deleted Sport");
					return res.status(200).send("successfully deleted " + req.body.sportId);
				}
				else if(rows.length == undefined ){ 
					return res.status(404).send(req.body.sport_id + " not found!");
				}
				else{
					return res.status(500).send("delete unsuccessful. error occured");
				}
		});

}


exports.searchForSportByKeyword = (req,res) => {
	let query = 'call search_for_sport_by_keyword(?);';
	let param = '%' + req.query.keyword + '%';
	connection.userType('G').query(query, 
		param,
		(err, results, fields)	=> {
		if (!err) {
			return res.status(200).send(results[0]);
		}		
		else{
			return res.status(500).send("An error occurred.");
		}
		
	});

}


exports.retrieveCompetitorSportRankings = (req, res, next) => {
	let query = 'CALL retrieve_competitor_rankings_from_sport(?, ?)';
	let param = parseInt(req.params.sportId);
	if(!isNaN(param)){
		connection.userType('G').query(query,
			[req.params.sportId, req.params.id],
			(err, rows) =>{
				if(!err){
					return res.status(200).send(rows[0]);
				}
				else if(rows.length == undefined){
					return res.status(404).send("Rankings are unavailable.");
				}
				else{
					console.log(err);
					return res.status(500).send("Internal server error.");
				}
			});

	}
	else{
		res.status(400).send("Invalid parameter.");
	}
}

exports.retrieveSportRankings = (req, res, next) => {
	let query = 'CALL retrieve_sport_rankings(?)';
		connection.userType('G').query(query,
			[req.params.sportId],
			(err, rows) =>{
				if(!err){
					return res.status(200).send(rows[0]);
				}
				else if(rows.length == undefined){
					return res.status(404).send("Rankings are unavailable.");
				}
				else{
					console.log(err);
					return res.status(500).send("Internal server error.");
				}
			});

}

exports.retrieveSponsorInSport = (req, res, next) => {
	let query = 'CALL retrieve_sponsor_in_sport(?)';
	connection.userType('G').query(query,
	[req.params.sportId],
	(err, rows) =>{
		if(!err){
			if(rows.length == undefined){
				return res.status(404).send("Sponsors are unavailable.");
			}
			else
				return res.status(200).send(rows[0]);
		}
		else{
			console.log(err);
			return res.status(500).send("Internal server error.");
		}
	});

}

exports.retrieveTeamsInSport = (req, res, next) => {
	let query = 'CALL retrieve_teams_in_sport(?)';
	connection.userType('G').query(query,
	[req.params.sportId],
	(err, rows) =>{
		if(!err){
			if(rows.length == undefined){
				return res.status(404).send("Sponsors are unavailable.");
			}
			
			else
				return res.status(200).send(rows[0]);
		}
		else{
			console.log(err);
			return res.status(500).send("Internal server error.");
		}
	});

}

