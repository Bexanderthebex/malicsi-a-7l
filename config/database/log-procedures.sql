use malicsi;

DROP PROCEDURE IF EXISTS create_log;
DELIMITER //
	CREATE PROCEDURE create_log(in _user_id INT, in _log_msg VARCHAR(140))

	BEGIN
		INSERT INTO log(user_id,log_msg) VALUES (_user_id, _log_msg);
	END;

	//
DELIMITER ;

DROP PROCEDURE IF EXISTS get_user_logs;
DELIMITER //
	CREATE PROCEDURE get_user_logs(in cid INT)

	BEGIN
		SELECT *  FROM log user_id = cid;
	END;

	//
DELIMITER ;


DROP PROCEDURE IF EXISTS get_logs;
DELIMITER //
	CREATE PROCEDURE get_logs(in cid INT)

	BEGIN
		SELECT *  FROM log;
	END;

	//
DELIMITER ;


GRANT EXECUTE ON PROCEDURE create_log TO organizer;
GRANT EXECUTE ON PROCEDURE create_log TO administrator;
GRANT EXECUTE ON PROCEDURE create_log TO competitor;
GRANT EXECUTE ON PROCEDURE create_log TO guest;

GRANT EXECUTE ON PROCEDURE get_user_logs TO organizer;
GRANT EXECUTE ON PROCEDURE get_user_logs TO administrator;
GRANT EXECUTE ON PROCEDURE get_user_logs TO competitor;
GRANT EXECUTE ON PROCEDURE get_user_logs TO guest;

GRANT EXECUTE ON PROCEDURE get_logs TO organizer;
GRANT EXECUTE ON PROCEDURE get_logs TO administrator;
GRANT EXECUTE ON PROCEDURE get_logs TO competitor;
GRANT EXECUTE ON PROCEDURE get_logs TO guest;

