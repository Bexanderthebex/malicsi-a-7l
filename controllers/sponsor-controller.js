'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const logs = require('./../controllers/log-controller.js');

exports.addSponsor= (req, res) => {
	var query = 'CALL add_sponsor(?, ?)';
	connection.userType(req.session.user.type).query(query,
		[
			req.body.name,
			req.body.description
		],
		(err, results, fields)	=> {
		if(!err){
			connection.userType(req.session.user.type).query('CALL view_last_inserted_sponsor()',(err, rows) => {
				logs.createLog(currentUser.id, "Created Sponsor");
				return res.status(200).send(rows[0]);
			});
		}
		else{
			if(err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'){
				return res.status(400).send("Unable to add sponsor. Reason: Invalid values.");
			}
			else{
				return res.status(500).send("Unknown error.");
			}


		}
	})

}


exports.addSponsorToGame = (req, res) => {
	var query = 'CALL add_sponsor_to_game(?, ?)';
	connection.userType(req.session.user.type).query(query,
		[
			req.body.sponsorId,
			req.body.gameId,
		],
		(err, results, fields)	=> {
		if(!err){
			connection.userType(req.session.user.type).query('CALL view_last_inserted_sponsor_to_game()',(err, rows) => {
				logs.createLog(currentUser.id, "Added Sponsor to Game");
				return res.status(200).send(rows[0]);
			});
		}
		else{
			if(err.code == 'ER_DUP_ENTRY') {
				return res.status(400).send("Unable to add sponsor to game. Reason: Duplicate/Already a sponsor of the game.");
			}
			else if (err.code == 'ER_NO_REFERENCED_ROW_2'){
				return res.status(400).send("Unable to add sponsor to game. Reason: Sponsor being added or game being added to does not exist.");
			}
			else if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'){
				return res.status(400).send("Unable to add sponsor to game. Reason: Invalid values.");
			}
			else{
				return res.status(500).send("Unknown error.");
			}


		}
	})

}

exports.editSponsorDetails = (req, res) => {
	var query = 'CALL edit_sponsor_details(?,?,?)';
	let sponsorId = req.body.sponsor_id;
	connection.userType(req.session.user.type).query(query,
		[
			sponsorId,
			req.body.name,
			req.body.description
		],
		(err, rows) => {
		if(!err && rows.affectedRows != 0){
			connection.userType(req.session.user.type).query('CALL view_sponsor(?)', sponsorId, (err, rows) => {
				logs.createLog(currentUser.id, "Updated Sponsor");
				return res.status(200).send(rows[0]);
			})
		}
		else if (rows.affectedRows == 0){
			return res.status(400).send("Unable to edit sponsor. Reason: Sponsor being edited does not exist.")
		}
		else if(err){
			if (err.code == 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'){
				return res.status(400).send("Unable to edit sponsor. Reason: Invalid values.");
			}
			else{
				return res.status(500).send("Unknown error.");
			}
		}
	})
}

exports.viewSponsor = (req, res) => {
	let query = 'CALL view_sponsor(?,?)';
	connection.userType('G').query(query,
		[
			req.query.sponsorId
		],
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows[0]);
			}
			else{
				return res.status(500).send("Internal Server Error");
			}
		});
}

exports.searchSponsor = (req, res) => {
	let query = 'CALL search_sponsor(?)';
	connection.userType('G').query(query,
		[
			'%' + req.query.search + '%'
		],
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows[0]);
			}
			else{
				return res.status(500).send("Internal Server Error");
			}
		});
}

exports.viewAllSponsor = (req, res) => {
	let query = 'SELECT * FROM sponsor_institution';
	connection.userType('G').query(query, [], (err, rows) => {
		if(!err){
			return res.status(200).send(rows);
		}else{
			console.log(err)
			return res.status(500).send("Internal Server Error");
		}
	});
}

exports.viewSponsorInSport = (req, res) => {
	let query = 'CALL view_sponsor_in_sport(?)';
	connection.userType('G').query(query,
		[
			req.query.sportId
		],
		(err, rows) => {
			if(!err){

				return res.status(200).send(rows[0]);
			}
			else{
				return res.status(500).send("Internal Server Error");
			}
		});
}

exports.viewSponsorInGame = (req, res) => {
	let query = 'CALL view_all_sponsors_in_game(?)';
	connection.userType('G').query(query,
		[
			req.query.gameId
		],
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows[0]);
			}
			else{
				return res.status(500).send("Internal Server Error");
			}
		});
}

exports.viewSponsorNotInGame = (req, res) => {
	let query = 'CALL view_all_sponsors_not_in_game(?)';
	connection.userType('G').query(query,
		[
			req.query.gameId
		],
		(err, rows) => {
			if(!err){
				return res.status(200).send(rows[0]);
			}
			else{
				return res.status(500).send("Internal Server Error");
			}
		});
}

exports.deleteSponsorFromGame = (req, res) => {
	var query = 'CALL view_sponsor(?)';
	let sponsorId = req.body.sponsorId;
	let gameId = req.body.gameId;
	connection.userType(req.session.user.type).query(query,
		[
			sponsorId
		],
		(err, rows) => {
		let deleted = rows;
		if(!err) {
			connection.userType(req.session.user.type).query('CALL delete_sponsor_from_game(?,?)', [sponsorId,gameId], (err, rows) => {
				logs.createLog(req.session.user.id, "Removed Sponsor from Game");
				return res.status(200).send(deleted[0]);
			})
		}
		else
			return res.status(404).send("Unable to delete sponsor from game!");
	})
}


exports.deleteSponsor = (req, res) => {
	var query = 'CALL view_sponsor(?)';
	let sponsorId = req.body.sponsorId;
	connection.userType(req.session.user.type).query(query,
		[
			sponsorId
		],
		(err, rows) => {
		let deleted = rows;
		if(!err) {
			connection.userType(req.session.user.type).query('CALL delete_sponsor(?)', sponsorId, (err, rows) => {
				logs.createLog(req.session.user.id, "Deleted Sponsor");
				return res.status(200).send(deleted[0]);
			})
		}
		else
			return res.status(404).send("Unable to delete sponsoring institution!");
	})
}
