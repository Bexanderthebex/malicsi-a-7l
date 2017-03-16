const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.updateGame = function(req, res){
	connection.query('UPDATE game SET ? WHERE id = ?', [req.body, req.body.gameId], function(err, rows){
		if(err) res.status(500).send('Error in query.');
		else {
			selectGrade(req.body.id, function(rowUpdate){
			if (err) res.status(500).send('Error in query');
			if (rowUpdate == null){
				res.status(552).send('Game ('+ req.body.id +') was not updated.');
			} else {
				res.status(200).send(rowUpdate);
			}
			});
		}
	});
}


