const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganizer = (req, res) => {
	query = 'CALL search_organizer(?)';

	connection.userType('A').query(query, 
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
			if(!err) {
				if(rows[0].length == 1) {
					res.status(200).send(rows[0][0]);
					return rows[0][0];
				} else {
					res.status(200).send(rows[0]);
					return rows;
				}
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getOrganizer = (req, res) => {
	query = 'CALL get_organizer(?)';

	connection.userType('A').query(query, 
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
			if(!err) {
				res.status(200).send(rows[0]);
				return rows;
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.editOrganizer = (req,res) => {
	currentUser = req.session.user;
	query = "CALL edit_organizer(?,?,?)";
	query1 = "CALL get_organizer(?)";

	connection.userType('A').query(query, 
		[
			req.body.name, 
			req.body.description, 
			req.body.id
		], (err, rows) => {
			if(!err) {
				connection.query(query1, 
					[
						req.body.id
					], (err, rows) => {
						if(!err) {
							res.status(200).send(rows[0]);
							return rows[0];
						}
					}
				);
			} else {
				return res.status(501).send({ 'message' : 'Not implemented'});
			}
		}
	);
}

exports.findGames = (req,res,next) => {
	query = "CALL find_games(?)"
	connection.userType('A').query(query, 
		[
			req.query.id
		], (err,rows) => {
			if(!err){
				if(row.length == 1){
					res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows[0]);
					return rows[0];
				} else {
					res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows);
					return rows;
				}
			} else {
			 	res.status(500).send({'message' : 'Internal Server Error'})
			}
		}
	);
};		 
		 
exports.findSport = (req,res,next) =>{
	query = "CALL find_sport(?)"
	connection.userType('A').query(query, 
		[
		 	req.query.game_id
		], (err,rows) => {
			if(!err){
				if(row.length == 1){
					res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows[0]);
					return rows[0];
				} else {
					res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows);
					return rows;
				}
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
};

exports.findTeam = (req,res,next) =>{
	query = "CALL find_team(?)"
	connection.userType('A').query(query, 
		[
			req.query.sport_id
		], (err,rows) => {
		if(!err){
			if(row.length == 1){
				res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows[0]);
				return rows[0];
			} else {
				res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows);
				return rows;
			}
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
		});
};


exports.getRequest = (req, res, next) => {
	query = "CALL get_request(?)"
	connection.userType('A').query(query, 
		[
			req.query.team_id
		], (err,rows) => {
			if(!err){
				if(row.length == 1){
					res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows[0]);
					return(rows[0][0]);
				} else {
					res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows);
					return rows;
				}
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
};


exports.acceptRequest = (req, res, next) => {
	query = "CALL accept_request(?)"
	query1 = "CALL get_team(?)"

	connection.userType('A').query(query, 
		[
			req.query.team_id
		], (err,rows) => {
			if(!err){
				res.status(200).send({'message' : 'Successfully Updated Request'});
				connection.query(query1,
					[
				 		req.query.team_id
					], (err,rows) => {
						if(!err){
							return rows[0];
						} 
					}
				);
			} else {
				res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
<<<<<<< HEAD
	});
};

exports.getPendingParticipation = (req, res, next) => {
	query = "CALL get_pending_participation(?)"
	connection.userType('A').query(query, 
		[
			req.query.organizer_id
		], function(err,rows){
		if(!err){
			if(row.length == 1){
				res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows[0]);
				return(rows[0][0]);
			} else {
				res.status(200).send({'message' : 'Sucessfully Retrieved Info'},rows);
				return rows;
			}
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
};