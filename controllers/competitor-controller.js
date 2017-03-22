const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchCompetitor = (req, res) => {
	query = 'SELECT * FROM competitor where first_name like ? or last_name like ? or nickname like ?';

	connection.query(query, ["%" + req.body.search + "%", "%" + req.body.search + "%", "%" + req.body.search + "%"], function(err, rows){
	    if(!err) {
			res.status(200).send(rows);
		} else {
			res.status(404).send({ 'message' : 'An error occured'});
		}
	});
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