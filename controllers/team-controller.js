var db = require(__dirname + './../config/db-connection');

exports.createTeam = function(req, res){
    db.query("INSERT INTO team(team_organization, team_sport) VALUES (?, ?)",
            [req.body.team_organization,
            req.body.team_sport],
            function(err){
                if(err){
                    return err;
                }
            });
};

exports.deleteTeam = function(req, res){
    db.query("DELETE FROM team WHERE team_organization = ?" , [req.body.team_organization],
    function(err){
        if(err){
            return err;
        }
    });
};

exports.teamMembershipRequest = function(){
    
}