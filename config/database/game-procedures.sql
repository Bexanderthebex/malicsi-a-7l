DROP PROCEDURE IF EXISTS create_game;
DELIMITER //
CREATE PROCEDURE create_game(
	IN organizer_id_in INT,
	IN name_in VARCHAR(50),
	IN start_date_in DATE,
	IN end_date_in DATE,
	IN location_in VARCHAR(100),
	IN description_in TEXT
	)
BEGIN
	INSERT INTO game(organizer_id, name, start_date, end_date, location, description, overall_winner) values(organizer_id_in, name_in, start_date_in, end_date_in, location_in, description_in, NULL);
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS update_game;
DELIMITER //
CREATE PROCEDURE update_game(
	IN game_id_in int,
	IN name_in VARCHAR(50),
	IN start_in DATE,
	IN end_in DATE,
	IN location_in VARCHAR(100),
	IN descr_in TEXT)
BEGIN
	UPDATE game SET name = name_in, start_date = start_in, end_date = end_in, location = location_in, description = descr_in WHERE game_id = game_id_in;
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_games;
DELIMITER //
CREATE PROCEDURE view_all_games()
BEGIN
	SELECT * FROM game;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_game_details;
DELIMITER //
CREATE PROCEDURE view_game_details(IN game_id_in INT)
BEGIN

select game.game_id, game.name, start_date,end_date, location, game.description, organizer.name as organizer_name , organizer.description as organizer_description, organizer.id as organizer_id, datediff(end_date, start_date) as game_duration from game,organizer where game.organizer_id = organizer.id and game.game_id = game_id_in;

END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_last_inserted_game;
DELIMITER //
CREATE PROCEDURE view_last_inserted_game()
BEGIN
	SELECT * FROM game
	WHERE game_id = (SELECT LAST_INSERT_ID());
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_sports_in_game;
delimiter //
CREATE PROCEDURE view_all_sports_in_game(in in_game_id int)
BEGIN
	select * from sport where game_id = in_game_id;
END;
//
delimiter ;

DROP PROCEDURE IF EXISTS view_all_upcoming_ongoing_games;
delimiter //
CREATE PROCEDURE view_all_upcoming_ongoing_games()
BEGIN
	select * from game where (start_date <= now() and end_date >= now()) or (start_date >= now() and end_date >= now())
 	order by start_date desc
 	limit 4;
END//
delimiter ;

DROP PROCEDURE IF EXISTS view_all_upcoming_ongoing_games_not_limited;
delimiter //
CREATE PROCEDURE view_all_upcoming_ongoing_games_not_limited()
BEGIN
	select * from game where (start_date <= now() and end_date >= now()) or (start_date >= now() and end_date >= now())
 	order by start_date desc;
END//
delimiter ;

DROP PROCEDURE IF EXISTS count_game_organizer;
DELIMITER //
	CREATE PROCEDURE count_game_organizer(IN organizer_id_in INT(11))
	BEGIN
		SELECT COUNT(game_id) FROM game WHERE organizer_id = organizer_id_in;
	END;
	//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_game;
DELIMITER //
CREATE PROCEDURE delete_game(IN game_id_in INT)
BEGIN
	DELETE FROM game WHERE game_id = game_id_in;
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS search_for_game_by_keyword;
DELIMITER //
CREATE PROCEDURE search_for_game_by_keyword(in keyword varchar(50))
BEGIN
	select * from game where game.name like keyword;
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_matches_in_game;
DELIMITER //
CREATE PROCEDURE view_all_matches_in_game(in game_id_input INT)
BEGIN
	SELECT team_id, team_name, match_id, sport.sport_id, game_id, sport_match.time_start, sport_match.time_end, sport_match.match_date
	FROM (((game JOIN sport using (game_id))
		JOIN sport_match using (sport_id))
		JOIN team_in_match using (match_id))
        JOIN team using (team_id)
	WHERE game_id = game_id_input;
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_ongoing_matches_in_game;
DELIMITER //
CREATE PROCEDURE view_all_ongoing_matches_in_game(in game_id_input INT)
BEGIN
	SELECT team_id, team_name, match_id, sport.sport_id, game_id, sport_match.time_start, sport_match.time_end, sport_match.match_date
	FROM (((game JOIN sport using (game_id))
		JOIN sport_match using (sport_id))
		JOIN team_in_match using (match_id))
        JOIN team using (team_id)
	WHERE game_id = game_id_input and sport_match.match_date = curdate();
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_past_matches_in_game;
DELIMITER //
CREATE PROCEDURE view_all_past_matches_in_game(in game_id_input INT)
BEGIN
	SELECT team_id, team_name, match_id, sport.sport_id, game_id, sport_match.time_start, sport_match.time_end, sport_match.match_date
	FROM (((game JOIN sport using (game_id))
		JOIN sport_match using (sport_id))
		JOIN team_in_match using (match_id))
        JOIN team using (team_id)
	WHERE game_id = game_id_input and sport_match.match_date < curdate();
END; //
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_upcoming_matches_in_game;
DELIMITER //
CREATE PROCEDURE view_all_upcoming_matches_in_game(in game_id_input INT)
BEGIN
	SELECT team_id, team_name, match_id, sport.sport_id, game_id, sport_match.time_start, sport_match.time_end, sport_match.match_date
	FROM (((game JOIN sport using (game_id))
		JOIN sport_match using (sport_id))
		JOIN team_in_match using (match_id))
        JOIN team using (team_id)
	WHERE game_id = game_id_input and sport_match.match_date > now();
END; //
DELIMITER ;


DROP PROCEDURE IF EXISTS view_all_organization_for_game;
DELIMITER //
CREATE PROCEDURE view_all_organization_for_game(in game_id_in int(11))
BEGIN
	select * from organization where organization_id not in (select organization_id from organization_in_game where game_id = game_id_in);
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_ongoing_games;
DELIMITER //
CREATE PROCEDURE view_all_ongoing_games(IN id INT)
BEGIN
	SELECT * FROM game WHERE (start_date <= NOW() AND end_date >= NOW()) AND organizer_id = id;
END;
//
DELIMITER ;


DROP PROCEDURE IF EXISTS view_all_organization_in_game;
DELIMITER //
CREATE PROCEDURE view_all_organization_in_game(in game_id_in int(11))
BEGIN
	select * from organization where organization_id in (select organization_id from organization_in_game where game_id = game_id_in);
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_upcoming_games;
DELIMITER //
CREATE PROCEDURE view_all_upcoming_games(IN id INT)
BEGIN
	SELECT * FROM game WHERE start_date > NOW() AND organizer_id = id;
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS add_organization_to_game;
DELIMITER //
CREATE PROCEDURE add_organization_to_game(in org_id_in int(11), in game_id_in int(11))
BEGIN
	insert into organization_in_game(game_id, organization_id) values(game_id_in, org_id_in);
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS delete_organization_from_game;
DELIMITER //
CREATE PROCEDURE delete_organization_from_game(IN org_id_in INT(11), IN game_id_in int(11))
BEGIN
	DELETE FROM organization_in_game WHERE game_id = game_id_in and organization_id = org_id_in;
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_all_recent_games;
DELIMITER //
CREATE PROCEDURE view_all_recent_games(IN id INT)
BEGIN
	SELECT * FROM game WHERE end_date < NOW() AND organizer_id = id;
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS view_game_organizer_details;
DELIMITER //
CREATE PROCEDURE view_game_organizer_details(IN in_game_id INT(11))
BEGIN
	SELECT organizer.name, organizer.description, user.email, user.contact FROM user,organizer,game where user.id = organizer.id and game.organizer_id = organizer.id and game.game_id = in_game_id;
END;
//
DELIMITER ;
