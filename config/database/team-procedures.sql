USE malicsi;


DROP PROCEDURE IF EXISTS delete_team;
DELIMITER //

CREATE PROCEDURE get_team (IN id INT) 
	BEGIN
		SELECT * from team WHERE team_id = id;
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS create_team;
DELIMITER //

CREATE PROCEDURE create_team (IN id INT, IN sport_id INT, IN team_organization INT, IN team_sport VARCHAR(50)) 
	BEGIN
		INSERT INTO team(id, sport_id, team_organization, team_sport, pending_participation) VALUES (id, sport_id, team_organization, team_sport, 0);
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_team;
DELIMITER //

CREATE PROCEDURE delete_team (IN team_id INT) 
	BEGIN
	   DELETE FROM team WHERE team_id = team_id;
	END; //
DELIMITER ;


DROP PROCEDURE IF EXISTS team_membership_request;
DELIMITER //
CREATE PROCEDURE team_membership_request (IN id INT, IN team_id INT) 
	BEGIN
	   INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(id,team_id,0);
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS accept_membership_request;
DELIMITER //
CREATE PROCEDURE accept_membership_request (IN id INT, IN competitor_id INT) 
	BEGIN
	  UPDATE competitor_joins_team SET is_member = TRUE where id = id AND team_id = competitor_id;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS rankings;
DELIMITER //
CREATE PROCEDURE rankings ( IN teamID INT, IN user_id INT) 
	BEGIN
	   SELECT ranking, COUNT(ranking) AS rankCount FROM team_in_match WHERE team_id = teamID GROUP BY ranking;
	END; //	

DELIMITER ;

DROP PROCEDURE IF EXISTS count_teams_in_sport;
DELIMITER //
CREATE PROCEDURE count_teams_in_sport ( IN sport_id INT, IN user_id INT) 
	BEGIN
	   SELECT sport_id, COUNT(team_id) AS rankCount FROM team WHERE sport_id = sport_id GROUP BY sport_id;
	END; //	

DELIMITER ;

GRANT EXECUTE ON PROCEDURE create_team TO competitor;
GRANT EXECUTE ON PROCEDURE delete_team TO competitor;
GRANT EXECUTE ON PROCEDURE team_membership_request TO competitor;
GRANT EXECUTE ON PROCEDURE accept_membership_request TO competitor;
GRANT EXECUTE ON PROCEDURE rankings TO competitor;
GRANT EXECUTE ON PROCEDURE count_teams_in_sport to competitor;

GRANT EXECUTE ON PROCEDURE create_team to admin;
GRANT EXECUTE ON PROCEDURE delete_team to admin;
GRANT EXECUTE ON PROCEDURE team_membership_request to admin;
GRANT EXECUTE ON PROCEDURE accept_membership_request to admin;
GRANT EXECUTE ON PROCEDURE rankings to admin;
GRANT EXECUTE ON PROCEDURE count_teams_in_sport to admin;

GRANT EXECUTE ON PROCEDURE rankings to guest;
GRANT EXECUTE ON PROCEDURE count_teams_in_sport to guest;
