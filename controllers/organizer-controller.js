const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganizer = (req, res) => {
	query = 'SELECT * FROM organizer where name like ? or description like ?';

	connection.query(query, ["%" + req.body.search + "%", "%" + req.body.search + "%"], function (err, rows) {
		if(!err) {
			res.status(200).send(rows);
		} else {
			res.status(404).send({ 'message' : 'An error occured'});
		}
	});
}