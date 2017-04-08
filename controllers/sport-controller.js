'use strict'

var connection = require(__dirname + './../config/db-connection');
const mysql = require('mysql');
const bodyParser = require('body-parser');


exports.editSport = (req, res, next) => {
	let query = 'CALL edit_sport(?, ?, ?, ?, ?, ?, ?, ?, ?)';
	connection.userType('A').query(query,
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
			res.status(200).send(rows);
		} 
		else{
			console.log(err);
			res.status(500).send("Edit unsuccessful. Error occured");
		}
	});
}


exports.createSport = (req, res) => {
  	let query = 'CALL create_sport(?, ?, ?, ?, ?, ?, ?, ?, ?);';
	connection.userType('A').query(query, 
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
				connection.userType('A').query('CALL view_last_inserted_sport()', (err, rows) => {
					return res.status(200).send(rows[0]);
				})
				// res.status(200).send(rows);
			}else{
				res.status(500).send("Internal Server Error");
		}
	});
}

exports.editSport = (req, res, next) => {
	let query = 'CALL edit_sport(?, ?, ?, ?, ?, ?, ?, ?, ?)';
	connection.userType('A').query(query,
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
				return res.status(200).send(rows);
			} 
			else{
				res.status(500).send("Edit unsuccessful. Error occured");
			}
	});
}


exports.countSportByGame = (req, res) => {
	let query = 'CALL count_sport_by_game(?)';
	connection.userType('A').query(query, 
		[
			req.params.gameID
		], (err, rows) => {
			if (!err){
				return res.status(200).send(rows[0]);
			}else{
				res.status(500).send("Internal Server Error");
			}
	});
}

exports.viewSportDetails = (req, res) => {
	let query = 'CALL view_sport(?)';
	connection.userType('A').query(query, 
		[
		req.query.sportID
		], 
		(err, rows) => {
		if (!err){
			res.status(200).send(rows[0][0]);
		}else{
			res.status(500).send("Internal Server Error");
		}
	});
}


exports.addWinnerSport = (req, res, next) => {
	let query = 'CALL add_winner_sport(?,?)';
	connection.userType('A').query(query,
		[
			req.body.winner,
			req.body.sportId
		], (err, rows) => {
				if(!err && !rows){
					return res.status(200).send(rows);
				}
				else if(rows.length = undefined){
					res.status(404).send(req.body.sport_id + " already updated");
				}
				else{
					res.status(500).send("update unsuccessful. error occured");
				}
		
		});
}

exports.deleteSport = (req, res, next) => {
	let query = 'CALL delete_sport(?)';

	connection.userType('A').query(query,
		[
			req.body.sportId
		], (err,rows) => {
				if(!err) {
					res.status(200).send("successfully deleted " + req.body.sportId);
				}
				else if(rows.length == undefined ){ 
					res.status(404).send(req.body.sport_id + " not found!");
				}
				else{
					res.status(500).send("delete unsuccessful. error occured");
				}
		});

}

exports.retrieveSportRankings = (req, res, next) => {
	let query = 'CALL retrieve_team_rankings_from_sport(?)';
	let param = parseInt(req.params.sportId);
	if(!isNaN(param)){
		connection.userType('A').query(query,
			[req.params.sportId],
			(err, rows) =>{
				if(!err){
					res.status(200).send(rows[0]);
					console.log(rows[0]);
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

exports.searchForSportByKeyword = (req,res) => {
	let query = 'call search_for_sport_by_keyword(?);';
	let param = '%' + req.query.keyword + '%';
	connection.userType('A').query(query, 
		param,
		(err, results, fields)	=> {
		console.log(err);
		console.log(results);
		if (!err) {
			res.status(200).send(results[0]);
		}		
		else{
			console.log(err.code);
			res.status(500).send("An error occurred.");
		}
		
	});
	
}


