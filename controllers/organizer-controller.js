'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const logs = require('./../controllers/log-controller.js');

exports.searchOrganizer = (req, res) => {
	let query = 'CALL search_organizer(?)';

	connection.userType('G').query(query,
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
			if(!err) {
				if(rows[0].length == 1) {
					return res.status(200).send(rows[0]);
				} else {
					return res.status(200).send(rows[0]);

				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.getOrganizer = (req, res) => {
	let query = 'CALL get_organizer(?)';

	connection.userType('G').query(query,
		[
			req.query.search
		], (err, rows) => {
			if(!err) {
				return res.status(200).send(rows[0][0]);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}

exports.editOrganizer = (req,res) => {
	let query = "CALL edit_organizer(?,?,?)";
	let query1 = "CALL get_organizer(?)";
	connection.userType(req.session.user.type).query(query,
		[
			req.body.name,
			req.body.description,
			req.body.id
		], (err, rows) => {
			if(!err) {
				connection.userType(req.session.user.type).query(query1,
					[
						req.body.id
					], (err, rows) => {
						if(!err) {
							logs.createLog(req.session.user.id,"Edited Organizer Information");
							return res.status(200).send(rows[0]);

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
	let query = "CALL find_game(?)";
	
	connection.userType('G').query(query,
		[
			req.query.id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					return res.status(200).send(rows[0][0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
			 	return res.status(500).send({'message' : 'Internal Server Error'})
			}
		}
	);
};

exports.findSport = (req,res,next) =>{
	let query = "CALL find_sport(?)";

	connection.userType('G').query(query,
		[
		 	req.query.game_id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					return res.status(200).send(rows[0][0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
};

exports.findTeam = (req,res,next) =>{
	let query = "CALL find_team(?)";

	connection.userType('G').query(query,
		[
			req.query.sport_id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					return res.status(200).send(rows[0][0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
};


exports.getRequest = (req, res, next) => {
	let query = "CALL get_request(?)";

	connection.userType(req.session.user.type).query(query,
		[
			req.query.team_id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					return res.status(200).send(rows[0][0]);
				} else {
					return res.status(200).send(rows[0]);
				}
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
};


exports.processRequest = (req, res, next) => {
	let query = "CALL process_request(?)";
	let query1 = "CALL get_team(?)";

	connection.userType(req.session.user.type).query(query,
		[
			req.body.team_id
		], (err,rows) => {
			if(!err){
				connection.userType(req.session.user.type).query(query1,
					[
				 		req.body.team_id
					], (err,rows) => {
						if(!err){
							logs.createLog(req.session.user.id,"Accepted Team "+req.body.team_id+" to a Game");
							if(rows.length == 1){
								return res.status(200).send(rows[0][0]);
							} else {
								return res.status(200).send(rows[0]);
							}
						} else {
							return res.status(500).send({'message' : 'Internal Server Error'});
						}
					}
				);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
};

exports.deleteTeam = (req, res, next) => {
	let query1 = "CALL delete_team(?)"
	let query = "CALL get_team(?)"

	connection.userType(req.session.user.type).query(query,
		[
			req.body.team_id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					res.status(200).send(rows[0][0]);
				} else {
					res.status(200).send(rows[0]);
				}
				connection.userType('G').query(query1,
					[
				 		req.body.team_id
					], (err,rows) => {
						if(!err){
							logs.createLog(req.session.user.id,"Deleted Team "+req.body.team_id);
							return res.status(200).send({'message' : 'Sucessfully deleted team'});

						} else {
							return res.status(500).send({'message' : 'Internal Server Error'});
						}
					}
				);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
};

exports.getPendingParticipation = (req, res, next) => {
	let query = "CALL get_pending_participation(?)";

	connection.userType(req.session.user.type).query(query,
		[
			req.query.organizer_id
		], (err,rows) => {
		if(!err){
			if(rows.length == 1){
				return res.status(200).send(rows[0][0]);
			} else {
				return res.status(200).send(rows[0]);
			}
		} else {
			return res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
};
