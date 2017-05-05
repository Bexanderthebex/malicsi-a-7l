'use strict'
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : 'us-cdbr-iron-east-03.cleardb.net',
  user : 'b8683e6c21f02f',
  password : 'b6051e50',
  db : 'heroku_ce2b03d42f2b112',
  dateStrings: true
});

connection.connect((err) => {
    if (!err) {
        console.log("Guest database connected!");
    } else {
        console.log("Error in database connection!");
    }
});

connection.query('USE heroku_ce2b03d42f2b112');
module.exports = connection;

