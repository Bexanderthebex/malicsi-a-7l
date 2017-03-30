USE malicsi;
DROP procedure IF EXISTS createTeam;
DELIMITER //

CREATE PROCEDURE create_team (IN id INT, IN sport_id INT, IN team_organization INT, IN team_sport VARCHAR(50)) 


BEGIN


   INSERT INTO team(id, sport_id, team_organization, team_sport, pending_participation) VALUES (id, sport_id, team_organization, team_sport, 0);


END; //

DROP procedure IF EXISTS deleteTeam;

DELIMITER ;

CREATE PROCEDURE delete_team (IN team_id INT) 


BEGIN


   DELETE FROM team WHERE team_id = team_id;


END; //


DROP procedure IF EXISTS teamMembershipRequest;

DELIMITER ;

CREATE PROCEDURE team_membership_request (IN id INT, IN team_id INT) 


BEGIN


   INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(?,?,FALSE);


END; //

DROP procedure IF EXISTS acceptMembershipRequest;
DELIMITER ;

CREATE PROCEDURE accept_membership_request (IN id INT, IN competitor_id INT) 


BEGIN


  UPDATE competitor_joins_team SET is_member = TRUE where id = id AND team_id = competitor_id;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE rankings ( IN teamID INT, IN user_id INT) 


BEGIN


   SELECT ranking, COUNT(ranking) as rankCount FROM team_in_match WHERE team_id = teamID group by ranking;


END; //	

DELIMITER ;

GRANT EXECUTE ON procedure createTeam to competitor;
GRANT EXECUTE ON procedure deleteTeam to competitor;
GRANT EXECUTE ON procedure teamMembershipRequest to competitor;
GRANT EXECUTE ON procedure acceptMembershipRequest to competitor;
GRANT EXECUTE ON procedure rankings to competitor;