const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');


exports.createTeam = (req, res) => {
    currentUser = req.session.user;
    query = "CALL create_team(?, ?, ?, ?, ?)";
    query1 = "CALL get_team(?)"

    connection.userType('A').query(query,
        [
            req.body.team_name,
            req.body.id, 
            req.body.sport_id, 
            req.body.team_organization, 
            req.body.max_members
        ], (err, rows) => {
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully created team'});
            } else {
                res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.deleteTeam = (req, res) => {
    query = "CALL delete_team(?)";
   
    connection.userType('A').query(query, 
        [
            req.body.team_id
        ], (err, rows) => {
            if(!err) {
                return res.status(200).send({ 'message' : 'Sucessfully deleted team'}); 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.teamMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL team_membership_request(?,?)";
    query1 = "SELECT * FROM competitor_joins_team WHERE id = ? AND team_id = ?";
    connection.userType('A').query(query, [req.body.id, req.body.team_id],
            function(err, rows){
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully sent request'});
            } else {
                res.status(500).send({ 'message' : 'An error occured'});
            }
    });
}

exports.acceptMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL accept_membership_request(?,?)";
    connection.userType('A').query(query, [req.body.id ,req.body.team_id],
        function(err, rows){
                if(!err) {
                    res.status(200).send({ 'message' : 'Sucessfully accepted request'});
                } else {
                    console.log(err);
                    res.status(500).send({ 'message' : 'An error occured'});
                }
        });
}

exports.getTeamStatistics = (req, res) => {
    query = "CALL rankings(?)"
    
    connection.userType('A').query(query,
        [
            req.query.team_id
        ], function(err, rows){
            if(!err) {
                if (rows[0].length == 1){
                    console.log(rows[0][0]);
                    res.status(200).send(rows[0][0]);
                    return(rows[0][0]);
                }
                else{
                    console.log(rows[0]);
                    res.status(200).send(rows[0]);
                    return(rows[0][0]);
                }
            } else {
                console.log(err);
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
        })
}  

exports.countTeamInSports = (req, res) => {
    query = "CALL count_teams_in_sport(?)"
    
    connection.userType('A').query(query,
        [
            req.query.sport_id
        ], function(err, rows){
            if(!err) {
                if (rows[0].length == 1){
                    console.log(rows[0][0]);
                    res.status(200).send(rows[0][0]);
                    return(rows[0][0]);
                }
                else{
                    console.log(rows[0]);
                    res.status(200).send(rows[0]);
                    return(rows[0][0]);
                }
            } else {
                console.log(err);
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
        })
}    




exports.getTeamMembers = (req, res) => {
    query = "CALL get_members(?)"
    
    connection.userType('A').query(query,
        [
            req.query.team_id
        ], function(err, rows){
            if(!err) {
                if (rows[0].length == 1){
                    console.log(rows[0][0]);
                    res.status(200).send(rows[0][0]);
                    return(rows[0][0]);
                }
                else{
                    console.log(rows[0]);
                    res.status(200).send(rows[0]);
                    return(rows[0][0]);
                }
            } else {
                console.log(err);
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
        })
}    