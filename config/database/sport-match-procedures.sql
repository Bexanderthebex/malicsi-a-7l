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

-- view matches in a sport
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE view_match_sport TO 'guest'@'localhost';

-- view  match details
GRANT EXECUTE ON PROCEDURE view_match_details TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE view_match_details TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE view_match_details TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE view_match_details TO 'guest'@'localhost';

-- view all matches
GRANT EXECUTE ON PROCEDURE view_all_match TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE view_all_match TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE view_all_match TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE view_all_match TO 'guest'@'localhost';

-- add match
GRANT EXECUTE ON PROCEDURE add_match TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE add_match TO 'administrator'@'localhost';

-- edit match
GRANT EXECUTE ON PROCEDURE edit_match TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_match TO 'administrator'@'localhost';

-- edit team ranking
GRANT EXECUTE ON PROCEDURE edit_team_ranking_in_match TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_team_ranking_in_match TO 'administrator'@'localhost';

-- delete match
GRANT EXECUTE ON PROCEDURE delete_match TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE delete_match TO 'administrator'@'localhost';
