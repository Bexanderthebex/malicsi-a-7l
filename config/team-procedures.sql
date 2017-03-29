USE malicsi;
DROP procedure IF EXISTS rankings;
DELIMITER //

CREATE PROCEDURE rankings ( IN teamID INT, IN user_id INT) 


BEGIN


   SELECT ranking, COUNT(ranking) as rankCount FROM team_in_match WHERE team_id = teamID group by ranking;


END; //	

DELIMITER ;