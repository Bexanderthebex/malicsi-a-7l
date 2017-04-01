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
	CREATE PROCEDURE view_all_match()
	BEGIN
		SELECT * FROM sport_match;
	END;
	//
DELIMITER ;


GRANT EXECUTE ON PROCEDURE view_match_sport TO administrator;
GRANT EXECUTE ON PROCEDURE view_match_sport TO organizer;
GRANT EXECUTE ON PROCEDURE view_match_sport TO competitor;
GRANT EXECUTE ON PROCEDURE view_match_sport TO guest;

GRANT EXECUTE ON PROCEDURE view_match_details TO administrator;
GRANT EXECUTE ON PROCEDURE view_match_details TO organizer;
GRANT EXECUTE ON PROCEDURE view_match_details TO competitor;
GRANT EXECUTE ON PROCEDURE view_match_details TO guest;

GRANT EXECUTE ON PROCEDURE view_all_match TO administrator;
GRANT EXECUTE ON PROCEDURE view_all_match TO organizer;
GRANT EXECUTE ON PROCEDURE view_all_match TO competitor;
GRANT EXECUTE ON PROCEDURE view_all_match TO guest;
