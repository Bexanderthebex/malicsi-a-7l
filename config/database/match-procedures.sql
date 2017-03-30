delimiter //
create procedure view_match_details(in in_match_id int)
BEGIN
	select * from sport_match where match_id = in_match_id;
END;
//
delimiter ;
grant execute on procedure view_match_details to organizer;
grant execute on procedure view_match_details to competitor;
grant execute on procedure view_match_details to administrator;
grant execute on procedure view_match_details to guest;