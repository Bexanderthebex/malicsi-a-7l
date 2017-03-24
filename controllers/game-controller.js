const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.createGame = function (req, res) {
	let newGame = {
		organizer_id:req.body.orgId,
		name : req.body.gameName,
		start_date : req.body.startDate,
		end_date : req.body.endDate,
		location  : req.body.location,
		description  : req.body.description,
		overall_winner : req.body.gameWinner
	}

	connection.query('INSERT INTO game(organizer_id, name, start_date, end_date, location, description, overall_winner) VALUES(?,?,?,?,?,?,?)', newGame, function(err, row){
		if(err) res.status(500).send('Error in query');
		selectGrade(row.insertId, function(newRow){
			if (err) res.send('Error in query');
			if(newRow == null){
				res.send(552, {message: 'game ('+row.insertId+') was not created'});
			}else{
				res.status(200).send(newRow);
			}
		})
	});
}

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

	});
}

exports.deleteGame = (req, res) => {
	connection.query('DELETE FROM game WHERE game_id = ?', [req.body.gameId], function(err, rows) {
		if(!err){
			if (rows.length == 0) {
				res.status(501).send('Not Implemented');
			} else {
				 res.status(200).send('Sucessful');
			}
		}else{
			res.status(500).send("Internal Server Error");
		}
	});
}
