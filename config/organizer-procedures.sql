USE malicsi;
DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE find_game ( IN userID INT) 


BEGIN


   SELECT * from game WHERE game.organizer_id = userID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE find_sport ( IN gameID INT) 


BEGIN


   SELECT * from sport WHERE sport.game_id = gameID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE find_team ( IN teamID INT) 


BEGIN


   SELECT * from team WHERE team.sport_id = teamID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE get_request ( IN teamID INT) 


BEGIN


   SELECT * from team WHERE team_id = teamID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE accept_request ( IN teamID INT) 


BEGIN


   UPDATE team SET pending_participation = TRUE WHERE team_id =teamID;


END; //

DELIMITER ;

grant execute on procedure findGame to organizer
grant execute on procedure findSport to organizer
grant execute on procedure findTeam to organizer
grant execute on procedure getRequest to organizer
grant execute on procedure acceptRequest to organizer
