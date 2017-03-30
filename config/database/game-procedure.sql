delimiter //
create procedure view_game_details(in game_id int)
BEGIN
	select game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game.game_id = game_id;
END;
//
delimiter ;
grant execute on procedure view_game_details to organizer;
grant execute on procedure view_game_details to competitor;
grant execute on procedure view_game_details to administrator;
grant execute on procedure view_game_details to guest;
