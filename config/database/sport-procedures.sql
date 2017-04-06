USE malicsi;

DELIMITER //
DROP PROCEDURE IF EXISTS create_sport //
CREATE PROCEDURE create_sport
(IN s_name VARCHAR(50), 
 IN mech TEXT, 
 IN t_start TIME, 
 IN t_end TIME, 
 IN s_date DATE,
 IN e_date DATE,
 IN max_t INT(11),
 IN score_sys VARCHAR(50),
 IN g_id INT(11))
BEGIN
	INSERT INTO sport
	(sport_name, 
	 mechanics, 
	 time_start, 
	 time_end, 
	 start_date, 
	 end_date, 
	 max_teams, 
	 scoring_system, 
	 game_id) 
	VALUES(s_name, mech, t_start, t_end, s_date, e_date, max_t, score_sys, g_id);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_sport;
DELIMITER //
CREATE PROCEDURE view_sport (IN s_id INT(11))
BEGIN
	SELECT * FROM sport 
	WHERE sport_id = s_id;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_last_inserted_sport;
DELIMITER //
CREATE PROCEDURE view_last_inserted_sport ()
BEGIN
	SELECT * FROM sport 
	WHERE sport_id = (SELECT LAST_INSERT_ID());
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_sport;
DELIMITER //
CREATE PROCEDURE edit_sport
(IN sportName VARCHAR(50), 
 IN mechanicsInput TEXT, 
 IN timeStart TIME, 
 IN timeEnd TIME, 
 IN startDate DATE, 
 IN endDate DATE, 
 IN maxTeams INT,
 IN scoringSystem VARCHAR(50), 
 IN sportId int(11))
BEGIN
	UPDATE sport SET 
	sport_name = sportName, 
	mechanics = mechanicsInput, 
	time_start = timeStart, 
	time_end = timeEnd, 
	start_date = startDate, 
	end_date = endDate, 
	max_teams = maxTeams, 
	scoring_system = scoringSystem 
	WHERE sport_id = sportId;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS add_winner_sport;
DELIMITER //
CREATE PROCEDURE add_winner_sport(IN winnerInput int(11), IN sportId int(11))
	BEGIN
		UPDATE sport SET winner = winnerInput WHERE sport_id = sport_id;
	END;//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_sport;
DELIMITER //
	CREATE PROCEDURE delete_sport(IN sportId int(11))
	BEGIN
		DELETE FROM sport WHERE sport_id = sportId;
	END;
	//
DELIMITER ;



DELIMITER //
DROP PROCEDURE IF EXISTS count_sport_by_game //
CREATE PROCEDURE count_sport_by_game (IN g_id INT(11))
BEGIN
	SELECT COUNT(*) FROM sport 
	WHERE game_id = g_id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS retrieve_team_rankings_from_sport //
CREATE PROCEDURE retrieve_team_rankings_from_sport (IN in_sport_id INT(11))
BEGIN
	select organization.name as org_name, sum(team_in_match.ranking) as total_ranks from team_in_match, sport, sport_match, team, organization where sport.sport_id = in_sport_id and sport.sport_id = sport_match.sport_id and sport_match.match_id = team_in_match.match_id and team.team_id = team_in_match.team_id and team.team_organization = organization.organization_id and team_in_match.ranking is not NULL group by organization.name;
END //
DELIMITER ;

GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO organizer;
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO administrator;
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO competitor;
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO guest;


call retrieve_team_rankings_from_sport(6);
	select organization.name, sum(team_in_match.ranking) from team_in_match, sport, sport_match, team, organization where sport.sport_id = 6 and sport.sport_id = sport_match.sport_id and sport_match.match_id = team_in_match.match_id and team.team_id = team_in_match.team_id and team.team_organization = organization.organization_id and team_in_match.ranking is not NULL group by organization.name;

-- create sport
GRANT EXECUTE ON PROCEDURE create_sport TO organizer;
GRANT EXECUTE ON PROCEDURE create_sport TO administrator;

-- view sport
GRANT EXECUTE ON PROCEDURE view_sport TO organizer;
GRANT EXECUTE ON PROCEDURE view_sport TO administrator;
GRANT EXECUTE ON PROCEDURE view_sport TO competitor;
GRANT EXECUTE ON PROCEDURE view_sport TO guest;

-- view last inserted sport
GRANT EXECUTE ON PROCEDURE view_last_inserted_sport TO organizer;
GRANT EXECUTE ON PROCEDURE view_last_inserted_sport TO administrator;

-- edit sport
GRANT EXECUTE ON PROCEDURE edit_sport to organizer;
GRANT EXECUTE ON PROCEDURE edit_sport to administrator;

-- add winner
GRANT EXECUTE ON PROCEDURE add_winner_sport to organizer;
GRANT EXECUTE ON PROCEDURE add_winner_sport to administrator;

-- delete sport
GRANT EXECUTE ON PROCEDURE delete_sport to organizer;
GRANT EXECUTE ON PROCEDURE delete_sport to administrator;

-- count sport 
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO organizer;
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO administrator;
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO competitor;
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO guest;

