delimiter //
create procedure addSponsorToGame(in game_id int, in sponsor_id int)
BEGIN
	INSERT into sponsor_games values (sponsor_id, game_id);
END;
//
delimiter ;


delimiter //
CREATE PROCEDURE editSponsorDetails (IN descr TEXT, IN spon_id INT)
BEGIN
	UPDATE sponsor_institution SET description = descr WHERE sponsor_id = spon_id;
END//
delimiter ;

delimiter //
CREATE PROCEDURE deleteSponsorFromGame (IN spon_id INT, IN g_id INT)
BEGIN
	DELETE FROM sponsor_institution WHERE sponsor_id = spon_id AND game_id = g_id;
END//
delimiter ;

grant execute on procedure addSponsorToGame to organizer;
grant execute on procedure addSponsorToGame to administrator;
grant execute on procedure editSponsorDetails to organizer;
grant execute on procedure editSponsorDetails to administrator;
grant execute on procedure deleteSponsorFromGame to organizer;
grant execute on procedure deletSponsorFromGame to administrator;
