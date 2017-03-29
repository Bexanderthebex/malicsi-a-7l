const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchCompetitor = (req, res) => {
	query = 'SELECT * FROM competitor where first_name like ? or last_name like ? or nickname like ?';

	connection.query(query, ["%" + req.query.search + "%", "%" + req.query.search + "%", "%" + req.query.search + "%"], function(err, rows){
	    if(!err) {
	    	if(rows.length == 1) {
				res.status(200).send(rows[0]);
				return rows[0];
			} else {
				res.status(200).send(rows);
				return rows;
			}
		} else {
			res.status(500).send({'message' : 'Internal Server Error'});
		}
	});
}

exports.editCompetitor = (req,res) => {
	currentUser = req.session.user;
	query = 'UPDATE competitor SET first_name = ?, last_name = ?, birthday = ?, nickname = ?, sex = ? WHERE id = ?';

	connection.query(query, [req.body.first_name, req.body.last_name, req.body.birthday, req.body.nickname, req.body.sex, req.body.id], function(err, rows){
		if(!err) {
			query = 'SELECT * from competitor where id = ?';

			connection.query(query, [req.body.id], function(err, rows) {
				if(!err) {
					res.status(200).send(rows[0]);
					return rows[0];
				}
			});

		} else {
			return res.status(501).send({ 'message' : 'Not implemented'});
		}
	});
}