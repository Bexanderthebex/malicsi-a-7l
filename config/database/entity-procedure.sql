-- sample

delimiter //
create procedure register_user(in uname varchar(50)), in pword varchar(60), in email varchar(254), in cnumber varchar(15), in type char(1))
BEGIN
	insert into user (username, password, email, contact, type, is_active) values(uname, pword, email, cnumber, type, 'true');
END;
//
delimiter ;
grant execute on procedure register_user to administrator;
grant execute on procedure register_user to competitor;
grant execute on procedure register_user to guest;
grant execute on procedure register_user to organizer;