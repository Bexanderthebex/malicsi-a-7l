'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'admin',
  db : 'malicsi'
});

connection.connect((err) => {
    if (!err) {
        console.log("Database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE malicsi');
module.exports = connection;

