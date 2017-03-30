const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.addMatch = (req, res) => {
	connection.userType('A').query('CALL add_match(?, ?, ?, ?)', 
		[req.body.timeStart,
		 req.body.timeEnd,
		 req.body.date,
		 req.body.sportID], 
		(err, rows) => {
		if (!err){
			connection.userType('A').query('CALL view_match(?)', rows.insertId, (err, rows) => {
				res.status(200).send(rows[0]);
			})
		}else{
			res.status(500).send("Internal Server Error");
		}
	})
}