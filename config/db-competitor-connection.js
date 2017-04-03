'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'competitor',
  password : 'password3',
  db : 'malicsi'
});

connection.connect((err) => {
    if (!err) {
        console.log("Competitor database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE malicsi');
module.exports = connection;

