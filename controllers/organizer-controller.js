const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganizer = (req, res) => {
	const organizer = {
		search : req.body.search
	}

	function searchOrganizer() {
		const queryString = 'SELECT * FROM organizer where name like ? or description like ?';

		const queryParameters = [
			"%" + organizer.search + "%",
			"%" + organizer.search + "%"
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

	searchOrganizer();
}


