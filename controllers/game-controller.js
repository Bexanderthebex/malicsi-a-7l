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
	let query = 'call viewGameDetails(?);';

	connection.userType('A').query(query, 
		[req.params.gameId], 
		(err, results, fields)	=> {

		if (!err && results[0].length!=0) {
			res.status(200).send(results);
		}
		else if (results[0].length==0){
			res.status(404).send("Game not found.");
		}		
		else{
			console.log(err.code);
			res.status(500).send("An error occurred.");
			throw err;
		}
		
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

exports.countGameOrganizer = (req, res) => {
	let query = 'CALL count_game_organizer(?)';
	connection.userType('A').query(query,
		[
			req.params.organizerId
		], (err, rows, fields) => {
			//console.log(req.body.organizerId);
			if(!err){
				res.status(200).send(rows);
			}
			else{

				res.status(500).send("Internal Server Error");
			}
		});
}