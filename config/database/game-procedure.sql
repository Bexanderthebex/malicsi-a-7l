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
