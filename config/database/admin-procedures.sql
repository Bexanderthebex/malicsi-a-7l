USE malicsi;

DROP PROCEDURE IF EXISTS update_activity;
DELIMITER //
CREATE PROCEDURE update_activity(
		in _is_active BOOLEAN,
		in _id INT
	)

	BEGIN
		UPDATE user SET is_active = _is_active WHERE id = _id;
	END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS create_organizer;
DELIMITER //
CREATE PROCEDURE create_organizer(
	in _id INT,
	in _name VARCHAR(50),
	in _description VARCHAR(100)
)
	BEGIN
		INSERT INTO organizer (id, name, description) values (_id, _name, _description);
	END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS search_admin;
DELIMITER //
CREATE PROCEDURE search_admin(
	in _keyword VARCHAR(100)
)
	BEGIN
		SELECT id, username, email, contact, is_active FROM user WHERE (username LIKE _keyword OR email LIKE _keyword) AND type='A';
	END;
//
DELIMITER //


grant execute on procedure update_activity to 'administrator'@'%';
grant execute on procedure search_admin to 'administrator'@'%';
grant execute on procedure create_organizer to 'administrator'@'%';
