var db = require(__dirname + './../config/db-connection');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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
}
