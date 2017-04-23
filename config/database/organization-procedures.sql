USE malicsi;

DROP PROCEDURE IF EXISTS check_organization;
DELIMITER //
CREATE PROCEDURE check_organization(in org_Name CHAR(50))
BEGIN
	select * from organization where name = org_Name;
END;
//
DELIMITER ;

DROP PROCEDURE IF EXISTS add_organization;
DELIMITER //
CREATE PROCEDURE add_organization(in orgId int(11), in gameId int(11))
BEGIN
	insert into organization_in_game(game_id, org_id) values(gameId, orgId);
END;
//
DELIMITER ;

--  check organization
GRANT EXECUTE ON PROCEDURE check_organization TO organizer;
GRANT EXECUTE ON PROCEDURE check_organization TO administrator;

-- add organization

GRANT EXECUTE ON PROCEDURE add_organization TO organizer;
GRANT EXECUTE ON PROCEDURE add_organization TO administrator;
