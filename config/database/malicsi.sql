DROP DATABASE IF EXISTS malicsi;
CREATE DATABASE IF NOT EXISTS malicsi;
USE malicsi;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(60) NOT NULL,
	email VARCHAR(254) NOT NULL,
	contact VARCHAR(20),
	type CHAR(1) NOT NULL,
	is_active BOOLEAN NOT NULL,
	PRIMARY KEY (id),
	UNIQUE KEY (username)
);

CREATE TABLE competitor (
	id INT NOT NULL,
	birthday DATE NOT NULL,
	first_name VARCHAR(30) NOT NULL,
	last_name VARCHAR(30) NOT NULL,
	nickname VARCHAR(25) NOT NULL,
	sex CHAR(1),
	bio TEXT,
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE competitor_sport_played (
	sport_played_id INT NOT NULL AUTO_INCREMENT,
	id INT NOT NULL,
	sport_played VARCHAR(50),
	PRIMARY KEY (sport_played_id, id),
	FOREIGN KEY (id) REFERENCES competitor(id) ON DELETE CASCADE
);

CREATE TABLE organizer (
	id INT NOT NULL,
	name VARCHAR(70) NOT NULL,
	description VARCHAR(120),
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE sponsor_institution (
	sponsor_id INT AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	PRIMARY KEY(sponsor_id),
	UNIQUE KEY(name)
);

CREATE TABLE organization (
	organization_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	PRIMARY KEY (organization_id),
	UNIQUE KEY (name)
);

CREATE TABLE game (
	game_id INT NOT NULL AUTO_INCREMENT,
	organizer_id INT NOT NULL,
	name VARCHAR(50) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	location VARCHAR(100) NOT NULL,
	description TEXT,
	overall_winner INT,
	PRIMARY KEY (game_id),
	FOREIGN KEY (organizer_id) REFERENCES organizer(id) ON DELETE CASCADE,
    FOREIGN KEY (overall_winner) REFERENCES organization(organization_id) ON DELETE CASCADE
);

CREATE TABLE organization_in_game (
	game_id INT NOT NULL,
	organization_id INT NOT NULL,
	PRIMARY KEY (game_id, organization_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id) ON DELETE CASCADE,
	FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
);

CREATE TABLE sponsor_games (
	sponsor_id INT NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY(sponsor_id, game_id),
	FOREIGN KEY(sponsor_id) references sponsor_institution(sponsor_id) ON DELETE CASCADE,
	FOREIGN KEY(game_id) references game(game_id) ON DELETE CASCADE
);


CREATE TABLE sport (
	sport_id INT NOT NULL AUTO_INCREMENT,
	sport_name VARCHAR(50) NOT NULL,
	mechanics TEXT NOT NULL,
	winner INT,
	time_start TIME NOT NULL,
	time_end TIME NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	max_teams INT NOT NULL,
	scoring_system VARCHAR(50) NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY (sport_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id) ON DELETE CASCADE
);

CREATE TABLE team (
	team_id INT NOT NULL AUTO_INCREMENT,
	team_name VARCHAR(50) NOT NULL,
	id INT NOT NULL,
	sport_id INT NOT NULL,
	team_organization INT NOT NULL,
	pending_participation BOOLEAN NOT NULL,
	max_members INT NOT NULL,
	PRIMARY KEY(team_id),
	FOREIGN KEY(id) REFERENCES competitor(id) ON DELETE CASCADE,
	FOREIGN KEY(sport_id) REFERENCES sport(sport_id) ON DELETE CASCADE,
	FOREIGN KEY(team_organization) REFERENCES organization(organization_id) ON DELETE CASCADE
);

-- alter table to add winner reference

CREATE TABLE sport_match (
	match_id INT NOT NULL AUTO_INCREMENT,
	time_start TIME NOT NULL,
	time_end TIME NOT NULL,
	sport_id INT NOT NULL,
	match_date DATE NOT NULL,
	remarks VARCHAR(200),
	PRIMARY KEY(match_id),
	FOREIGN KEY(sport_id) REFERENCES sport(sport_id) ON DELETE CASCADE
);

CREATE TABLE team_in_match (
	match_id INT NOT NULL,
	team_id INT NOT NULL,
	ranking INT,
	PRIMARY KEY(match_id, team_id),
	FOREIGN KEY(match_id) REFERENCES sport_match(match_id) ON DELETE CASCADE,
	FOREIGN KEY(team_id) REFERENCES team(team_id) ON DELETE CASCADE
);

CREATE TABLE team_announcement (
	team_announcement_id INT NOT NULL AUTO_INCREMENT,
	team_id INT NOT NULL,
	announcement TEXT,
	FOREIGN KEY(team_id) REFERENCES team(team_id) ON DELETE CASCADE,
	PRIMARY KEY(team_announcement_id, team_id)
);

CREATE TABLE competitor_joins_team (
	id INT NOT NULL,
	team_id INT NOT NULL,
	is_member BOOLEAN NOT NULL,
	FOREIGN KEY(team_id) REFERENCES team(team_id) ON DELETE CASCADE,
	FOREIGN KEY(id) REFERENCES competitor(id) ON DELETE CASCADE,
	PRIMARY KEY(team_id, id)
);

CREATE TABLE team_joins_sport (
	team_id INT NOT NULL,
	sport_id INT NOT NULL,
	is_approved BOOLEAN NOT NULL,
	FOREIGN KEY(team_id) REFERENCES team(team_id) ON DELETE CASCADE,
	FOREIGN KEY(sport_id) REFERENCES sport(sport_id) ON DELETE CASCADE,
	PRIMARY KEY(team_id,sport_id)
);

CREATE TABLE log (
	log_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	log_msg VARCHAR(140) NOT NULL,
	date_created DATETIME NOT NULL DEFAULT NOW(),
	FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE,
	PRIMARY KEY(log_id)
);

DROP USER IF EXISTS 'administrator'@'localhost';
DROP USER IF EXISTS 'competitor'@'localhost';
DROP USER IF EXISTS 'organizer'@'localhost';
DROP USER IF EXISTS 'guest'@'localhost';

CREATE USER IF NOT EXISTS 'administrator'@'localhost' IDENTIFIED BY 'password1';
CREATE USER IF NOT EXISTS 'competitor'@'localhost' IDENTIFIED BY 'password2';
CREATE USER IF NOT EXISTS 'organizer'@'localhost' IDENTIFIED BY 'password3';
CREATE USER IF NOT EXISTS 'guest'@'localhost' IDENTIFIED BY 'password4';


-- GRANT [type of permission] ON [database name].[table name] TO ‘admin’@'localhost’;
GRANT ALL PRIVILEGES ON malicsi.* TO 'administrator'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.game TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.sport TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.sport_match TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.sponsor_games TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.organization TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.organization_in_game TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.organizer TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.team_in_match TO 'organizer'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.competitor TO 'competitor'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.team TO 'competitor'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.team_in_match TO 'competitor'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.team_opponent TO 'competitor'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.team_announcement TO 'competitor'@'localhost';
GRANT ALL PRIVILEGES ON malicsi.competitor_joins_team TO 'competitor'@'localhost';
GRANT SELECT ON malicsi.* to 'administrator'@'localhost';
GRANT SELECT ON malicsi.* to 'competitor'@'localhost';
GRANT SELECT ON malicsi.* to 'organizer'@'localhost';
GRANT SELECT ON malicsi.* to 'guest'@'localhost';

