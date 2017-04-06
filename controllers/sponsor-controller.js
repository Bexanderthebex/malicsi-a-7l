'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addSponsorToGame = (req, res) => {
	var query = 'CALL add_sponsor_to_game(?, ?)';
	connection.userType('A').query(query, 
		[
			req.body.gameId, 
			req.body.sponsorId
		], 
		(err, results, fields)	=> {	
		if(!err){
			connection.userType('A').query('CALL view_last_inserted_sponsor ()',(err, rows) => {
				return res.status(200).send(rows[0]);	
			});
		}	
		else{
			if(err.code == 'ER_DUP_ENTRY') {
				res.status(400).send("Unable to add sponsor. Reason: Duplicate/Already a sponsor of the game.");
			}
			else if (err.code == 'ER_NO_REFERENCED_ROW_2'){
				res.status(400).send("Unable to add sponsor. Reason: Sponsor being added or game being added to does not exist.");
			}
			else if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'){
				res.status(400).send("Unable to add sponsor. Reason: Invalid values.");
			}
			else{
				console.log(err.code);
				res.status(500).send("Unknown error.");
			}


		} 
	})

}

exports.editSponsorDetails = (req, res) => {
	var query = 'CALL edit_sponsor_details(?,?)';
	let sponsorId = req.body.sponsor_id;
	connection.userType('A').query(query, 
		[
			req.body.description, 
			sponsorId
		], 
		(err, rows) => {
		if(!err && rows.affectedRows != 0){
			connection.userType('A').query('CALL view_sponsor(?)', sponsorId, (err, rows) => {
				return res.status(200).send(rows[0]);
			})		
		}
		else if (rows.affectedRows == 0){
			res.status(400).send("Unable to edit sponsor. Reason: Sponsor being edited does not exist.")
		}
		else if(err){			
			if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'){
				res.status(400).send("Unable to edit sponsor. Reason: Invalid values.");
			}
			else{
				console.log(err.code);
				res.status(500).send("Unknown error.");
			}
		}
	})
}

exports.viewSponsor = (req, res) => {
	let query = 'CALL view_sponsor(?,?)';
	connection.userType('A').query(query,
		[
			req.body.sponsorId
		],
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows[0]);
			} 
			else{
				res.status(500).send("Internal Server Error");
			}
		});
}

exports.viewSponsor = (req, res) => {
	let query = 'CALL view_all_sponsors_in_game(?)';
	connection.userType('A').query(query,
		[
			req.body.gameId
		],
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows);
			} 
			else{
				res.status(500).send("Internal Server Error");
			}
		});
}

exports.deleteSponsorFromGame = (req, res) => {
	var query = 'CALL view_sponsor(?)';
	let sponsorId = req.body.sponsorId;
	let gameId = req.body.gameId;
	connection.query(query, 
		[
			sponsorId
		], 
		(err, rows) => {
		let deleted = rows;
		if(!err) {
			connection.userType('A').query('CALL delete_sponsor_from_game(?)', sponsorId, (err, rows) => {
				return res.status(200).send(deleted[0]);
			})
		}
		else 
			res.status(404).send("Unable to delete sponsoring institution!");
	})
}
