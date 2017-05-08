'use strict'

const mysql = require('mysql');
const bodyParser = require('body-parser');
const connection = require('./../config/db-connection.js');
const logs = require('./../controllers/log-controller.js');


exports.createTeam = (req, res) => {
    let query = "CALL create_team(?, ?, ?, ?, ?)";
    let query1 = "CALL get_team(?)"
    
    connection.userType(req.session.user.type).query(query,
        [
            req.body.team_name,
            req.session.user.id,
            req.body.sport_id, 
            req.body.team_organization, 
            req.body.max_members
        ], (err, rows) => {
            if(!err) {
                logs.createLog(req.session.user.id,"Created New Team");
                return res.status(200).send({ 'message' : 'Sucessfully created team'});
            } else {
                console.log(err);
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.deleteTeam = (req, res) => {
    let query = "CALL delete_team(?)"; 
    let team_id = req.body.team_id
    
    connection.userType(req.session.user.type).query(query, 
        [
            req.query.team_id
        ], (err, rows) => {
            if(!err) {
                logs.createLog(req.session.user.id,"Deleted Team "+team_id);
                return res.status(200).send({ 'message' : 'Sucessfully deleted team'}); 
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.addTeamMember = (req, res) => {
    let id = req.body.id;
    let team_id = req.body.team_id;
    let query = "CALL add_team_member(?,?)";
    
    connection.userType(req.session.user.type).query(query, 
        [
            id,
            team_id
        ], (err, rows) => {
            if(!err) {
                logs.createLog(req.session.user.id,"Added User " +id +" To Team" + team_id);
                return res.status(200).send({ 'message' : 'Sucessfully sent request'});
            } else {
                if(err.code == 'ER_DUP_ENTRY') return res.status(493).send({ 'message' : 'Duplicate entry'});
                else return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.teamMembershipRequest = (req, res) => {
    let team_id = req.body.team_id;
    let query = "CALL team_membership_request(?,?)";
   
    connection.userType(req.session.user.type).query(query, 
        [
            req.session.user.id,
            req.body.team_id
        ], (err, rows) => {
            if(!err) {
                logs.createLog(req.session.user.id,"Created Membership Request To Team" + team_id);
                return res.status(200).send({ 'message' : 'Sucessfully sent request'});
            } else {
                if(err.code == 'ER_DUP_ENTRY') return res.status(493).send({ 'message' : 'Duplicate entry'});
                else return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
    );
}

exports.deleteMembershipRequest = (req, res) => {   
    let id = req.body.id;
    let team_id = req.body.team_id;
    let query = "CALL delete_membership_request(?,?)";
    
    connection.userType(req.session.user.type).query(query, 
        [
           id,
           team_id
        ], (err, rows) => {
                if(!err) {
                    logs.createLog(req.session.user.id,"Deleted Membership Request of" + id + "To Team" + team_id);
                    return res.status(200).send({ 'message' : 'Sucessfully deleted request'});
                } else {
                    return res.status(500).send({ 'message' : 'An error occured'});
                }
        }
     );
}

exports.acceptMembershipRequest = (req, res) => {
    let query = "CALL accept_membership_request(?,?)";
    let id = req.query.id;
    let team_id = req.query.team_id;
    
    connection.userType(req.session.user.type).query(query, 
        [
            req.query.id,
            req.query.team_id
        ], (err, rows) => {
            if(!err) {
                logs.createLog(req.session.user.id,"Accepted Membership Request of" + id + "To Team" + team_id);
                return res.status(200).send({ 'message' : 'Sucessfully accepted request'});
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
     );
}
exports.getMembershipRequest = (req, res) => {
    let query = "CALL get_membership_request(?,?)";
    
    connection.userType('G').query(query, 
        [
            req.query.id,
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
        }
     );
}

exports.displayPendingMembershipRequest = (req, res) => {
    let query = "CALL display_pending_membership_request(?)";
    
    connection.userType(req.session.user).query(query, 
        [
            req.session.user.id
        ], (err, rows) => {
            if(!err) {

                return res.status(200).send(rows[0]);
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        }
     );
}

exports.getTeamStatistics = (req, res) => {
    let query = "CALL rankings(?)";
    
    connection.userType('G').query(query,
        [
            req.query.team_id
        ], (err, rows) => {
            if(!err) {
                return res.status(200).send(rows[0]);
                
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        })
}  

exports.getOrganizationRankings = (req, res) => {
    let query = "CALL organization_rankings(?)";

    connection.userType('G').query(query,
        [
            req.query.org_id
        ], (err, rows) => {
            if(!err) {
                return res.status(200).send(rows[0]);
                
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
        })
}  

exports.countTeamInSports = (req, res) => {
    let query = "CALL count_teams_in_sport(?)";
    
    connection.userType('G').query(query,
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
    let query = "CALL get_members(?)";
    
    connection.userType('G').query(query,
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
    let query = "CALL get_team(?)";

    connection.userType('G').query(query,
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
    });
}
 

exports.getCoachedTeam = (req, res) => {
    let query = "CALL get_coached_team(?)";

    connection.userType('A').query(query,
    [
        req.session.user.id
    ], (err, rows) => {
        if(!err) {
                if (rows[0].length == 1){
                    return res.status(200).send(rows[0]);
                }
                else{
                    return res.status(200).send(rows[0]);
                    
                }
            } else {
                return res.status(500).send({ 'message' : 'An error occured'});
            }
    });
}

exports.getTeamsOnOrganization = (req, res) => {
    let query = "CALL get_teams_on_organization(?)";

    connection.userType('G').query(query,
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
    let query = "SELECT * from organization where organization_id = ?";

    connection.userType('G').query(query,
    [
        req.query.organization_id
    ], (err, rows) => {
        if(!err) {
            return res.status(200).send(rows[0]);
        } else {
            return res.status(500).send({ 'message' : 'An error occured'});
        }
    });
}

exports.getGamesInOrganization = (req, res) => {
    let query = "select * from game join organization_in_game where game.game_id = organization_in_game.game_id and organization_id = ?";

    connection.userType('G').query(query,
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

exports.searchTeam = (req, res) => {
    let query = 'CALL search_team(?)';

    connection.userType('G').query(query,
        [
            "%" + req.query.search + "%"
        ], (err, rows) => {
             if(!err) {
                 if(rows[0].length == 1) {
                     return res.status(200).send(rows[0]);
                 } else {
                     return res.status(200).send(rows[0]);
 
                 }
             } else {
                 return res.status(500).send({'message' : 'Internal Server Error'});
             }
         });
}
