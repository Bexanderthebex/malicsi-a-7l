'use strict'

var connection = require(__dirname + './../config/db-connection');
const mysql = require('mysql');
const bodyParser = require('body-parser');

exports.editSport = (req, res, next) => {
	let query = 'call editSport(?, ?, ?, ?, ?, ?, ?, ?, ?)';

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
  
	connection.userType('A').query('CALL create_sport(?, ?, ?, ?, ?)', 
		[req.body.timeStart,
		 req.body.timeEnd,
		 req.body.date,
		 req.body.scoringSystem,
		 req.body.gameID], 
		(err, rows) => {
		if (!err){
			connection.userType('A').query('CALL specific_sport(?)', rows.insertId, (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}

exports.viewSportDetails = (req, res) => {
	connection.userType('A').query('CALL specific_sport(?)', [req.params.sportID], (err, rows) => {
		if (!err){
			res.status(200).send(rows[0]);
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}


exports.addWinnerSport = (req, res, next) => {
	let query = 'call addWinnerSport(?,?)';
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

