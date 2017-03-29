'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.createGame = (req, res) => {
	let newGame = {
		organizer_id : req.body.orgId,
		name : req.body.gameName,
		start_date : req.body.startDate,
		end_date : req.body.endDate,
		location  : req.body.location,
		description  : req.body.description
	}

	connection.query('INSERT INTO game SET ?', newGame, (err, row) => {
		if(!err){
			res.status(200).send("Successfully");
		}
		else{
			res.status(500).send("Internal Server Error");
		}
	});
}

exports.updateGame = (req, res) => {
	connection.query("UPDATE game SET name = ?, start_date = ?, end_date = ?, location = ?, description = ? WHERE game_id = ?"
			, [req.body.name,
			   req.body.startDate,
			   req.body.endDate,
			   req.body.location,
			   req.body.description,
			   req.body.gameId
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
	connection.query('DELETE FROM game WHERE game_id = ?', [req.body.gameId], function(err, rows) {
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
