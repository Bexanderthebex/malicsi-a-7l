var connection = require(__dirname + './../config/db-connection');
const mysql = require('mysql');
const bodyParser = require('body-parser');

<<<<<<< HEAD
exports.editSport = function(req, res, next){
	connection.query("UPDATE sport SET time_start = ?, time_end = ?, date = ?, scoring_system = ? WHERE sport_id = ?"
			, [req.body.time_start,
			   req.body.time_end,
			   req.body.date,
			   req.body.scoring_system,
			   req.body.sport_id],
			   function(err, rows){
			   if(!err)
			        res.status(200).send(rows); 
			   else
			        res.status(404).send("edit unsuccessful. error occured");
		});
=======
exports.createSport = (req, res) => {
	const newSport = {
		time_start: req.body.timeStart,
		time_end: req.body.timeEnd,
		date: req.body.date,
		scoring_system: req.body.scoringSystem,
		game_id: req.body.gameID
	}

	connection.query('INSERT INTO sport SET ?', newSport, (err, rows, fields) => {
		if (err) throw err;
		res.send(rows);	
	})
}

exports.viewSportDetails = (req, res) => {
	connection.query('SELECT * FROM sport where sport_id = ?', req.params.sportID, (err, rows, fields) => {
		if (err) throw err;
		res.send(rows);
	})
}

exports.deleteSport = function(req, res, next){
	db.query("DELETE FROM sport WHERE sport_id = ?"
		,[req.body.sport_id],
		function(err,rows){
		if(err) return next(err);
	});
>>>>>>> c73899646b9e84d3b599567fab4ea46aa9cf0b18
}

exports.addWinnerSport = function(req, res, next){
	connection.query("UPDATE sport SET winner = ? WHERE sport_id = ?"
			,[req.body.winner,
			  req.body.sport_id],
			function(err, rows){
			if(!err) 
				res.status(200).send(rows);
			else if(rows.length = undefined)
				res.status(204).send(req.body.sport_id + " already updated");
			else
				res.status(404).send("update unsuccessful. error occured");

			
	});
}

<<<<<<< HEAD
exports.deleteSport = function(req, res, next){
	connection.query("DELETE FROM sport WHERE sport_id = ?"
		,[req.body.sport_id],
		function(err,rows){
		if(!err) {
			res.status(200).send("successfully deleted " + req.body.sport_id);
		}
		else if(rows.length == undefined ){ 
			res.status(204).send(req.body.sport_id + " not found!");
		}
		else{
			res.status(404).send("delete unsuccessful. error occured");
		}
	});
}
=======
>>>>>>> c73899646b9e84d3b599567fab4ea46aa9cf0b18
