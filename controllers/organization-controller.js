'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');

exports.searchOrganization = (req, res) => {
	let query = 'select * from organization where name like ?';

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

exports.editOrganization = (req, res) => {
	let query = 'update organization set name = ? where organization_id = ?';

	connection.userType('A').query(query,
		[
			req.body.name, req.body.organization_id
		], (err, rows) => {
			if(!err){
				if(rows.affectedRows === 0) return res.status(404).send({ 'message': 'Organization was not updated.' });
				else {
					logs.createLog(req.session.user.id, "Edited Organization");
					return res.status(200).send(rows);
				}
			}else return res.status(500).send({'message' : 'Internal Server Error'});
		}
	);
}

exports.addOrganization = (req, res) => {
	let query = 'insert into organization (name) values(?)';

	connection.userType('A').query(query,
        [
            req.body.name
        ], (err, rows) => {
            if(!err) {
            	logs.createLog(req.session.user.id, "Added an Organization");
                return res.status(200).send({ 'message' : 'Sucessfully created organization'});
            } else {
				if (err.code === 'ER_DUP_ENTRY') {
					return res.status(500).send({ 'message' : 'Organization already exists.'});
				} else if (err.code === 'ER_BAD_NULL_ERROR') {
					return res.status(500).send({ 'message' : 'Missing fields.'});
				} else {
					return res.status(500).send({ 'message' : 'Internal server error.'});
				}
            }
        }
    );
}

exports.addOrganizationToGame = (req, res) =>{
	connection.userType('A').query('CALL get_organization(?, ?)',
		[
			req.body.orgId,
			req.body.gameId
		],
		(err, rows) => {
			if (!err) {
				return res.status(200).send("Successfully Added");
			}else{
				return res.status(500).send("Internal Server Error");
			}
	});
}

exports.deleteOrganization = (req, res) => {
	let query = 'call delete_organization(?)';

	connection.userType(req.session.user.type).query(query, [
		req.body.orgId
	],
	(err, rows) => {
		if (!err) {
			logs.createLog(req.session.user.id, "Deleted an Organization");
			return res.status(200).send('Successfully deleted');
		} else {
			return res.status(500).send('Internal Server Error');
		}
	});
}
