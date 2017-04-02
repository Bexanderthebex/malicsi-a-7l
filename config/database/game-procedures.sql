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

DROP PROCEDURE IF EXISTS search_for_game_by_keyword;
DELIMITER //
CREATE PROCEDURE search_for_game_by_keyword(in keyword varchar(50))
BEGIN
	select game.name, start_date, end_date, game.description, organizer.name as organizer_name from game,organizer where game.name like keyword or game.description like keyword or organizer.name like keyword;
END;
//
DELIMITER ;

-- search for game by keyword
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO organizer;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO competitor;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO administrator;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO guest;

-- create game
GRANT EXECUTE ON PROCEDURE create_game TO organizer;
GRANT EXECUTE ON PROCEDURE create_game TO administrator;

--  delete game
GRANT EXECUTE ON PROCEDURE delete_game TO organizer;
GRANT EXECUTE ON PROCEDURE delete_game TO administrator;

-- update game
GRANT EXECUTE ON PROCEDURE update_game TO organizer;
GRANT EXECUTE ON PROCEDURE update_game TO administrator;

-- count game organizer
GRANT EXECUTE ON PROCEDURE count_game_organizer TO organizer;
GRANT EXECUTE ON PROCEDURE count_game_organizer TO administrator;
GRANT EXECUTE ON PROCEDURE count_game_organizer TO competitor;
GRANT EXECUTE ON PROCEDURE count_game_organizer TO guest;

-- view game details
GRANT EXECUTE ON PROCEDURE view_game_details TO organizer;
GRANT EXECUTE ON PROCEDURE view_game_details TO administrator;
GRANT EXECUTE ON PROCEDURE view_game_details TO competitor;
GRANT EXECUTE ON PROCEDURE view_game_details TO guest;

GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO organizer;
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO competitor;
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO administrator;
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO guest;

