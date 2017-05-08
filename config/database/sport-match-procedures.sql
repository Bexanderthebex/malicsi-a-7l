USE malicsi;

DROP PROCEDURE IF EXISTS add_match;
DELIMITER //
CREATE PROCEDURE add_match
(IN t_start TIME,
 IN t_end TIME,
 IN m_date DATE,
 IN s_id INT)
BEGIN
	INSERT INTO sport_match(time_start, time_end, match_date, sport_id)
	VALUES(t_start, t_end, m_date, s_id);
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_match_sport;
DELIMITER //
CREATE PROCEDURE view_match_sport(IN  s_id INT)
BEGIN
	SELECT * FROM sport_match where sport_id = s_id;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_match_details;
DELIMITER //
CREATE PROCEDURE view_match_details(IN match_id_in INT)
BEGIN
	  SELECT * FROM sport_match
	  WHERE match_id = match_id_in;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_match;
DELIMITER //
CREATE PROCEDURE view_all_match()
BEGIN
	SELECT * FROM sport_match;
END;//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_last_inserted_match;
DELIMITER //
CREATE PROCEDURE view_last_inserted_match ()
BEGIN
	SELECT * FROM sport_match
	WHERE match_id = (SELECT LAST_INSERT_ID());
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_match;
DELIMITER //
CREATE PROCEDURE delete_match (in matchID int)
BEGIN

	DELETE FROM sport_match WHERE match_id = matchID;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS count_match_by_sport;
DELIMITER //
CREATE PROCEDURE count_match_by_sport (IN s_id INT)
BEGIN
	SELECT COUNT(*) FROM sport_match
	WHERE sport_id = s_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_match;
DELIMITER //
CREATE PROCEDURE edit_match
(IN t_start TIME,
 IN t_end TIME,
 IN m_date DATE,
 IN rem VARCHAR(200),
 IN m_id INT)
BEGIN
	UPDATE sport_match SET
	time_start = t_start,
	time_end = t_end,
	match_date = m_date,
	remarks = rem
	WHERE match_id = m_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_team_ranking_in_match;
DELIMITER //
CREATE PROCEDURE edit_team_ranking_in_match
(IN rank INT,
 IN m_id INT,
 IN t_id INT)
BEGIN
	UPDATE team_in_match SET
	ranking = rank
	WHERE match_id = m_id AND team_id = t_id;
END //
DELIMITER ;

-- retrieve matches

DROP PROCEDURE IF EXISTS view_current_match;
DELIMITER //
CREATE PROCEDURE view_current_match
(IN sportId INT
)
BEGIN
	SELECT match_id, m.time_start, m.time_end, m.sport_id, match_date, remarks FROM sport_match m join sport using (sport_id) WHERE m.sport_id = sportId AND CURDATE() = match_date;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_past_match;
DELIMITER //
CREATE PROCEDURE view_past_match
(IN sportId INT
)
BEGIN
	SELECT match_id, m.time_start, m.time_end, m.sport_id, match_date, remarks FROM sport_match m join sport using (sport_id) WHERE m.sport_id = sportId AND CURDATE() > match_date;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_future_match;
DELIMITER //
CREATE PROCEDURE view_future_match
(IN sportId INT
)
BEGIN
	SELECT match_id, m.time_start, m.time_end, m.sport_id, match_date, remarks FROM sport_match m join sport using (sport_id) WHERE m.sport_id = sportId AND CURDATE() < match_date;
END //
DELIMITER ;

-- retrieve teams in match
DROP PROCEDURE IF EXISTS retrieve_teams_in_match;
DELIMITER //
CREATE PROCEDURE retrieve_teams_in_match (IN m_id INT)
BEGIN
	SELECT team_id, team_name, ranking FROM team JOIN team_in_match using (team_id) where match_id = m_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS retrieve_match_winner;
DELIMITER //
CREATE PROCEDURE retrieve_match_winner
(IN s_id INT
)
BEGIN
	SELECT m.match_id, t.team_name FROM
	team t, team_in_match tm, sport_match m, sport s WHERE
	t.team_id = tm.team_id AND tm.match_id = m.match_id AND m.sport_id = s.sport_id AND tm.ranking = 1 AND s.sport_id = s_id;
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS add_team_in_match;
DELIMITER //
CREATE PROCEDURE add_team_in_match (IN m_id INT, IN t_id INT, IN rank INT)
BEGIN
	insert into team_in_match (match_id, team_id, ranking) values (m_id, t_id, rank);
END //
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_team_in_match;
DELIMITER //
CREATE PROCEDURE delete_team_in_match (IN m_id INT, IN t_id INT)
BEGIN
	DELETE FROM team_in_match WHERE team_id = t_id AND match_id = m_id;
END //
DELIMITER ;



-- view future match in sport
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'guest'@'%';

-- view past match in sport
GRANT EXECUTE ON PROCEDURE view_current_match TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE view_current_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE view_current_match TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE view_current_match TO 'guest'@'%';

-- view current match in sport
GRANT EXECUTE ON PROCEDURE view_future_match TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE view_future_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE view_future_match TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE view_future_match TO 'guest'@'%';

-- view matches in a sport
GRANT EXECUTE ON PROCEDURE view_past_match TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE view_past_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE view_past_match TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE view_past_match TO 'guest'@'%';

-- view match details
GRANT EXECUTE ON PROCEDURE view_match_details TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE view_match_details TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE view_match_details TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE view_match_details TO 'guest'@'%';

-- view all matches
GRANT EXECUTE ON PROCEDURE view_all_match TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE view_all_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE view_all_match TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE view_all_match TO 'guest'@'%';

-- retrieve match winner
GRANT EXECUTE ON PROCEDURE retrieve_match_winner TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE retrieve_match_winner TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE retrieve_match_winner TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE retrieve_match_winner TO 'guest'@'%';

-- retrieve teams in match
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_match TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_match TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE retrieve_teams_in_match TO 'guest'@'%';
-- add match
GRANT EXECUTE ON PROCEDURE add_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE add_match TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE add_match TO 'guest'@'%';

-- edit match
GRANT EXECUTE ON PROCEDURE edit_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE edit_match TO 'administrator'@'%';

-- edit team ranking
GRANT EXECUTE ON PROCEDURE edit_team_ranking_in_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE edit_team_ranking_in_match TO 'administrator'@'%';

-- delete match
GRANT EXECUTE ON PROCEDURE delete_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE delete_match TO 'administrator'@'%';

GRANT EXECUTE ON PROCEDURE view_last_inserted_match TO 'guest'@'%';


GRANT EXECUTE ON PROCEDURE add_team_in_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE add_team_in_match TO 'administrator'@'%';

GRANT EXECUTE ON PROCEDURE delete_team_in_match TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE delete_team_in_match TO 'administrator'@'%';

GRANT EXECUTE ON PROCEDURE count_match_by_sport TO 'administrator'@'%';
GRANT EXECUTE ON PROCEDURE count_match_by_sport TO 'organizer'@'%';
GRANT EXECUTE ON PROCEDURE count_match_by_sport TO 'competitor'@'%';
GRANT EXECUTE ON PROCEDURE count_match_by_sport TO 'guest'@'%';