const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');


exports.createTeam = (req, res) => {
    currentUser = req.session.user;
    query = "CALL createTeam(?, ?, ?, ?)";
    connection.query(query, [req.body.id, req.body.sport_id, req.body.organization_id, req.body.team_sport], function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully created team'});
                return(connection.query("SELECT * FROM team WHERE id = ?", [req.body.id]));
            } else {
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
    });
}

exports.deleteTeam = (req, res) => {
    query = "CALL deleteTeam(?)";
   
    connection.query(query, [req.body.team_id],
    function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully deleted team'});
                return 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });
}

exports.teamMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL teamMembershipRequest(?,?)";
    connection.query(query, [req.body.id, req.body.team_id],
            function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully sent request'});
                return (connection.query("SELECT * FROM competitor_joins_team WHERE id = ? AND team_id = ?", [currentUser.id, req.body.team_id])[0]);
            } else {
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
    });
}

exports.acceptMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL acceptMembershipRequest(?,?)";
    connection.query(query, [req.body.id ,req.body.competitor_id],
        function(err, rows){
                if(!err) {
                    res.status(200).send({ 'message' : 'Sucessfully accepted request'});
                    return (connection.query("SELECT * FROM competitor_joins_team WHERE id = ? AND team_id = ?", [req.body.competitor_id, currentUser.id])[0]);
                } else {
                    res.status(500).send({ 'message' : 'An error occured'});
                    return 500;
                }
        });
}

exports.getTeamStatistics = (req, res) => {
    query = "CALL rankings(?,?)"
    console.log(query);
    connection.userType('A').query(query,[req.query.team_id,req.query.id],
        function(err, rows){
            if(!err) {
                console.log(rows);
                res.status(200).send(rows);
                return(rows);
            } else {
                console.log(err);
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
        })
}   