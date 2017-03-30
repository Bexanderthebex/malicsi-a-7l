'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.createGame = (req, res) => {
	let query = 'CALL create_game(?,?,?,?,?,?);'
	connection.userType('A').query(query
	, [req.body.orgID,
	   req.body.gameName,
	   req.body.startDate,
	   req.body.endDate,
	   req.body.locat,
	   req.body.descrip
	   ], 

	   (err, row) => {
		if(!err){
			res.status(200).send("Successfully");
		}
		else{
			res.status(500).send(err);
		}
	});
}

exports.updateGame = (req, res) => {
	let query = 'CALL update_game(?,?,?,?,?,?);'
	connection.userType('A').query(query
			, [req.body.gameId,
			   req.body.name,
			   req.body.startDate,
			   req.body.endDate,
			   req.body.location,
			   req.body.description,
			  ],

			   (err, rows) =>{
			   if(!err){
					res.status(200).send("Successfully");
				}
				else{
					res.status(500).send("Internal Server Error");
				}
		});
}

exports.viewGameDetails = (req, res) => {
	let query = 'select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game_id = ?';
	connection.query(query, 
		[req.params.game_id], 
		(err, results, fields)	=> {
		if (err) {
			console.log(err.code);
			res.status(500).send("An error occurred.");
			throw err;
		}
		else if (results.length==0){
			res.status(404).send("Game not found.");
		}
		else
			res.status(200).send(results);

	});
}

exports.deleteGame = (req, res) => {
	let query = 'CALL delete_game(?);'
	connection.userType('A').query(query, [req.body.gameId], function(err, rows) {
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
