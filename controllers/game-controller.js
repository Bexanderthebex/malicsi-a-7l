const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.viewGameDetails = (req, res) => {
	let query = 'select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game_id = ?';
	connection.query(query, 
		[req.params.game_id], 
		(err, results, fields)	=> {
		if (err) {
			console.log(err.code);
			res.status(500).send("An error occurred.");
			throw err;
		}
		else if (results.length==0){
			res.status(404).send("Game not found.");
		}
		else
			res.status(200).send(results);

	})
}

