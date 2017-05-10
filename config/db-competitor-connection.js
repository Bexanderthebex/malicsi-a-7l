'use strict'
const mysql = require('mysql');
const DBHOST = process.env.DBHOST === undefined
    ? 'localhost' : process.env.DBHOST;

const connection = mysql.createConnection({
  host : DBHOST,
  user : 'competitor',
  password : 'password2',
  db : 'malicsi',
  dateStrings: true
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

