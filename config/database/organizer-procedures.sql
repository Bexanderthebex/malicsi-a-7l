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
	   SELECT * FROM user join organizer using(id) where id = search;
	END; //

DELIMITER ;

DROP procedure IF EXISTS edit_organizer;
DELIMITER //

	CREATE PROCEDURE edit_organizer (IN name VARCHAR(50), IN description VARCHAR(100), IN id INT) 
	BEGIN
	   UPDATE organizer SET name = name, description = description WHERE id = id;
	END; //

DELIMITER ;

DROP procedure IF EXISTS find_game;
DELIMITER //

	CREATE PROCEDURE find_game (IN userID INT) 
	BEGIN
	   SELECT * from game WHERE game.organizer_id = userID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS find_sport;
DELIMITER //

	CREATE PROCEDURE find_sport (IN gameID INT) 
	BEGIN
	   SELECT * from sport WHERE sport.game_id = gameID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS find_team;
DELIMITER //

	CREATE PROCEDURE find_team (IN teamID INT) 
	BEGIN
	   SELECT * from team WHERE team.sport_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_request;
DELIMITER //

	CREATE PROCEDURE get_request (IN teamID INT) 
	BEGIN
	   SELECT * from team WHERE team_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS process_request;
DELIMITER //

	CREATE PROCEDURE process_request (IN teamID INT) 
	BEGIN
	   UPDATE team SET pending_participation = 1 WHERE team_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS delete_team;
DELIMITER //

	CREATE PROCEDURE delete_team (IN teamID INT) 
	BEGIN
	   DELETE team WHERE team_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_pending_participation;
DELIMITER //

	CREATE PROCEDURE get_pending_participation (IN id INT) 
	BEGIN
	   SELECT * from (sport join game using (game_id)) JOIN team using (sport_id) WHERE pending_participation = 1 AND organizer_id = id;
	END; //

DELIMITER ;






grant execute on procedure search_organizer to organizer;
grant execute on procedure search_organizer to administrator;
grant execute on procedure search_organizer to competitor;
grant execute on procedure search_organizer to guest;

grant execute on procedure edit_organizer to organizer;
grant execute on procedure edit_organizer to administrator;

grant execute on procedure get_organizer to organizer;
grant execute on procedure get_organizer to competitor;
grant execute on procedure get_organizer to guest;
grant execute on procedure get_organizer to administrator;
grant execute on procedure get_request to administrator;
grant execute on procedure get_request to organizer;
grant execute on procedure get_pending_participation to organizer;
grant execute on procedure get_pending_participation to administrator;

grant execute on procedure process_request to organizer;
grant execute on procedure process_request to administrator;

grant execute on procedure delete_team to administrator;
grant execute on procedure delete_team to competitor;

grant execute on procedure find_game to organizer;
grant execute on procedure find_game to competitor;
grant execute on procedure find_game to administrator;
grant execute on procedure find_game to guest;
grant execute on procedure find_sport to organizer;
grant execute on procedure find_sport to competitor;
grant execute on procedure find_sport to administrator;
grant execute on procedure find_sport to guest;
grant execute on procedure find_team to organizer;
grant execute on procedure find_team to competitor;
grant execute on procedure find_team to administrator;
grant execute on procedure find_team to guest;
