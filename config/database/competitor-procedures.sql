USE malicsi;

DROP procedure IF EXISTS search_competitor;
DELIMITER //

	CREATE PROCEDURE search_competitor (IN search VARCHAR(30)) 
	BEGIN
	   SELECT * FROM competitor where first_name like search or last_name like search or nickname like search;
	END; //

DELIMITER ;

DROP procedure IF EXISTS get_competitor;
DELIMITER //

CREATE PROCEDURE get_competitor (IN search INT) 
	BEGIN
	   SELECT * FROM competitor where id = search;
	END; //

DELIMITER ;


DROP PROCEDURE IF EXISTS edit_competitor;
DELIMITER //
	CREATE PROCEDURE edit_competitor(in first_name VARCHAR(30), in last_name VARCHAR(30), in birthday DATE, in nickname VARCHAR(15), in sex CHAR(1), in id INT)

	BEGIN
		UPDATE competitor SET first_name = first_name, last_name = last_name, birthday = birthday, nickname = nickname, sex = sex WHERE id = id;
	END;

	//
DELIMITER ;


GRANT EXECUTE ON PROCEDURE search_competitor TO competitor;
GRANT EXECUTE ON PROCEDURE search_competitor TO admin;
GRANT EXECUTE ON PROCEDURE search_competitor TO guest;
GRANT EXECUTE ON PROCEDURE get_competitor TO competitor;
GRANT EXECUTE ON PROCEDURE get_competitor TO admin;
GRANT EXECUTE ON PROCEDURE get_competitor TO guest;
GRANT EXECUTE ON PROCEDURE edit_competitor TO competitor;
GRANT EXECUTE ON PROCEDURE edit_competitor TO admin;

