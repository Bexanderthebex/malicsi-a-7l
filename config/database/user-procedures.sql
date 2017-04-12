USE malicsi;

DROP procedure IF EXISTS create_user;
DELIMITER //
CREATE PROCEDURE create_user(
		in _username VARCHAR(50),
		in _password VARCHAR(60),
		in _email VARCHAR(254),
		in _contact VARCHAR(15),
		in _type CHAR(1)
	)

	BEGIN
		INSERT INTO user (username, password, email, contact, type, is_active) values (_username, _password, _email, _contact, _type, 1);
	END;
//
DELIMITER ;


DROP procedure IF EXISTS create_competitor;
DELIMITER //
CREATE PROCEDURE create_competitor(
		in _id INT,
		in _birthday DATE,
		in _first_name VARCHAR(30),
		in _last_name VARCHAR(30),
		in _nickname VARCHAR(15),
		in _sex CHAR(1)
	)

	BEGIN
		INSERT INTO competitor (id, birthday, first_name, last_name, nickname, sex) values (_id, _birthday, _first_name, _last_name, _nickname, _sex);
	END;
//
DELIMITER ;

DROP procedure IF EXISTS select_user;
DELIMITER //
CREATE PROCEDURE select_user(
		in _id INT
	)

	BEGIN
		SELECT id, username, contact, email, is_active, type from user WHERE id = _id;
	END;
//
DELIMITER ;

DROP procedure IF EXISTS select_user_with_password_from_username;
DELIMITER //
CREATE PROCEDURE select_user_with_password_from_username(
		in _username VARCHAR(50)
	)

	BEGIN
		SELECT * FROM user WHERE username = _username;
	END;
//
DELIMITER ;

DROP procedure IF EXISTS select_user_from_username;
DELIMITER //
CREATE PROCEDURE select_user_from_username(
		in _username VARCHAR(50)
	)

	BEGIN
		SELECT * FROM user WHERE username = _username;
	END;
//
DELIMITER ;

DROP procedure IF EXISTS update_user;
DELIMITER //
CREATE PROCEDURE update_user(
		in _username VARCHAR(50),
		in _email VARCHAR(254),
		in _contact VARCHAR(15),
		in _id INT
	)

	BEGIN
		UPDATE user SET username = _username, email = _email, contact = _contact WHERE id = _id;
	END;
//
DELIMITER ;

DROP procedure IF EXISTS update_user_password;
DELIMITER //
CREATE PROCEDURE update_user_password(
		in _password VARCHAR(60),
		in _id INT
	)

	BEGIN
		UPDATE user SET password = _password WHERE id = _id;
	END;
//
DELIMITER ;

grant execute on procedure create_competitor to competitor;
grant execute on procedure update_user to competitor;
grant execute on procedure select_user to competitor;

grant execute on procedure create_user to administrator;
grant execute on procedure create_competitor to administrator;
grant execute on procedure select_user to administrator;
grant execute on procedure update_user to administrator;

grant execute on procedure select_user to guest;
grant execute on procedure select_user to organizer;
