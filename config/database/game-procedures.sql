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

DROP PROCEDURE IF EXISTS view_all_sports_in_game;
delimiter //
CREATE PROCEDURE view_all_sports_in_game(in in_game_id int)
BEGIN
	select sport_name, mechanics, winner,time_start, time_end,start_date,end_date, sport_date, scoring_system from sport where game_id = in_game_id;
END;
//
delimiter ;
grant execute on procedure view_all_sports_in_game to organizer;
grant execute on procedure view_all_sports_in_game to competitor;
grant execute on procedure view_all_sports_in_game to administrator;
grant execute on procedure view_all_sports_in_game to guest;

delimiter //
create procedure view_game_details(in game_id int)
BEGIN
	select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game.game_id = game_id;
END;
//
delimiter ;

delimiter //
	CREATE procedure count_game_organizer(in organizerId int(11))
	BEGIN
		SELECT COUNT(game_id) FROM game WHERE organizer_id = organizerId;
	END;
	//
delimiter ;


GRANT execute ON procedure count_game_organizer to organizer;
GRANT execute ON procedure count_game_organizer to competitor;
GRANT execute ON procedure count_game_organizer to administrator;
GRANT execute ON procedure count_game_organizer to guest;
GRANT execute ON procedure view_game_details to organizer;
GRANT execute ON procedure view_game_details to competitor;
GRANT execute ON procedure view_game_details to administrator;
GRANT execute ON procedure view_game_details to guest;

