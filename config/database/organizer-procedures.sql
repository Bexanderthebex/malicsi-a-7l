USE malicsi;

DROP procedure IF EXISTS search_organizer;
DELIMITER //

	CREATE PROCEDURE search_organizer (IN search VARCHAR(100)) 
	BEGIN
	   SELECT * FROM organizer where name like search or description like search;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_organizer;
DELIMITER //

	CREATE PROCEDURE get_organizer (IN search INT) 
	BEGIN
	   SELECT * FROM organizer where id = search;
	END; //

DELIMITER ;

DROP procedure IF EXISTS edit_organizer;
DELIMITER //

	CREATE PROCEDURE edit_organizer (IN name VARCHAR(50), IN description VARCHAR(100), IN id INT) 
	BEGIN
	   UPDATE organizer SET name = name, description = description WHERE id = id;
	END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

	CREATE PROCEDURE find_game (IN userID INT) 
	BEGIN
	   SELECT * from game WHERE game.organizer_id = userID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

	CREATE PROCEDURE find_sport (IN gameID INT) 
	BEGIN
	   SELECT * from sport WHERE sport.game_id = gameID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

	CREATE PROCEDURE find_team (IN teamID INT) 
	BEGIN
	   SELECT * from team WHERE team.sport_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

	CREATE PROCEDURE get_request (IN teamID INT) 
	BEGIN
	   SELECT * from team WHERE team_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

	CREATE PROCEDURE accept_request (IN teamID INT) 
	BEGIN
	   UPDATE team SET pending_participation = TRUE WHERE team_id =teamID;
	END; //

DELIMITER ;

grant execute on procedure find_game to organizer;
grant execute on procedure find_sport to organizer;
grant execute on procedure find_team to organizer;
grant execute on procedure get_request to organizer;
grant execute on procedure accept_request to organizer;
grant execute on procedure accept_request to organizer;
grant execute on procedure find_game to admin;
grant execute on procedure find_sport to admin;
grant execute on procedure find_team to admin;
grant execute on procedure get_request to admin;
grant execute on procedure accept_request to admin;
grant execute on procedure accept_request to admin;
grant execute on procedure find_game to guest;
grant execute on procedure find_sport to guest;
grant execute on procedure find_team to guest;
