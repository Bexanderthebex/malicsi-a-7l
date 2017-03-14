const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

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
		res.send(results);	
	})
}