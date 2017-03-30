DELIMITER //
CREATE PROCEDURE view_match_sport(IN  s_id INT)
BEGIN 
SELECT * FROM sport_match where sport_id = s_id;
END //
DELIMITER ;

GRANT EXECUTE ON PROCEDURE view_match_sport TO administrator;
GRANT EXECUTE ON PROCEDURE view_match_sport TO organizer;
GRANT EXECUTE ON PROCEDURE view_match_sport TO competitor;
GRANT EXECUTE ON PROCEDURE view_match_sport TO guest;