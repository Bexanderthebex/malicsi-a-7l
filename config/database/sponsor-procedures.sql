delimiter //
create procedure addSponsorToGame(in game_id int, in sponsor_id int)
BEGIN
	INSERT into sponsor_games values (sponsor_id, game_id);
END;
//
delimiter ;
grant execute on procedure addSponsorToGame to organizer;
grant execute on procedure addSponsorToGame to competitor;
grant execute on procedure addSponsorToGame to administrator;
