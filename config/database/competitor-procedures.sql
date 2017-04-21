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
	   SELECT user.id, user.username, user.email, user.contact, user.type, user.is_active,
	   competitor.birthday, competitor.first_name, competitor.last_name, competitor.nickname, competitor.sex, competitor.bio
	   FROM user join competitor using(id) where id = search;
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
	CREATE PROCEDURE get_competitor_teams(in cid INT)

	BEGIN
		SELECT * FROM competitor JOIN competitor_joins_team using (id) JOIN team using (team_id) JOIN sport using (sport_id) JOIN game using (game_id) where competitor.id = cid;
	END;

	//
DELIMITER ;


DROP PROCEDURE IF EXISTS get_competitor_ranking;
DELIMITER //
	CREATE PROCEDURE get_competitor_ranking(in id_in INT)

	BEGIN
		SELECT ranking, COUNT(ranking) AS rankCount FROM team JOIN team_in_match using (team_id) WHERE id = id_in GROUP BY ranking;
	END;

	//
DELIMITER ;


DROP PROCEDURE IF EXISTS get_competitor_organization;
DELIMITER //
	CREATE PROCEDURE get_competitor_organization(in id_in INT)

	BEGIN
		SELECT * FROM competitor JOIN competitor_joins_team using (id) JOIN team using (team_id) JOIN organization where competitor.id = id_in && organization_id=team_organization;
	END;

	//
DELIMITER ;





GRANT EXECUTE ON PROCEDURE search_competitor TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE search_competitor TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE search_competitor TO 'guest'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor TO 'guest'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_competitor TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_competitor TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_teams TO 'guest'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_competitor_bio TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE edit_competitor_bio TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_ranking TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_ranking TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_ranking TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE get_competitor_ranking TO 'guest'@'localhost';
