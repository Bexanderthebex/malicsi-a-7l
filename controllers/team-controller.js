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
                return res.status(404).send({ 'message' : 'An error occured'});
            }
    });
}

exports.deleteTeam = function(req, res){
    query = "DELETE FROM team WHERE team_organization = ?";
    connection.query(query, [req.body.team_organization],
    function(err, rows){
            if(!err) {
                return res.status(200).send({ 'message' : 'Sucessfully deleted team'});
            } else {
                return res.status(404).send({ 'message' : 'An error occured'});
            }
    });
};

exports.teamMembershipRequest = function(req, res){
    currentUser = req.session.user;
    query = "INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(?,?,FALSE)";
    connection.query(query, [currentUser.id, req.body.team_id],
            function(err, rows){
            if(!err) {
                return res.status(200).send({ 'message' : 'Sucessfully sent request'});
            } else {
                return res.status(404).send({ 'message' : 'An error occured'});
            }
    });
}

exports.acceptMembershipRequest = function(req, res){
    currentUser = req.session.user;
    query = "UPDATE competitor_joins_team SET is_member = TRUE where id = ? AND team_id = ?";
    connection.query(query, [req.body.competitor_id ,currentUser.id],
        function(err, rows){
                if(!err) {
                    return res.status(200).send({ 'message' : 'Sucessfully accepted request'});
                } else {
                    return res.status(404).send({ 'message' : 'An error occured'});
                }
        });
}