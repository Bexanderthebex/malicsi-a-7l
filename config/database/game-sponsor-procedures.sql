USE malicsi;

DROP PROCEDURE IF EXISTS add_sponsor_to_game;
DELIMITER //
CREATE PROCEDURE add_sponsor_to_game(IN game_id INT,  IN sponsor_id INT)
BEGIN
	INSERT INTO sponsor_games VALUES (sponsor_id, game_id);
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_sponsors_in_game;
DELIMITER //
CREATE PROCEDURE view_all_sponsors_in_game(IN g_id INT)
BEGIN
	SELECT spon.name 
	FROM  sponsor_institution AS spon 
	JOIN sponsor_games AS spon_game 
	ON spon.sponsor_id = spon_game.sponsor_id 
	WHERE spon_game.game_id = g_id;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_sponsor;
DELIMITER //
CREATE PROCEDURE view_sponsor_in_sport(IN s_id INT)
BEGIN
	SELECT spon.name
	FROM  sponsor_institution AS spon 
	JOIN sport JOIN sponsor_games AS spon_game 
	ON spon.sponsor_id = spon_game.sponsor_id AND sport.game_id = spon_game.game_id 
	WHERE sport.sport_id = s_id AND spon_game.game_id = sport.game_id;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_sponsor;
DELIMITER //
CREATE PROCEDURE view_sponsor(IN spon_id INT)
BEGIN
	SELECT * FROM sponsor_institution WHERE sponsor_id = spon_id;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_sponsor_details;
DELIMITER //
CREATE PROCEDURE edit_sponsor_details(IN descr TEXT, IN spon_id INT)
BEGIN
	UPDATE sponsor_institution SET description = descr WHERE sponsor_id = spon_id;
END//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_sponsor_from_game;
DELIMITER //
CREATE PROCEDURE delete_sponsor_from_game (IN spon_id INT)
BEGIN
	DELETE FROM sponsor_institution WHERE sponsor_id = spon_id;
END//
DELIMITER ;


DROP PROCEDURE IF EXISTS view_last_inserted_sponsor;
DELIMITER //
CREATE PROCEDURE view_last_inserted_sponsor()
BEGIN
	SELECT * FROM sponsor_games
	WHERE sponsor_id = (SELECT LAST_INSERT_ID());
END; //
DELIMITER ;

GRANT EXECUTE ON PROCEDURE add_sponsor_to_game TO organizer;
GRANT EXECUTE ON PROCEDURE add_sponsor_to_game TO administrator;

GRANT EXECUTE ON PROCEDURE edit_sponsor_details TO organizer;
GRANT EXECUTE ON PROCEDURE edit_sponsor_details TO administrator;

GRANT EXECUTE ON PROCEDURE delete_sponsor_from_game TO organizer;
GRANT EXECUTE ON PROCEDURE delete_sponsor_from_game TO administrator;

GRANT EXECUTE ON PROCEDURE view_last_inserted_sponsor TO organizer;
GRANT EXECUTE ON PROCEDURE view_last_inserted_sponsor TO administrator;

GRANT EXECUTE ON PROCEDURE view_all_sponsors_in_game TO organizer;
GRANT EXECUTE ON PROCEDURE view_all_sponsors_in_game TO administrator;
GRANT EXECUTE ON PROCEDURE view_all_sponsors_in_game TO competitor;
GRANT EXECUTE ON PROCEDURE view_all_sponsors_in_game TO guest;

GRANT EXECUTE ON PROCEDURE view_sponsor TO organizer;
GRANT EXECUTE ON PROCEDURE view_sponsor TO administrator;
GRANT EXECUTE ON PROCEDURE view_sponsor TO competitor;
GRANT EXECUTE ON PROCEDURE view_sponsor TO guest;
