USE malicsi;

DROP procedure IF EXISTS search_organizer;
DELIMITER //

	CREATE PROCEDURE search_organizer (IN search VARCHAR(100))
	BEGIN
	   SELECT user.id, username, name, description, is_active FROM user
	   JOIN organizer ON user.id = organizer.id
	   WHERE username LIKE search OR name LIKE search OR description LIKE search;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_organizer;
DELIMITER //

	CREATE PROCEDURE get_organizer (IN search INT)
	BEGIN
	   SELECT user.id, user.username, user.email, user.contact, user.type, user.is_active, organizer.name, organizer.description
	   FROM user join organizer using(id) where id = search;
	END; //

DELIMITER ;

DROP procedure IF EXISTS edit_organizer;
DELIMITER //

	CREATE PROCEDURE edit_organizer (IN nme VARCHAR(50), IN descr VARCHAR(100), IN ido INT)
	BEGIN
	   UPDATE organizer SET name = nme, description = descr WHERE id = ido;
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
	   UPDATE team SET pending_participation = 0 WHERE team_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS delete_team;
DELIMITER //

	CREATE PROCEDURE delete_team (IN teamID INT)
	BEGIN
	   DELETE from team WHERE team_id = teamID;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_pending_participation;
DELIMITER //

	CREATE PROCEDURE get_pending_participation (IN id INT)
	BEGIN
	    SELECT *,
	    (SELECT COUNT(team_id) FROM team WHERE sport_id = sport.sport_id and pending_participation = 0)team_count
	    FROM (sport JOIN game using (game_id))
	    JOIN team using (sport_id)
	    WHERE pending_participation = 1 and organizer_id = id;

	END; //

DELIMITER ;






grant execute on procedure search_organizer to 'organizer'@'localhost';
grant execute on procedure search_organizer to 'administrator'@'localhost';
grant execute on procedure search_organizer to 'competitor'@'localhost';
grant execute on procedure search_organizer to 'guest'@'localhost';

grant execute on procedure edit_organizer to 'organizer'@'localhost';
grant execute on procedure edit_organizer to 'administrator'@'localhost';

grant execute on procedure get_organizer to 'organizer'@'localhost';
grant execute on procedure get_organizer to 'competitor'@'localhost';
grant execute on procedure get_organizer to 'guest'@'localhost';
grant execute on procedure get_organizer to 'administrator'@'localhost';

grant execute on procedure get_request to 'administrator'@'localhost';
grant execute on procedure get_request to 'organizer'@'localhost';

grant execute on procedure get_pending_participation to 'organizer'@'localhost';
grant execute on procedure get_pending_participation to 'administrator'@'localhost';

grant execute on procedure process_request to 'organizer'@'localhost';
grant execute on procedure process_request to 'administrator'@'localhost';

grant execute on procedure find_game to 'administrator'@'localhost';
grant execute on procedure find_game to 'organizer'@'localhost';
grant execute on procedure find_game to 'competitor'@'localhost';
grant execute on procedure find_game to 'guest'@'localhost';

grant execute on procedure delete_team to 'administrator'@'localhost';
grant execute on procedure delete_team to 'competitor'@'localhost';

grant execute on procedure find_sport to 'organizer'@'localhost';
grant execute on procedure find_sport to 'competitor'@'localhost';
grant execute on procedure find_sport to 'administrator'@'localhost';
grant execute on procedure find_sport to 'guest'@'localhost';

grant execute on procedure find_team to 'organizer'@'localhost';
grant execute on procedure find_team to 'competitor'@'localhost';
grant execute on procedure find_team to 'administrator'@'localhost';
grant execute on procedure find_team to 'guest'@'localhost';
