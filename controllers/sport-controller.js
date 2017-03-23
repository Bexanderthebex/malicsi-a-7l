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
		if (err){ 
			res.status(500).send(message);

		}else{
			connection.query('SELECT * FROM sport where sport_id = ?', rows.insertId, (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}
	})


}

exports.viewSportDetails = (req, res) => {
	connection.query('SELECT * FROM sport where sport_id = ?', req.params.sportID, (err, rows, fields) => {
		if (err){
			res.status(500).send(err);
		}else{
			res.status(200).send(rows[0]);
		}
	})
}