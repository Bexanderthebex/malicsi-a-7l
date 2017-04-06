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
					return res.status(200).send(rows[0][0]);
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
	query = 'CALL get_organizer(?)';

	connection.userType('A').query(query, 
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
				connection.userType('A').query(query1, 
					[
						req.body.id
					], (err, rows) => {
						if(!err) {
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
	query = "CALL find_game(?)"
	connection.userType('A').query(query, 
		[
			req.query.id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					return res.status(200).send({'message' : 'Sucessfully Retrieved Info' , 'data': rows[0][0]});
				} else {
					return res.status(200).send({'message' : 'Sucessfully Retrieved Info', 'data': rows[0]});
				}
			} else {
			 	return res.status(500).send({'message' : 'Internal Server Error'})
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
	query = "CALL find_team(?)"
	connection.userType('A').query(query, 
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
	query = "CALL get_request(?)"
	connection.userType('A').query(query, 
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
	query = "CALL process_request(?)"
	query1 = "CALL get_team(?)"

	connection.userType('A').query(query, 
		[
			req.body.team_id
		], (err,rows) => {
			if(!err){
				console.log(req.body);
				connection.userType('A').query(query1,
					[
				 		req.body.team_id
					], (err,rows) => {
						if(!err){
							console.log(req.body);
							if(rows.length == 1){
								return res.status(200).send(rows[0][0]);
							} else {
								return res.status(200).send(rows[0]);
							}
						} else {
							console.log(err);
							return res.status(500).send({'message' : 'Internal Server Error'});
						}
					}
				);
			} else {
				console.log(err);
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
};

exports.deleteTeam = (req, res, next) => {
	query1 = "CALL deleteTeam(?)"
	query = "CALL get_team(?)"

	connection.userType('A').query(query, 
		[
			req.body.team_id
		], (err,rows) => {
			if(!err){
				if(rows.length == 1){
					res.status(200).send(rows[0][0]);
				} else {
					res.status(200).send(rows[0]);
				}
				connection.userType('A').query(query1,
					[
				 		req.body.team_id
					], (err,rows) => {
						if(!err){
							return 200;
							
						} else {
							console.log(err);
							return res.status(500).send({'message' : 'Internal Server Error'});
						}
					}
				);
			} else {
				console.log(err);
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
	});
};

exports.getPendingParticipation = (req, res, next) => {
	query = "CALL get_pending_participation(?)"
	connection.userType('A').query(query, 
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
