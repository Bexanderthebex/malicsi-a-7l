'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : process.env.DBHOST,
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

