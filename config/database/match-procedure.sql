USE malicsi;

DELIMITER //
DROP PROCEDURE IF EXISTS view_match //
CREATE PROCEDURE view_match (IN m_id INT(11))
BEGIN
	SELECT * FROM sport_match 
	WHERE match_id = m_id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS view_last_inserted_match //
CREATE PROCEDURE view_last_inserted_match ()
BEGIN
	SELECT * FROM sport_match 
	WHERE match_id = (SELECT LAST_INSERT_ID());
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS add_match //
CREATE PROCEDURE add_match
(IN t_start TIME, 
 IN t_end TIME, 
 IN m_date DATE,
 IN s_id INT(11))
BEGIN
	INSERT INTO sport_match(time_start, time_end, match_date, sport_id) VALUES(t_start, t_end, m_date, s_id);
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS edit_match //
CREATE PROCEDURE edit_match
(IN t_start TIME, 
 IN t_end TIME, 
 IN m_date DATE,
 IN rem VARCHAR(200),
 IN m_id INT(11))
BEGIN
	UPDATE sport_match SET time_start = t_start, time_end = t_end, match_date = m_date, remarks = rem 
	WHERE match_id = m_id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS edit_team_ranking_in_match //
CREATE PROCEDURE edit_team_ranking_in_match
(IN rank INT(11), 
 IN m_id INT(11),
 IN t_id INT(11))
BEGIN
	UPDATE team_in_match SET ranking = rank WHERE match_id = m_id AND team_id = t_id;
END //
DELIMITER ;

GRANT EXECUTE ON PROCEDURE view_match TO organizer;
GRANT EXECUTE ON PROCEDURE view_match TO administrator;
GRANT EXECUTE ON PROCEDURE view_match TO competitor;
GRANT EXECUTE ON PROCEDURE view_match TO guest;

GRANT EXECUTE ON PROCEDURE add_match TO organizer;
GRANT EXECUTE ON PROCEDURE add_match TO administrator;

GRANT EXECUTE ON PROCEDURE edit_match TO organizer;
GRANT EXECUTE ON PROCEDURE edit_match TO administrator;

GRANT EXECUTE ON PROCEDURE edit_team_ranking_in_match TO organizer;
GRANT EXECUTE ON PROCEDURE edit_team_ranking_in_match TO administrator;
