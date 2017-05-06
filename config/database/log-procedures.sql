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
		SELECT log_id, user_id, username, log_msg, date_created FROM log JOIN user ON user.id = log.user_id WHERE user_id = cid;
	END;

	//
DELIMITER ;


DROP PROCEDURE IF EXISTS get_logs;
DELIMITER //
	CREATE PROCEDURE get_logs()

	BEGIN
		SELECT log_id, user_id, username, log_msg, date_created FROM log JOIN user ON user.id = log.user_id;
	END;

	//
DELIMITER ;

DROP PROCEDURE IF EXISTS search_logs;
DELIMITER //
	CREATE PROCEDURE search_logs(in _username VARCHAR(50), in _start_date DATETIME, in _end_date DATETIME)

	BEGIN
		SELECT log_id, user_id, username, log_msg, date_created
		FROM log JOIN user ON user.id = log.user_id
		WHERE (_username IS NULL OR username LIKE _username)
			AND (_start_date IS NULL OR _end_date IS NULL OR date_created BETWEEN _start_date AND _end_date);
	END;

	//
DELIMITER ;

GRANT EXECUTE ON PROCEDURE create_log TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE create_log TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE create_log TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE create_log TO 'guest'@'localhost';

GRANT EXECUTE ON PROCEDURE get_user_logs TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE get_user_logs TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE get_user_logs TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE get_user_logs TO 'guest'@'localhost';

GRANT EXECUTE ON PROCEDURE get_logs TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE get_logs TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE get_logs TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE get_logs TO 'guest'@'localhost';

GRANT EXECUTE ON PROCEDURE search_logs TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE search_logs TO 'administrator'@'localhost';
GRANT EXECUTE ON PROCEDURE search_logs TO 'competitor'@'localhost';
GRANT EXECUTE ON PROCEDURE search_logs TO 'guest'@'localhost';
