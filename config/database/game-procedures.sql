USE malicsi;

DROP PROCEDURE IF EXISTS create_game;
DELIMITER //
CREATE PROCEDURE create_game(
	IN organizer_id_in INT,
	IN name_in VARCHAR(50),
	IN start_date_in DATE,
	IN end_date_in DATE,
	IN location_in VARCHAR(100),
	IN description_in TEXT
	)
BEGIN
	INSERT INTO game(organizer_id, name, start_date, end_date, location, description, overall_winner) values(organizer_id_in, name_in, start_date_in, end_date_in, location_in, description_in, NULL);
END 
//
DELIMITER ;

DROP PROCEDURE IF EXISTS update_game;
DELIMITER //
CREATE PROCEDURE update_game(
	IN game_id_in int,
	IN name_in VARCHAR(50),
	IN start_in DATE,
	IN end_in DATE,
	IN location_in VARCHAR(100),
	IN descr_in TEXT)
BEGIN
	UPDATE game SET name = name_in, start_date = start_in, end_date = end_in, location = location_in, description = descr_in WHERE game_id = game_id_in;
END 
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_game_details;
DELIMITER //
CREATE PROCEDURE view_game_details(IN game_id_in INT)
BEGIN
	select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game.game_id = game_id_in;
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_last_inserted_game;
DELIMITER //
CREATE PROCEDURE view_last_inserted_game()
BEGIN
	SELECT * FROM game 
	WHERE game_id = (SELECT LAST_INSERT_ID());
END; //
DELIMITER ;


DROP PROCEDURE IF EXISTS view_all_sports_in_game;
delimiter //
CREATE PROCEDURE view_all_sports_in_game(in in_game_id int)
BEGIN
	select sport_name, mechanics, winner,time_start, time_end, start_date, end_date, scoring_system from sport where game_id = in_game_id;
END;
//
delimiter ;

DROP PROCEDURE IF EXISTS view_all_upcoming_ongoing_games;
delimiter //
CREATE PROCEDURE view_all_upcoming_ongoing_games()
BEGIN
	select * from game where (start_date <= now() and end_date >= now()) or (start_date >= now() and end_date >= now());
END//
delimiter ;


DROP PROCEDURE IF EXISTS count_game_organizer;
DELIMITER //
	CREATE PROCEDURE count_game_organizer(IN organizer_id_in INT(11))
	BEGIN
		SELECT COUNT(game_id) FROM game WHERE organizer_id = organizer_id_in;
	END;
	//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_game;
DELIMITER //
CREATE PROCEDURE delete_game(IN game_id_in INT)
BEGIN
	DELETE FROM game WHERE game_id = game_id_in;
END 
//
DELIMITER ;

DROP PROCEDURE IF EXISTS search_for_game_by_keyword;
DELIMITER //
CREATE PROCEDURE search_for_game_by_keyword(in keyword varchar(50))
BEGIN
	select * from game where game.name like keyword;
END;
//
DELIMITER ;

-- create game
GRANT EXECUTE ON PROCEDURE create_game TO organizer;
GRANT EXECUTE ON PROCEDURE create_game TO administrator;

-- update game
GRANT EXECUTE ON PROCEDURE update_game TO organizer;
GRANT EXECUTE ON PROCEDURE update_game TO administrator;


-- view last inserted game
GRANT EXECUTE ON PROCEDURE view_last_inserted_game TO organizer;
GRANT EXECUTE ON PROCEDURE view_last_inserted_game TO administrator;
GRANT EXECUTE ON PROCEDURE view_last_inserted_game TO competitor;
GRANT EXECUTE ON PROCEDURE view_last_inserted_game TO guest;

-- view game details
GRANT EXECUTE ON PROCEDURE view_game_details TO organizer;
GRANT EXECUTE ON PROCEDURE view_game_details TO administrator;
GRANT EXECUTE ON PROCEDURE view_game_details TO competitor;
GRANT EXECUTE ON PROCEDURE view_game_details TO guest;

-- view all sports in game
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO organizer;
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO competitor;
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO administrator;
GRANT EXECUTE ON PROCEDURE view_all_sports_in_game TO guest;

-- view all upcoming and ongoing games
GRANT EXECUTE ON PROCEDURE view_all_upcoming_ongoing_games TO organizer;
GRANT EXECUTE ON PROCEDURE view_all_upcoming_ongoing_games TO administrator;
GRANT EXECUTE ON PROCEDURE view_all_upcoming_ongoing_games TO competitor;
GRANT EXECUTE ON PROCEDURE view_all_upcoming_ongoing_games TO guest;

-- count game organizer
GRANT EXECUTE ON PROCEDURE count_game_organizer TO organizer;
GRANT EXECUTE ON PROCEDURE count_game_organizer TO administrator;
GRANT EXECUTE ON PROCEDURE count_game_organizer TO competitor;
GRANT EXECUTE ON PROCEDURE count_game_organizer TO guest;

--  delete game
GRANT EXECUTE ON PROCEDURE delete_game TO organizer;
GRANT EXECUTE ON PROCEDURE delete_game TO administrator;

-- search for game by keyword
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO organizer;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO competitor;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO administrator;
GRANT EXECUTE ON PROCEDURE search_for_game_by_keyword TO guest;
