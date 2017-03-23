const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganizer = (req, res) => {
	query = 'SELECT * FROM organizer where name like ? or description like ?';

	connection.query(query, ["%" + req.query.search + "%", "%" + req.query.search + "%"], function (err, rows) {
		if(!err) {
			if(rows.length == 1) {
				res.status(200).send(rows[0]);
				return rows[0];
			} else {
				res.status(200).send(rows);
				return rows;
			}
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}

exports.editOrganizer = (req,res) => {
	currentUser = req.session.user;
	query = `UPDATE organizer SET name = ?, description = ? WHERE id = ?`;

	connection.query(query, [req.body.name, req.body.description, currentUser.id], function(err, rows){
		if(!err) {
			return res.status(200).send({ 'message' : 'Sucessfully updated info'});
		} else {
			return res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}

exports.createGame = (req,res,next){
	connection.query("INSERT INTO game(name,description,location,start_date,end_date,orgz_id) VALUES (?, ?, ?, ?, ?, ?)"
		, [	req.body.name,
			req.body.description,
			req.body.location,
			req.body.start_date,
			req.body.end_date,
			req.body.orgz_id],
			function(err,rows){
		if(err) return next(err);
		res.send(rows);
	});
};

exports.updateGame = (req,res,next){
	
	connection.query("UPDATE game SET name = ?,description = ?,location = ?,start_date = ?,end_date = ? WHERE game_id = ?"
		, [	req.body.name,
			req.body.description,
			req.body.location,
			req.body.start_date,
			req.body.end_date,
			req.body.game_id],
			function(err,rows){
		if(err) return next(err);
		res.send(rows);
	});
};

exports.editInfo = (req,res,next){
	
	connection.query("UPDATE organizer SET name = ?,description = ? WHERE id = ?"
		, [ req.body.name,
			req.body.description,
			req.body.id],
			function(err,rows){
		if(err) return next(err);
		res.send(rows);
	});
};

exports.findGames = (req,res,next){

	connection.query("SELECT * from game WHERE game.organizer_id = ?"
		, [req.query.id],
		function(err,rows){
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
		});
};

exports.findSport = (req,res,next){

	connection.query("SELECT * from sport WHERE sport.game_id = ?"
		, [req.query.game_id],
		function(err,rows){
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

exports.findTeam = (req,res,next){

	connection.query("SELECT * from team WHERE team.sport_id = ?"
		, [req.query.sport_id],
		function(err,rows){
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


exports.getRequest = (req,res){
	connection.query("SELECT * from team WHERE team_id = ?"
	, [req.query.team_id],
		function(err,rows){
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


exports.acceptRequest = (req,res){

	connection.query("UPDATE team SET pending_participation = TRUE WHERE team_id =?"
	, [req.query.team_id],
	function(err,rows){
		if(!err){
			res.status(200).send({'message' : 'Sucuessfully Updated Request'});
			connection.query("SELECT * from team WHERE team_id = ? "
			, [req.query.team_id],
			function(err,rows){
				if(!err){
					return rows[0];
				} 
			});
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
};