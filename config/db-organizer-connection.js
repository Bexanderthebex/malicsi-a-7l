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
        console.log("Organizer database connected!");
    } else {
    	console.log(err);
        console.log("Error in database connection!");
    }
});

setInterval(function () {
    connection.query('SELECT 1');
}, 5000);

connection.query('USE heroku_ce2b03d42f2b112');
module.exports = connection;

