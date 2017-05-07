'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : process.env.DBHOST,
  user : 'administrator',
  password : 'password1',
  db : 'malicsi',
  dateStrings: true
});

connection.connect((err) => {
    if (!err) {
        console.log("Admin Database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE malicsi');
module.exports = connection;

