DELIMITER //
CREATE PROCEDURE add_sponsor_to_game(IN game_id INT,  IN sponsor_id INT)
BEGIN
	INSERT INTO sponsor_games VALUES (sponsor_id, game_id);
END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE edit_sponsor_details (IN descr TEXT, IN spon_id INT)
BEGIN
	UPDATE sponsor_institution SET description = descr WHERE sponsor_id = spon_id;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE delete_sponsor_from_game (IN spon_id INT, IN g_id INT)
BEGIN
	DELETE FROM sponsor_institution WHERE sponsor_id = spon_id AND game_id = g_id;
END//
DELIMITER ;

GRANT EXECUTE ON PROCEDURE add_sponsor_to_game TO organizer;
GRANT EXECUTE ON PROCEDURE add_sponsor_to_game TO administrator;
GRANT EXECUTE ON PROCEDURE edit_sponsor_details TO organizer;
GRANT EXECUTE ON PROCEDURE edit_sponsor_details TO administrator;
grant execute on procedure delete_sponsor_from_game to organizer;
grant execute on procedure delete_sponsor_from_game to administrator;
