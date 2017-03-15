const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchCompetitor = (req, res) => {
	const competitor = {
		search : req.body.search
	}

	function searchCompetitor() {
		const queryString = 'SELECT * FROM competitor where first_name like ? or last_name like ? or nickname like ?';

		const queryParameters = [
			"%" + competitor.search + "%",
			"%" + competitor.search + "%",
			"%" + competitor.search + "%"
		];

		connection.query(queryString, queryParameters, send_response);
	}

	function send_response(err, rows, args) {
		if(err) {
	      return res.status(500).send(err);
	    } else {
	      return res.send(rows);
	    }
	}

	searchCompetitor();
}

exports.editCompetitor = (req,res) => {
	currentUser = req.session.user;
	query = `UPDATE competitor SET first_name = ?, last_name = ?, birthday = ?, nickname = ?, sex = ? WHERE id = ?`;

	connection.query(query, [req.body.first_name, req.body.last_name, req.body.birthday, req.body.nickname, req.body.sex, currentUser.id], function(err, rows){
		if(!err) {
			return res.status(200).send({ 'message' : 'Sucessfully updated info'});
		} else {
			return res.status(404).send({ 'message' : 'An error occured'});
		}
	});
	
}