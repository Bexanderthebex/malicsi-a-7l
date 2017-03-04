'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'usern',
  password : 'password',
  db : 'databasename'
});

connection.connect((err) => {
    if (!err) {
        console.log("Database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE databasename');
module.exports = connection;