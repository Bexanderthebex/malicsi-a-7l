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
		req.body.sportDate,
		req.body.scoringSystem,
		req.body.sportId
	], (err, rows) => {
		if(!err){
			res.status(200).send(rows);
		} 
		else{
			res.status(500).send("edit unsuccessful. error occured");
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
	let query = 'CALL add_winner_sport(?,?)';
	connection.userType('A').query(query,
			[
				req.body.winner,
				req.body.sportId
			], (err, rows) => {
					if(!err && !rows){
						res.status(200).send(rows);
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
					res.status(200).send("successfully deleted " + req.body.sport_id);
				}
				else if(rows.length == undefined ){ 
					res.status(404).send(req.body.sport_id + " not found!");
				}
				else{
					res.status(500).send("delete unsuccessful. error occured");
				}
			});

}

