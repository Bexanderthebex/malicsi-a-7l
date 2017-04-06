USE malicsi;

DROP PROCEDURE IF EXISTS create_sport;
DELIMITER //
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
	start_end = startDate, 
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


DROP PROCEDURE IF EXISTS count_sport_by_game;
DELIMITER //
CREATE PROCEDURE count_sport_by_game (IN g_id INT(11))
BEGIN
	SELECT COUNT(*) FROM sport 
	WHERE game_id = g_id;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS retrieve_team_rankings_from_sport;
DELIMITER //
CREATE PROCEDURE retrieve_team_rankings_from_sport (IN in_sport_id INT(11))
BEGIN
	select organization.name as org_name, sum(team_in_match.ranking) as total_ranks from team_in_match, sport, sport_match, team, organization where sport.sport_id = in_sport_id and sport.sport_id = sport_match.sport_id and sport_match.match_id = team_in_match.match_id and team.team_id = team_in_match.team_id and team.team_organization = organization.organization_id and team_in_match.ranking is not NULL group by organization.name;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_matches_in_game;
DELIMITER //
CREATE PROCEDURE view_all_matches_in_game(in game_id_input INT(11))
BEGIN
	SELECT team_id, match_id, sport_id, game_id, sport_match.time_start, sport_match.time_end from ((game join sport using (game_id)) join sport_match using (sport_id)) join team_in_match using (match_id) where game_id = game_id_input;
END //

DROP PROCEDURE IF EXISTS search_for_sport_by_keyword;
DELIMITER //
CREATE PROCEDURE search_for_sport_by_keyword(in keyword varchar(50))
BEGIN
	select sport.sport_name, sport.start_date, sport.end_date, time_start, time_end, max_teams, sport.mechanics, game.name as game_name from sport,game where (sport.sport_name like keyword or sport.mechanics like keyword or game.name like keyword or game.location like keyword) and sport.game_id = game.game_id;
END;
//

DELIMITER ;

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

-- retrieve team rankings from sport
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO organizer;
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO administrator;
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO competitor;
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO guest;


-- view all matches in game
GRANT EXECUTE ON PROCEDURE view_all_matches_in_game TO organizer;
GRANT EXECUTE ON PROCEDURE view_all_matches_in_game TO administrator;
GRANT EXECUTE ON PROCEDURE view_all_matches_in_game TO competitor;
GRANT EXECUTE ON PROCEDURE view_all_matches_in_game TO guest;

-- search all sport by keyword
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO organizer;
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO administrator;
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO competitor;
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO guest;

