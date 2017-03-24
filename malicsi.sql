DROP DATABASE IF EXISTS malicsi;
CREATE DATABASE IF NOT EXISTS malicsi;
USE malicsi;

CREATE TABLE user (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(60) NOT NULL,
	email VARCHAR(254) NOT NULL,
	contact VARCHAR(15),
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
	nickname VARCHAR(15) NOT NULL,
	sex CHAR(1),
	PRIMARY KEY (id),
	FOREIGN KEY (id) REFERENCES user(id)
);

CREATE TABLE competitor_sport_played (
	sport_played_id INT NOT NULL AUTO_INCREMENT,
	id INT NOT NULL,
	FOREIGN KEY (id) REFERENCES competitor(id),
	PRIMARY KEY (sport_played_id, id)
);

CREATE TABLE organizer (
	id INT NOT NULL,
	name VARCHAR(50),
	description VARCHAR(100),
	FOREIGN KEY (id) REFERENCES user(id),
	PRIMARY KEY (id)
);

CREATE TABLE sponsor_institution (
	sponsor_id INT AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	PRIMARY KEY(sponsor_id)
);

CREATE TABLE organization (
	organization_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	PRIMARY KEY (organization_id)
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
	FOREIGN KEY (organizer_id) REFERENCES organizer(id),
	-- loop?
    -- "no." - anton
    FOREIGN KEY (overall_winner) REFERENCES organization(organization_id)
);

CREATE TABLE organization_in_game (
	game_id INT NOT NULL,
	organization_id INT NOT NULL,
	PRIMARY KEY (game_id, organization_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id),
	FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);

CREATE TABLE sponsor_games (
	sponsor_id INT NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY(sponsor_id, game_id),
	FOREIGN KEY(sponsor_id) references sponsor_institution(sponsor_id),
	FOREIGN KEY(game_id) references game(game_id)
);


CREATE TABLE sport (
	sport_id INT NOT NULL AUTO_INCREMENT,
	winner INT,
	time_start TIME NOT NULL,
	time_end TIME NOT NULL,
	date DATE NOT NULL,
	scoring_system VARCHAR(50) NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY (sport_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id)
);

CREATE TABLE team (
	team_id INT NOT NULL AUTO_INCREMENT,
	id INT NOT NULL,
	sport_id INT NOT NULL,
	team_organization INT NOT NULL,
	team_sport VARCHAR(50) NOT NULL,
	pending_participation BOOLEAN NOT NULL,
	FOREIGN KEY(id) references competitor(id),
	FOREIGN KEY(sport_id) references sport(sport_id),
	FOREIGN KEY(team_organization) references organization(organization_id),
	PRIMARY KEY(team_id)
);

CREATE TABLE sport_match (
	match_id INT NOT NULL AUTO_INCREMENT,
	time_start TIME NOT NULL,
	time_end TIME NOT NULL,
	sport_id INT NOT NULL,
	match_date DATE NOT NULL,
	is_draw BOOLEAN,
	remarks VARCHAR(200),
	PRIMARY KEY(match_id),
	FOREIGN KEY(sport_id) references sport(sport_id)
);


CREATE TABLE team_in_match (
	match_id INT NOT NULL,
	team_id INT NOT NULL,
	ranking INT,
	PRIMARY KEY(match_id, team_id),
	FOREIGN KEY(match_id) references sport_match(match_id),
	FOREIGN KEY(team_id) references team(team_id)
);

CREATE TABLE team_opponent (
	match_id INT NOT NULL,
	id INT NOT NULL,
	FOREIGN KEY(match_id) references sport_match(match_id),
	FOREIGN KEY(id) references competitor(id)
);


CREATE TABLE team_announcement (
	team_announcement_id INT NOT NULL AUTO_INCREMENT,
	team_id INT NOT NULL,
	FOREIGN KEY(team_id) references team(team_id),
	PRIMARY KEY(team_announcement_id, team_id)
);

CREATE TABLE competitor_joins_team (
	id INT NOT NULL,
	team_id INT NOT NULL,
	is_member BOOLEAN NOT NULL,
	FOREIGN KEY(team_id) references team(team_id),
	FOREIGN KEY(id) references competitor(id),
	PRIMARY KEY(team_id, id)
);

CREATE TABLE log (
	log_id INT NOT NULL,
	content VARCHAR(140) NOT NULL,
	date_created DATETIME NOT NULL,
	PRIMARY KEY(log_id)
);
