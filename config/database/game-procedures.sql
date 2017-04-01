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

DROP PROCEDURE IF EXISTS view_game_details;
delimiter //
CREATE PROCEDURE view_game_details(in game_id int)
BEGIN
	select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game.game_id = game_id;
END;
//
delimiter ;
grant execute on procedure view_game_details to organizer;
grant execute on procedure view_game_details to competitor;
grant execute on procedure view_game_details to administrator;
grant execute on procedure view_game_details to guest;


DROP PROCEDURE IF EXISTS search_for_game_by_keyword;
DELIMITER //
CREATE PROCEDURE search_for_game_by_keyword(in keyword varchar(50))
BEGIN
	select game.name, start_date, end_date, game.description, organizer.name as organizer_name from game,organizer where game.name like keyword or game.description like keyword or organizer.name like keyword;
END;
//
DELIMITER ;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO organizer;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO competitor;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO administrator;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO guest;


grant execute on procedure update_game to organizer;
grant execute on procedure update_game to administrator;
