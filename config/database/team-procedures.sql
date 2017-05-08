USE malicsi;


DROP PROCEDURE IF EXISTS get_team;
DELIMITER //

CREATE PROCEDURE get_team (IN id INT)
	BEGIN
		SELECT * from team WHERE team_id = id;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS search_team;
DELIMITER //

CREATE PROCEDURE search_team (IN team_namein VARCHAR(50))
	BEGIN
		SELECT * from team where team_name like team_namein;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS get_coached_team;
DELIMITER //

CREATE PROCEDURE get_coached_team (IN idin INT)
	BEGIN
		-- SELECT * from team JOIN sport using (sport_id) WHERE id = idin;
		SELECT * from team JOIN sport using (sport_id) join organization WHERE id = idin && organization.organization_id = team.team_organization;
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS create_team;
DELIMITER //

CREATE PROCEDURE create_team (IN team_namein VARCHAR(50), IN idin INT, IN sport_idin INT, IN team_organizationin INT, IN max_membersin INT)
	BEGIN
		INSERT INTO team(team_name, id, sport_id, team_organization, pending_participation, max_members) VALUES (team_namein, idin, sport_idin, team_organizationin, 1, max_membersin);
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_team;
DELIMITER //

CREATE PROCEDURE delete_team (IN team_idin INT)
	BEGIN
	   DELETE FROM team WHERE team_id = team_idin;
	END; //
DELIMITER ;


DROP PROCEDURE IF EXISTS team_membership_request;
DELIMITER //
CREATE PROCEDURE team_membership_request (IN idin INT, IN team_idin INT)
	BEGIN
	   INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(idin,team_idin,0);
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS delete_membership_request;
DELIMITER //
CREATE PROCEDURE delete_membership_request (IN idin INT, IN team_idin INT)
	BEGIN
	   DELETE FROM competitor_joins_team WHERE id = idin AND team_id = team_idin;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS accept_membership_request;
DELIMITER //
CREATE PROCEDURE accept_membership_request (IN idin INT, IN team_idin INT)
	BEGIN
	  UPDATE competitor_joins_team SET is_member = 1 where id = idin AND team_id = team_idin;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS add_team_member;
DELIMITER //
CREATE PROCEDURE add_team_member (IN idin INT, IN team_idin INT)
	BEGIN
	  INSERT INTO competitor_joins_team(id, team_id, is_member) VALUES(idin,team_idin,1);
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS get_membership_request;
DELIMITER //
CREATE PROCEDURE get_membership_request (IN idin INT, IN team_idin INT)
	BEGIN
	  SELECT * from competitor_joins_team where id = idin AND team_id = team_idin;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS rankings;
DELIMITER //
CREATE PROCEDURE rankings ( IN team_idin INT)
	BEGIN
	   SELECT ranking, COUNT(ranking) AS rankCount FROM team_in_match WHERE team_id = team_idin GROUP BY ranking;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS organization_rankings;
DELIMITER //
CREATE PROCEDURE organization_rankings ( IN org_id INT)
	BEGIN
	   SELECT ranking, COUNT(ranking) AS rankCount FROM (team_in_match JOIN team USING (team_id)) WHERE team_organization = org_id GROUP BY ranking;
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS count_teams_in_sport;
DELIMITER //
CREATE PROCEDURE count_teams_in_sport ( IN sport_idin INT)
	BEGIN
	   SELECT sport_id, COUNT(team_id) AS team_count FROM team WHERE sport_id = sport_idin and pending_participation = 0;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_members;
DELIMITER //

CREATE PROCEDURE get_members (IN team_idin INT)
	BEGIN
	   SELECT * FROM competitor_joins_team JOIN competitor USING (id) WHERE team_id = team_idin;
	END; //
DELIMITER ;

DROP procedure IF EXISTS get_teams_on_organization;
DELIMITER //

CREATE PROCEDURE get_teams_on_organization (IN org_id INT)
	BEGIN
	   SELECT * FROM team join sport on team.sport_id = sport.sport_id WHERE team_organization = org_id;
	END; //
DELIMITER ;


DROP procedure IF EXISTS display_pending_membership_request;
DELIMITER //

CREATE PROCEDURE display_pending_membership_request(IN owner_idin INT)
	BEGIN
		SELECT competitor.id, first_name, last_name, team_id, team_name, sport_name FROM competitor, sport s join team JOIN competitor_joins_team using(team_id)
		WHERE s.sport_id = team.sport_id AND competitor.id = competitor_joins_team.id AND team.id = owner_idin AND is_member = 0;
	END; //
DELIMITER ;


GRANT EXECUTE ON procedure display_pending_membership_request TO 'competitor'@'%';
GRANT EXECUTE ON procedure create_team TO 'competitor'@'%';
GRANT EXECUTE ON procedure delete_team TO 'competitor'@'%';
GRANT EXECUTE ON procedure team_membership_request TO 'competitor'@'%';
GRANT EXECUTE ON procedure accept_membership_request TO 'competitor'@'%';
GRANT EXECUTE ON procedure rankings TO 'competitor'@'%';
GRANT EXECUTE ON procedure count_teams_in_sport TO 'competitor'@'%';
GRANT EXECUTE ON procedure get_members TO 'competitor'@'%';
GRANT EXECUTE ON procedure organization_rankings TO 'competitor'@'%';
GRANT EXECUTE ON procedure get_teams_on_organization TO 'competitor'@'%';
GRANT EXECUTE ON procedure add_team_member TO 'competitor'@'%';
GRANT EXECUTE ON procedure delete_membership_request TO 'competitor'@'%';


GRANT EXECUTE ON procedure display_pending_membership_request TO 'administrator'@'%';
GRANT EXECUTE ON procedure create_team TO 'administrator'@'%';
GRANT EXECUTE ON procedure delete_team TO 'administrator'@'%';
GRANT EXECUTE ON procedure team_membership_request TO 'administrator'@'%';
GRANT EXECUTE ON procedure accept_membership_request TO 'administrator'@'%';
GRANT EXECUTE ON procedure rankings TO 'administrator'@'%';
GRANT EXECUTE ON procedure count_teams_in_sport TO 'administrator'@'%';
GRANT EXECUTE ON procedure get_members TO 'administrator'@'%';
GRANT EXECUTE ON procedure organization_rankings TO 'administrator'@'%';
GRANT EXECUTE ON procedure get_teams_on_organization TO 'administrator'@'%';
GRANT EXECUTE ON procedure add_team_member TO 'administrator'@'%';
GRANT EXECUTE ON procedure delete_membership_request TO 'administrator'@'%';

GRANT EXECUTE ON procedure rankings TO 'guest'@'%';
GRANT EXECUTE ON procedure count_teams_in_sport TO 'guest'@'%';
GRANT EXECUTE ON procedure get_members TO 'guest'@'%';
GRANT EXECUTE ON procedure organization_rankings TO 'guest'@'%';
GRANT EXECUTE ON procedure get_teams_on_organization TO 'guest'@'%';

GRANT EXECUTE ON procedure get_membership_request TO 'administrator'@'%';
GRANT EXECUTE ON procedure get_membership_request TO 'competitor'@'%';
GRANT EXECUTE ON procedure get_membership_request TO 'organizer'@'%';
GRANT EXECUTE ON procedure get_membership_request TO 'guest'@'%';

GRANT EXECUTE ON procedure get_team TO 'administrator'@'%';
GRANT EXECUTE ON procedure get_team TO 'competitor'@'%';
GRANT EXECUTE ON procedure get_team TO 'organizer'@'%';
GRANT EXECUTE ON procedure get_team TO 'guest'@'%';

GRANT EXECUTE ON procedure search_team TO 'administrator'@'%';
GRANT EXECUTE ON procedure search_team TO 'competitor'@'%';
GRANT EXECUTE ON procedure search_team TO 'organizer'@'%';
GRANT EXECUTE ON procedure search_team TO 'guest'@'%';

GRANT EXECUTE ON procedure get_coached_team TO 'administrator'@'%';
GRANT EXECUTE ON procedure get_coached_team TO 'competitor'@'%';
GRANT EXECUTE ON procedure get_coached_team TO 'organizer'@'%';
GRANT EXECUTE ON procedure get_coached_team TO 'guest'@'%';