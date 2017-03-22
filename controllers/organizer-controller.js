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

exports.editOrganizer = (req,res) => {
	currentUser = req.session.user;

	connection.query('UPDATE organizer SET name = ?, description = ? WHERE id = ?', [req.body.name, req.body.description, currentUser.id], function(err, rows){
		if(!err) {
			connection.query('SELECT * from organizer where id = ?', [currentUser.id], function(err, rows) {
				if(!err) {
					return res.status(200).send(rows[0]);
				}
			});

		} else {
			return res.status(400).send({ 'message' : 'Not implemented'});
		}
	});
}