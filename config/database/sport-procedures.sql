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
 IN max_t INT,
 IN score_sys VARCHAR(50),
 IN g_id INT)
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
 IN sportId int)
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
CREATE PROCEDURE add_winner_sport(IN winnerInput INT, IN sportId INT)
	BEGIN
		UPDATE sport SET winner = winnerInput WHERE sport_id = sport_id;
	END;//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_sport;
DELIMITER //
	CREATE PROCEDURE delete_sport(IN sportId INT)
	BEGIN
		DELETE FROM sport WHERE sport_id = sportId;
	END;
	//
DELIMITER ;


DROP PROCEDURE IF EXISTS count_sport_by_game;
DELIMITER //
CREATE PROCEDURE count_sport_by_game (IN g_id INT)
BEGIN
	SELECT COUNT(*) FROM sport
	WHERE game_id = g_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_team_rankings_from_sport;
DELIMITER //
CREATE PROCEDURE retrieve_team_rankings_from_sport (IN in_sport_id INT)
BEGIN
	select organization.name as org_name, sum(team_in_match.ranking) as total_ranks from team_in_match, sport, sport_match, team, organization where sport.sport_id = in_sport_id and sport.sport_id = sport_match.sport_id and sport_match.match_id = team_in_match.match_id and team.team_id = team_in_match.team_id and team.team_organization = organization.organization_id and team_in_match.ranking is not NULL group by organization.name;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_org_rankings_from_game;
DELIMITER //
CREATE PROCEDURE retrieve_org_rankings_from_game (IN in_game_id INT)
BEGIN
	select organization.name as org_name, sum(team_in_match.ranking) as total_ranks from team_in_match, sport, sport_match, team, organization, game where game.game_id = in_game_id and game.game_id = sport.game_id and sport.sport_id = sport_match.sport_id and sport_match.match_id = team_in_match.match_id and team.team_id = team_in_match.team_id and team.team_organization = organization.organization_id and team_in_match.ranking is not NULL group by organization.name;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS view_sport;
DELIMITER //
CREATE PROCEDURE view_sport (IN s_id INT)
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

DROP PROCEDURE IF EXISTS search_for_sport_by_keyword;
DELIMITER //
CREATE PROCEDURE search_for_sport_by_keyword(in keyword varchar(50))
BEGIN
	SELECT * FROM sport WHERE sport_name like keyword;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_ongoing_matches_in_sport;
DELIMITER //
CREATE PROCEDURE view_all_ongoing_matches_in_sport(in sport_id_input INT)
BEGIN
	SELECT t.team_id, team_name, m.match_id, s.sport_id, m.time_start, m.time_end, m.match_date
    FROM sport s, sport_match m, team_in_match tm, team t
    WHERE s.sport_id = m.sport_id
        AND m.match_id = tm.match_id
        AND tm.team_id = t.team_id
        AND s.sport_id = sport_id_input
        AND m.match_date = curdate();
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_past_matches_in_sport;
DELIMITER //
CREATE PROCEDURE view_all_past_matches_in_sport(in sport_id_input INT)
BEGIN
	SELECT t.team_id, team_name, m.match_id, s.sport_id, m.time_start, m.time_end, m.match_date
    FROM sport s, sport_match m, team_in_match tm, team t
    WHERE s.sport_id = m.sport_id
        AND m.match_id = tm.match_id
        AND tm.team_id = t.team_id
        AND s.sport_id = sport_id_input
        AND m.match_date < curdate();
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_upcoming_matches_in_sport;
DELIMITER //
CREATE PROCEDURE view_all_upcoming_matches_in_sport(in sport_id_input INT)
BEGIN
	SELECT t.team_id, team_name, m.match_id, s.sport_id, m.time_start, m.time_end, m.match_date
    FROM sport s, sport_match m, team_in_match tm, team t
    WHERE s.sport_id = m.sport_id
        AND m.match_id = tm.match_id
        AND tm.team_id = t.team_id
        AND s.sport_id = sport_id_input
        AND m.match_date > curdate();
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_competitor_rankings_from_sport;
DELIMITER //
CREATE PROCEDURE retrieve_competitor_rankings_from_sport (IN in_sport_id INT, IN in_id INT)
BEGIN
	select ranking, count(ranking) as ranks from competitor_joins_team join team_in_match using(team_id) join sport_match using(match_id) where sport_id = in_sport_id and id = in_id group by ranking;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_sport_rankings;
DELIMITER //
CREATE PROCEDURE retrieve_sport_rankings (IN in_sport_id INT)
BEGIN
	select * from organization join (SELECT team_id, team_name, team_organization as organization_id, sum(ranking) AS total_rank FROM team JOIN team_in_match using (team_id) JOIN sport_match using (match_id) where sport_match.sport_id = in_sport_id group by team_id order by total_rank) as sport_ranking using (organization_id);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_sponsor_in_sport;
DELIMITER //
CREATE PROCEDURE retrieve_sponsor_in_sport (IN in_sport_id INT)
BEGIN
 	select name from sponsor_institution join sponsor_games using(sponsor_id) join sport using (game_id) where sponsor_games.game_id = sport.game_id AND sport_id = in_sport_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_teams_in_sport;
DELIMITER //
CREATE PROCEDURE retrieve_teams_in_sport (IN in_sport_id INT)
BEGIN
 	select team_id, team_name from sport JOIN team using (sport_id) where sport.sport_id = in_sport_id;
END //
DELIMITER ;




GRANT EXECUTE ON PROCEDURE create_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE create_sport TO 'organizer'@'localhost';

-- view sport
GRANT EXECUTE ON PROCEDURE view_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE view_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE view_sport TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE view_sport TO 'guest'@'localhost';

-- view last inserted sport
GRANT EXECUTE ON PROCEDURE view_last_inserted_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE view_last_inserted_sport TO 'administrator'@'localhost';

-- edit sport
GRANT EXECUTE ON PROCEDURE edit_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_sport TO 'administrator'@'localhost';

-- add winner
GRANT EXECUTE ON PROCEDURE add_winner_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE add_winner_sport TO 'administrator'@'localhost';

-- delete sport
GRANT EXECUTE ON PROCEDURE delete_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE delete_sport TO 'administrator'@'localhost';

-- count sport
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE count_sport_by_game TO 'guest'@'localhost';

-- retrieve team rankings from sport
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_team_rankings_from_sport TO 'guest'@'localhost';

-- search all sport by keyword
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE search_for_sport_by_keyword TO 'guest'@'localhost';

-- retrieve org rankings from game
GRANT EXECUTE ON PROCEDURE retrieve_org_rankings_from_game TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_org_rankings_from_game TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_org_rankings_from_game TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_org_rankings_from_game TO 'guest'@'localhost';

-- retrieve competitor rankings from sport
GRANT EXECUTE ON PROCEDURE retrieve_competitor_rankings_from_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_competitor_rankings_from_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_competitor_rankings_from_sport TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_competitor_rankings_from_sport TO 'guest'@'localhost';

-- retrieve team rankings from sport
GRANT EXECUTE ON PROCEDURE retrieve_sport_rankings TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_sport_rankings TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_sport_rankings TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_sport_rankings TO 'guest'@'localhost';

-- retrieve sponsor in sport
GRANT EXECUTE ON PROCEDURE retrieve_sponsor_in_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_sponsor_in_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_sponsor_in_sport TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_sponsor_in_sport TO 'guest'@'localhost';

-- retrieve teams in sport
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_sport TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_sport TO 'guest'@'localhost';