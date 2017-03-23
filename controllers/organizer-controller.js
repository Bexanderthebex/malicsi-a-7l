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

	connection.query('UPDATE organizer SET name = ?, description = ? WHERE id = ?', [req.body.name, req.body.description, currentUser.id], function(err, rows){
		if(!err) {
			connection.query('SELECT * from organizer where id = ?', [currentUser.id], function(err, rows) {
				if(!err) {
					return res.status(200).send(rows[0]);
				}
			});

		} else {
			return res.status(400).send({ 'message' : 'Not implemented'});
		}
	});
}

exports.findGames = (req,res,next) =>{

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

exports.findSport = (req,res,next) =>{

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

exports.findTeam = (req,res,next) =>{

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


exports.getRequest = (req, res, next) => {
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


exports.acceptRequest = (req, res, next) => {

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