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

DROP PROCEDURE IF EXISTS delete_organization;
DELIMITER //
CREATE PROCEDURE delete_organization(in orgId int(11))
BEGIN
	delete from organization where organization_id = orgId;
END;
//
DELIMITER ;

-- check organization
GRANT EXECUTE ON PROCEDURE check_organization TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE check_organization TO 'administrator'@'localhost';

-- add organization
GRANT EXECUTE ON PROCEDURE add_organization TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE add_organization TO 'administrator'@'localhost';

-- delete organization
GRANT EXECUTE ON PROCEDURE delete_organization TO 'organizer'@'localhost';
GRANT EXECUTE ON PROCEDURE delete_organization TO 'administrator'@'localhost';
