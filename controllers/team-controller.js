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
                return res.status(200).send({ 'message' : 'Sucessfully created team'});
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
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
    
    connection.userType('A').query(query, 
            [
                req.body.id,
                req.body.team_id
            ], (err, rows) => {
                if(!err) {
                    return res.status(200).send({ 'message' : 'Sucessfully sent request'});
                } else {
                    return res.status(500).send({ 'message' : 'An error occured'});
                }
        }
    );
}

exports.deleteMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL delete_membership_request(?,?)";
    
    connection.userType('A').query(query, 
        [
            req.body.id,
            req.body.team_id
        ], (err, rows) => {
                if(!err) {
                    return res.status(200).send({ 'message' : 'Sucessfully deleted request'});
                } else {
                    return res.status(500).send({ 'message' : 'An error occured'});
                }
        }
     );
}

exports.acceptMembershipRequest = (req, res) => {
    currentUser = req.session.user;
    query = "CALL accept_membership_request(?,?)";
    
    connection.userType('A').query(query, 
        [
            req.body.id,
            req.body.team_id
        ], (err, rows) => {
                if(!err) {
                    return res.status(200).send({ 'message' : 'Sucessfully accepted request'});
                } else {
                    return res.status(500).send({ 'message' : 'An error occured'});
                }
        }
     );
}

exports.getTeamStatistics = (req, res) => {
    query = "CALL rankings(?)";
    
    connection.userType('A').query(query,
        [
            req.query.team_id
        ], (err, rows) => {
            if(!err) {
                if (rows[0].length == 1){
                    return res.status(200).send(rows[0][0]);
                }
                else{
                    return res.status(200).send(rows[0]);
                }
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        })
}  

exports.getOrganizationRankings = (req, res) => {
    query = "CALL organization_rankings(?)";
    
    connection.userType('A').query(query,
        [
            req.query.org_id
        ], (err, rows) => {
            if(!err) {
                if (rows[0].length == 1){
                    return res.status(200).send(rows[0][0]);
                }
                else{
                    return res.status(200).send(rows[0]);
                }
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        })
}  

exports.countTeamInSports = (req, res) => {
    query = "CALL count_teams_in_sport(?)";
    
    connection.userType('A').query(query,
        [
            req.query.sport_id
        ], (err, rows) => {
            if(!err) {
                if (rows[0].length == 1){
                    return res.status(200).send(rows[0][0]);
                }
                else{
                    return res.status(200).send(rows[0]);
                }
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        })
}    

exports.getTeamMembers = (req, res) => {
    query = "CALL get_members(?)";
    
    connection.userType('A').query(query,
        [
            req.query.team_id
        ], (err, rows) => {
            if(!err) {
                return res.status(200).send(rows[0]);
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        });
}

exports.getTeam = (req, res) => {
    query = "CALL get_team(?)";

    connection.userType('A').query(query,
    [
        req.query.team_id
    ], (err, rows) => {
        if(!err) {
            if (rows[0].length == 1){
                    console.log(rows[0][0]);
                return res.status(200).send(rows[0][0]);
            }
            else{
                return res.status(200).send(rows[0]);
                
            }
        } else {
            return res.status(500).send({ 'message' : 'An error occured'});
        }
    });
}
 

exports.getCoachedTeam = (req, res) => {
    query = "CALL get_coached_team(?)";

    connection.userType('A').query(query,
    [
        req.session.user.id
    ], (err, rows) => {
        if(!err) {
                if (rows[0].length == 1){
                    console.log(rows[0][0]);
                    return res.status(200).send(rows[0][0]);
                }
                else{
                    // console.log("Dito");
                    console.log(rows[0]);
                    return res.status(200).send(rows[0]);
                    
                }
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });
}

exports.getTeamsOnOrganization = (req, res) => {
    query = "CALL get_teams_on_organization(?)";

    connection.userType('A').query(query,
    [
        req.query.org_id
    ], (err, rows) => {
        if(!err) {
            if (rows[0].length == 1){
                return res.status(200).send(rows[0][0]);
            }
            else{
                return res.status(200).send(rows[0]);
                
            }
        } else {
            return res.status(500).send({ 'message' : 'An error occured'});
        }
    });
}

exports.getOrganization = (req, res) => {
    query = "SELECT * from organization where organization_id = ?";

    connection.userType('A').query(query,
    [
        req.query.organization_id
    ], (err, rows) => {
        if(!err) {
            console.log(rows[0]);
            return res.status(200).send(rows[0]);
        } else {
            return res.status(500).send({ 'message' : 'An error occured'});
        }
    });
}

exports.getGamesInOrganization = (req, res) => {
    query = "select * from game join organization_in_game where game.game_id = organization_in_game.game_id and organization_id = ?";

    connection.userType('A').query(query,
    [
        req.query.organization_id
    ], (err, rows) => {
        if(!err) {
            return res.status(200).send(rows);
        } else {
            return res.status(500).send({ 'message' : 'An error occured'});
        }
    });
}
