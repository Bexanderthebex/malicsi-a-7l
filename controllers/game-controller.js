const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.deleteGame = function(req, res) {
	connection.query('DELETE FROM grade WHERE id = ?', [req.body.id], function(err, row) {
		if(err) res.status(500).send('Error in query');
		if (row.affectedRows === 0) {
			res.status(554).send('Game ('+req.body.id+') was not removed.');
		} else {
			res.status(200).send(row);
		}
	});
}
