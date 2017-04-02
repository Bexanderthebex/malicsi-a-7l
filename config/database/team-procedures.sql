USE malicsi;

DROP procedure IF EXISTS create_team;
DELIMITER //

CREATE PROCEDURE create_team (IN id INT, IN sport_id INT, IN team_organization INT, IN team_sport VARCHAR(50)) 
	BEGIN
		INSERT INTO team(id, sport_id, team_organization, team_sport, pending_participation) VALUES (id, sport_id, team_organization, team_sport, 0);
	END; //

DELIMITER ;


DROP procedure IF EXISTS delete_team;
DELIMITER //

CREATE PROCEDURE delete_team (IN team_id INT) 
	BEGIN
	   DELETE FROM team WHERE team_id = team_id;
	END; //
DELIMITER ;


DROP procedure IF EXISTS team_membership_request;
DELIMITER //
CREATE PROCEDURE team_membership_request (IN id INT, IN team_id INT) 
	BEGIN
	   INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(id,team_id,0);
	END; //

DELIMITER ;

DROP procedure IF EXISTS accept_membership_request;
DELIMITER //
CREATE PROCEDURE accept_membership_request (IN id INT, IN competitor_id INT) 
	BEGIN
	  UPDATE competitor_joins_team SET is_member = TRUE where id = id AND team_id = competitor_id;
	END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //
CREATE PROCEDURE rankings ( IN teamID INT) 
	BEGIN
	   SELECT ranking, COUNT(ranking) as rankCount FROM team_in_match WHERE team_id = teamID group by ranking;
	END; //	

DELIMITER ;

DROP procedure IF EXISTS count_teams_in_sport;
DELIMITER //
CREATE PROCEDURE count_teams_in_sport ( IN sport_id INT) 
	BEGIN
	   SELECT sport_id, COUNT(team_id) as team_count FROM team WHERE sport_id = sport_id GROUP BY sport_id;
	END; //	

DELIMITER ;


DROP procedure IF EXISTS get_members;
DELIMITER //

CREATE PROCEDURE get_members (IN teamID INT) 
	BEGIN
	   SELECT * FROM competitor_joins_team JOIN competitor USING (id) WHERE team_id = teamID;
	END; //
DELIMITER ;

GRANT EXECUTE ON procedure create_team to competitor;
GRANT EXECUTE ON procedure delete_team to competitor;
GRANT EXECUTE ON procedure team_membership_request to competitor;
GRANT EXECUTE ON procedure accept_membership_request to competitor;
GRANT EXECUTE ON procedure rankings to competitor;
GRANT EXECUTE ON procedure count_teams_in_sport to competitor;
GRANT EXECUTE ON procedure get_members to competitor;

GRANT EXECUTE ON procedure create_team to administrator;
GRANT EXECUTE ON procedure delete_team to administrator;
GRANT EXECUTE ON procedure team_membership_request to administrator;
GRANT EXECUTE ON procedure accept_membership_request to administrator;
GRANT EXECUTE ON procedure rankings to administrator;
GRANT EXECUTE ON procedure count_teams_in_sport to administrator;
GRANT EXECUTE ON procedure get_members to administrator;

GRANT EXECUTE ON procedure rankings to guest;
GRANT EXECUTE ON procedure count_teams_in_sport to guest;
GRANT EXECUTE ON procedure get_members to guest;
