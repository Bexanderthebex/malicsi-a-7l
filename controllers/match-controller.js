const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addMatch = (req, res) => {
	const newMatch = {
		time_start: req.body.timeStart,
		time_end: req.body.timeEnd,
		match_date: req.body.matchDate,
		sport_id: req.body.sportID
	}

	connection.query('INSERT INTO sport_match SET ?', newMatch, (err, rows, fields) => {
		if (err) throw err;
		res.send(results);
	})
}