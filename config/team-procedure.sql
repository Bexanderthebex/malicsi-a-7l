USE malicsi;
DROP procedure IF EXISTS team-procedure;
DELIMITER //

CREATE PROCEDURE createTeam (IN id INT, IN sport_id INT, IN team_organization INT, IN team_sport VARCHAR(50)) 


BEGIN


   INSERT INTO team(id, sport_id, team_organization, team_sport, pending_participation) VALUES (id, sport_id, team_organization, team_sport, 0);


END; //

DELIMITER ;

CREATE PROCEDURE deleteTeam (IN team_id INT) 


BEGIN


   DELETE FROM team WHERE team_id = team_id;


END; //

DELIMITER ;

CREATE PROCEDURE teamMembershipRequest (IN id INT, IN team_id INT) 


BEGIN


   INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(?,?,FALSE);


END; //

DELIMITER ;

CREATE PROCEDURE acceptMembershipRequest (IN id INT, IN competitor_id INT) 


BEGIN


  UPDATE competitor_joins_team SET is_member = TRUE where id = id AND team_id = competitor_id;


END; //

DELIMITER ;

GRANT EXECUTE ON procedure createTeam to root;
GRANT EXECUTE ON procedure deleteTeam to root;
GRANT EXECUTE ON procedure teamMembershipRequest to root;
GRANT EXECUTE ON procedure acceptMembershipRequest to root;