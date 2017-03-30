const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addMatch = (req, res) => {
	const newMatch = {
		time_start: req.body.timeStart,
		time_end: req.body.timeEnd,
		match_date: req.body.date,
		sport_id: req.body.sportID
	}

	connection.query('INSERT INTO sport_match SET ?', newMatch, (err, rows, fields) => {
		if (err){
			connection.query('SELECT * FROM sport_match where match_id = ?', rows.insertId, (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}



exports.viewMatchDetails = (req, res) => {
	let query = 'call view_match_details(?);';

	connection.userType('A').query(query, 
		[req.params.matchId], 
		(err, results, fields)	=> {

		if (!err && results[0].length!=0) {
			res.status(200).send(results);
		}
		else if (results[0].length==0){
			res.status(404).send("Match not found.");
		}		
		else{
			console.log(err.code);
			res.status(500).send("An error occurred.");
			throw err;
		}
		
	});


}