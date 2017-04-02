USE malicsi;
DROP PROCEDURE IF EXISTS edit_sport;
DELIMITER //
CREATE PROCEDURE edit_sport(in sportName varchar(50), in mechanicsInput text, in timeStart time, in timeEnd time, in startDate date, in endDate date, in sportDate date, in scoringSystem varchar(50), in sportId int(11))
	BEGIN
		UPDATE sport SET sport_name = sportName, mechanics = mechanicsInput, time_start = timeStart, time_end = timeEnd, start_end = startDate, end_date = endDate, sport_date = sportDate, scoring_system = scoringSystem WHERE sport_id = sportId;
	END;
	//
DELIMITER ;

DROP PROCEDURE IF EXISTS add_winner_sport;
DELIMITER //
CREATE PROCEDURE add_winner_sport(in winnerInput int(11), in sportId int(11))
	BEGIN
		UPDATE sport SET winner = winnerInput WHERE sport_id = sport_id;
	END;//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_sport;
DELIMITER //
	CREATE PROCEDURE delete_sport(in sportId int(11))
	BEGIN
		DELETE FROM sport WHERE sport_id = sportId;
	END;
	//
DELIMITER ;

GRANT EXECUTE ON PROCEDURE delete_sport to organizer;
GRANT EXECUTE ON PROCEDURE add_winner_sport to organizer;
GRANT EXECUTE ON PROCEDURE edit_sport to organizer;

GRANT EXECUTE ON PROCEDURE delete_sport to administrator;
GRANT EXECUTE ON PROCEDURE add_winner_sport to administrator;
GRANT EXECUTE ON PROCEDURE edit_sport to administrator;

