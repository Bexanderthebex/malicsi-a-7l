const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganization = (req, res) => {
	query = 'select * from organization where name like ?';

	connection.userType('A').query(query, 
		[
			"%" + req.query.search + "%"
		], (err, rows) => {
			if(!err) {
				return res.status(200).send(rows);
			} else {
				return res.status(500).send({'message' : 'Internal Server Error'});
			}
		}
	);
}