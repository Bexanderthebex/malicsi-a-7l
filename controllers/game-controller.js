const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.viewGameDetails = (req, res) => {
	connection.query('select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game_id = ?', [req.params.game_id], function(err, results, fields){
		if (err) throw err;
		res.send(results);

	})
}

