USE malicsi;

DELIMITER //
DROP PROCEDURE IF EXISTS view_sport //
CREATE PROCEDURE view_sport (IN s_id INT(11))
BEGIN
	SELECT * FROM sport 
	WHERE sport_id = s_id;
END //
DELIMITER ;

DELIMITER //
DROP PROCEDURE IF EXISTS view_last_inserted_sport //
CREATE PROCEDURE view_last_inserted_sport ()
BEGIN
	SELECT * FROM sport 
	WHERE sport_id = (SELECT LAST_INSERT_ID());
END //
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
	INSERT INTO sport(sport_name, mechanics, time_start, time_end, start_date, end_date, max_teams, scoring_system, game_id) 
	VALUES(s_name, mech, t_start, t_end, s_date, e_date, max_t, score_sys, g_id);
END //
DELIMITER ;

GRANT EXECUTE ON PROCEDURE view_sport TO organizer;
GRANT EXECUTE ON PROCEDURE view_sport TO administrator;
GRANT EXECUTE ON PROCEDURE view_sport TO competitor;
GRANT EXECUTE ON PROCEDURE view_sport TO guest;

GRANT EXECUTE ON PROCEDURE create_sport TO organizer;
GRANT EXECUTE ON PROCEDURE create_sport TO administrator;
