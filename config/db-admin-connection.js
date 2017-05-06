'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com',
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

