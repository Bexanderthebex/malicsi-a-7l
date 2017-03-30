-- sample

delimiter //
	create procedure addCollege(in cname varchar(5), in cfullname
	varchar(40), in cyear year(4))
	BEGIN
		insert into college values(cname, cfullname, cyear);
	END;
	//
delimiter ;