const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');


exports.createTeam = (req, res) => {
    currentUser = req.session.user;
    query = "CALL createTeam(?, ?, ?, ?)";
    query1 = "CALL get_team(?)"

    connection.userType('A').query(query,
        [
            req.body.id, 
            req.body.sport_id, 
            req.body.organization_id, 
            req.body.team_sport
        ], (err, rows) => {
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully created team'});
                return(connection.query(query1, [req.body.id]));
            } else {
                res.status(500).send({ 'message' : 'An error occured'});
                return 500;
            }
        }
    );
}

exports.deleteTeam = (req, res) => {
    query = "CALL deleteTeam(?)";
   
    connection.userType('A').query(query, 
        [
            req.body.team_id
        ], (err, rows) => {
            if(!err) {
                res.status(200).send({ 'message' : 'Sucessfully deleted team'});
                return 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.teamMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL teamMembershipRequest(?,?)";
    
    connection.userType('A').query(query, [req.body.id, req.body.team_id],
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
    connection.userType('A').query(query, [req.body.id ,req.body.competitor_id],
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
    connection.userType('A').query(query,
        [
            req.query.team_id,
            req.query.id
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
    query = "CALL count_teams_in_sport(?,?)"
    console.log(query);
    connection.userType('A').query(query,
        [
            req.query.sport_id,
            req.query.id
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