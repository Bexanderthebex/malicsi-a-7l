'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'malicsi.cfkmmn5aiujh.ap-southeast-1.rds.amazonaws.com',
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

