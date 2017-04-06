USE malicsi;

DROP PROCEDURE IF EXISTS search_competitor;
DELIMITER //

	CREATE PROCEDURE search_competitor (IN search VARCHAR(30)) 
	BEGIN
	   SELECT * FROM competitor WHERE first_name LIKE search OR last_name LIKE search OR nickname LIKE search;
	END; //

DELIMITER ;

DROP PROCEDURE IF EXISTS get_competitor;
DELIMITER //

CREATE PROCEDURE get_competitor (IN search INT) 
	BEGIN
	   SELECT * FROM competitor WHERE id = search;
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS edit_competitor;
DELIMITER //
	CREATE PROCEDURE edit_competitor(IN bday DATE, IN fname VARCHAR(30), IN lname VARCHAR(30), IN nname VARCHAR(15), IN sx CHAR(1), IN cid INT)

	BEGIN
		UPDATE competitor SET  birthday = bday, first_name = fname, last_name = lname, nickname = nname, sex = sx WHERE id = cid;
	END;

	//
DELIMITER ;

DROP PROCEDURE IF EXISTS edit_competitor_bio;
DELIMITER //
	CREATE PROCEDURE edit_competitor_bio(IN bio_in TEXT, IN cid INT)

	BEGIN
		UPDATE competitor SET bio = bio_in WHERE id = cid;
	END;

	//
DELIMITER ;

DROP PROCEDURE IF EXISTS get_competitor_teams;
DELIMITER //
	CREATE PROCEDURE get_competitor_teams(in id INT)

	BEGIN
		SELECT *  FROM (competitor JOIN competitor_joins_team using (id)) JOIN team using (team_id) where competitor.id = id;
	END;

	//
DELIMITER ;

GRANT EXECUTE ON PROCEDURE search_competitor TO competitor;
GRANT EXECUTE ON PROCEDURE search_competitor TO administrator;
GRANT EXECUTE ON PROCEDURE search_competitor TO guest;
GRANT EXECUTE ON PROCEDURE get_competitor TO competitor;
GRANT EXECUTE ON PROCEDURE get_competitor TO organizer;
GRANT EXECUTE ON PROCEDURE get_competitor TO administrator;
GRANT EXECUTE ON PROCEDURE get_competitor TO guest;
GRANT EXECUTE ON PROCEDURE edit_competitor TO competitor;
GRANT EXECUTE ON PROCEDURE edit_competitor TO administrator;
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO administrator;
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO organizer;
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO competitor;
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO guest;
GRANT EXECUTE ON PROCEDURE edit_competitor_bio TO administrator;
GRANT EXECUTE ON PROCEDURE edit_competitor_bio TO competitor;


