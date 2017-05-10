'use strict'
const mysql = require('mysql');
const DBHOST = process.env.DBHOST === undefined
    ? 'localhost' : process.env.DBHOST;

const connection = mysql.createConnection({
  host : DBHOST,
  user : 'organizer',
  password : 'password3',
  db : 'malicsi',
  dateStrings: true
});

connection.connect((err) => {
    if (!err) {
        console.log("Organizer database connected!");
    } else {
    	console.log(err);
        console.log("Error in database connection!");
    }
});

connection.query('USE malicsi');
module.exports = connection;

