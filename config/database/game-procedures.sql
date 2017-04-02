DELIMITER //
CREATE PROCEDURE `delete_game`(in gameID int)
BEGIN
	DELETE FROM game WHERE game_id = gameID;
END 
//
DELIMITER ;

grant execute on procedure delete_game to organizer;
grant execute on procedure delete_game to administrator;

DELIMITER //
CREATE PROCEDURE `create_game`(
	in organizer_id INT,
	in name VARCHAR(50),
	in start_date DATE,
	in end_date DATE,
	in location VARCHAR(100),
	in description TEXT
	)
BEGIN
	INSERT INTO game(organizer_id, name, start_date, end_date, location, description, overall_winner) values(organizer_id, name, start_date, end_date, location, description, NULL);
END 
//
DELIMITER ;

grant execute on procedure create_game to organizer;
grant execute on procedure create_game to administrator;

DELIMITER //
CREATE PROCEDURE `update_game`(
in gameID int,
in namae VARCHAR(50),
in start DATE,
in end DATE,
in location VARCHAR(100),
in descr TEXT)
BEGIN
	UPDATE game SET name = namae, start_date = start, end_date = end, location = location, description = descr WHERE game_id = gameID;
END 
//
DELIMITER ;

grant execute on procedure update_game to organizer;
grant execute on procedure update_game to administrator;
