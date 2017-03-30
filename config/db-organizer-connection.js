'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'organizer',
  password : 'password3',
  db : 'malicsi'
});

connection.connect((err) => {
    if (!err) {
        console.log("Organizer database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE malicsi');
module.exports = connection;

