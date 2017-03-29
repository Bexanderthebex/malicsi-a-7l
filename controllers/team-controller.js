const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');


exports.createTeam = function(req, res){
    currentUser = req.session.user;
    query = "INSERT INTO team(id, sport_id, team_organization, team_sport, pending_participation) VALUES (?, ?, ?, ?, FALSE)";
    connection.query(query, [currentUser.id, req.body.sport_id, req.body.organization_id, req.body.team_sport], function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully created team'});
                return(connection.query("SELECT * FROM team WHERE id = ?", [currentUser.id]));
            } else {
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
    });
}
//to be edited for cascading delete
exports.deleteTeam = function(req, res){
    query = "DELETE FROM team WHERE team_id = ?";
    query1 = "DELETE FROM team_in_match WHERE team_id = ?";
    query2 = "DELETE FROM team_opponent WHERE team_id = ?";
    query3 = "DELETE FROM team_announcement WHERE team_id = ?";
    query4 = "DELETE FROM competitor_joins_team WHERE team_id = ?";
    
    connection.query(query1, [req.body.team_id],
    function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully deleted team'});
                return 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });

    connection.query(query2, [req.body.team_id],
    function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully deleted team'});
                return 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });

    connection.query(query3, [req.body.team_id],
    function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully deleted team'});
                return 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });

    connection.query(query4, [req.body.team_id],
    function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully deleted team'});
                return 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });

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

exports.teamMembershipRequest = function(req, res){
    currentUser = req.session.user;
    query = "INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(?,?,FALSE)";
    connection.query(query, [currentUser.id, req.body.team_id],
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

exports.acceptMembershipRequest = function(req, res){
    currentUser = req.session.user;
    query = "UPDATE competitor_joins_team SET is_member = TRUE where id = ? AND team_id = ?";
    connection.query(query, [currentUser.id ,req.body.competitor_id],
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

exports.getTeamStatistics = function(req, res){
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