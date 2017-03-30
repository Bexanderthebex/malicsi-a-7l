'use strict'

const connection = require('mysql').createConnection({
  host : 'localhost',
  user : 'root',
  password : 'root',
  db : 'malicsi'
});

const connection1 = require('./../config/db-admin-connection.js');
const connection2 = require('./../config/db-competitor-connection.js');
const connection3 = require('./../config/db-organizer-connection.js');
const connection4 = require('./../config/db-guest-connection.js');

connection.query('USE malicsi');
module.exports = connection;

exports.userType = (type) => {
	switch (type){
		case 'A':
			return connection1;
		case 'C':
			return connection2;
		case 'O':
			return connection3;
		case 'G':
			return connection4;
	}
}
