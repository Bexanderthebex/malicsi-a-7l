'use strict'

var connection = require(__dirname + './../config/db-connection');
const mysql = require('mysql');
const bodyParser = require('body-parser');

exports.editSport = (req, res, next) => {
	let query = 'call editSport(?, ?, ?, ?, ?, ?, ?, ?, ?)'

	connection.userType('A').query(query,
			[
				req.body.sport_name,
				req.body.mechanics,
				req.body.time_start,
				req.body.time_end,
				req.body.start_date,
				req.body.end_date,
				req.body.sport_date,
			   	req.body.scoring_system,
			   	req.body.sport_id
			], function(err, rows){
			   		if(!err){
			        	res.status(200).send(rows);
			        } 
			   		else{
			       		 res.status(404).send("edit unsuccessful. error occured");
			        }
				});
}

exports.createSport = (req, res) => {
	const newSport = {
		time_start: req.body.timeStart,
		time_end: req.body.timeEnd,
		date: req.body.date,
		scoring_system: req.body.scoringSystem,
		game_id: req.body.gameID
	};
	connection.query('INSERT INTO sport SET ?', newSport, (err, rows, fields) => {
		if (err){ 
			res.status(500).send(message);

		}else{
			connection.query('SELECT * FROM sport where sport_id = ?', rows.insertId, (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}
	})


}

exports.viewSportDetails = (req, res) => {
	connection.query('SELECT * FROM sport where sport_id = ?', req.params.sportID, (err, rows, fields) => {
		if (err){
			res.status(500).send(err);
		}else{
			res.status(200).send(rows[0]);
		}
	})
}

exports.addWinnerSport = (req, res, next) => {
	let query = 'call addWinnerSport(?,?)'

	connection.userType('A').query(query,
			[
				req.body.winner,
				req.body.sport_id
			], function(err, rows){
					if(!err){
						res.status(200).send(rows);
					}
					else if(rows.length = undefined){
						res.status(204).send(req.body.sport_id + " already updated");
					}
					else{
						res.status(404).send("update unsuccessful. error occured");
					}
			
				});
}

exports.deleteSport = (req, res, next) => {
	let query = 'call deleteSport(?)'

	connection.userType('A').query(query,
		[
			req.body.sport_id
		], function(err,rows){
				if(!err) {
					res.status(200).send("successfully deleted " + req.body.sport_id);
				}
				else if(rows.length == undefined ){ 
					res.status(204).send(req.body.sport_id + " not found!");
				}
				else{
					res.status(404).send("delete unsuccessful. error occured");
				}
			});
}

