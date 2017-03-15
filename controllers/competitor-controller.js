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