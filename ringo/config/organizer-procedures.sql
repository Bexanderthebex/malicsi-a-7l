USE malicsi;
DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE findGame ( IN userID INT) 


BEGIN


   SELECT * from game WHERE game.organizer_id = userID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE findSport ( IN gameID INT) 


BEGIN


   SELECT * from sport WHERE sport.game_id = gameID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE findTeam ( IN teamID INT) 


BEGIN


   SELECT * from team WHERE team.sport_id = teamID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE getRequest ( IN teamID INT) 


BEGIN


   SELECT * from team WHERE team_id = teamID;


END; //

DELIMITER ;

DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE acceptRequest ( IN teamID INT) 


BEGIN


   UPDATE team SET pending_participation = TRUE WHERE team_id =teamID;


END; //

DELIMITER ;

