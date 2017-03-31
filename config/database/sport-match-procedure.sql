DELIMITER //
CREATE PROCEDURE view_match_sport(IN  s_id INT)
BEGIN 
SELECT * FROM sport_match where sport_id = s_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE view_match_details(IN in_match_id INT)
BEGIN
	SELECT * FROM sport_match WHERE match_id = in_match_id;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE delete_match (in matchID int)
BEGIN
DELETE FROM team_in_match WHERE match_id = matchID;
DELETE FROM sport_match WHERE match_id = matchID;
END //
DELIMITER ;

grant execute on procedure delete_match to organizer;
grant execute on procedure delete_match to administrator;


GRANT EXECUTE ON PROCEDURE view_match_sport TO administrator;
GRANT EXECUTE ON PROCEDURE view_match_sport TO organizer;
GRANT EXECUTE ON PROCEDURE view_match_sport TO competitor;
GRANT EXECUTE ON PROCEDURE view_match_sport TO guest;

GRANT EXECUTE ON PROCEDURE view_match_details TO administrator;
GRANT EXECUTE ON PROCEDURE view_match_details TO organizer;
GRANT EXECUTE ON PROCEDURE view_match_details TO competitor;
GRANT EXECUTE ON PROCEDURE view_match_details TO guest;
