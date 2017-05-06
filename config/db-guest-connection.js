'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com',
  user : 'guest',
  password : 'password4',
  db : 'malicsi',
  dateStrings: true
});

connection.connect((err) => {
    if (!err) {
        console.log("Guest database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE malicsi');
module.exports = connection;

