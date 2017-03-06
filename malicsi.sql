DROP DATABASE IF EXISTS malicsi;
CREATE DATABASE IF NOT EXISTS malicsi;
USE malicsi;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    email VARCHAR(254) NOT NULL,
    contact VARCHAR(15),
    is_admin BOOLEAN NOT NULL,
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

CREATE TABLE organizer (
    id INT NOT NULL,
    name VARCHAR(50),
    description VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE sponsor_institution (
	sponsor_id INT AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	description VARCHAR(200),
	PRIMARY KEY(sponsor_id)
);

CREATE TABLE sponsor_games (
	sponsor_id INT NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY(sponsor_id, game_id),
	FOREIGN KEY(sponsor_id) references sponsor_institution(sponsor_id),
	FOREIGN KEY(game_id) references game(game_id)
);

CREATE TABLE match (
	match_id INT AUTO_INCREMENT,
	winner INT NOT NULL,
	time_start TIME NOT NULL,
	time_end TIME NOT NULL,
	date DATE NOT NULL,
	sport INT NOT NULL,
	remarks VARCHAR(200), 
	PRIMARY KEY(match_id) references team(team_id),
	FOREIGN KEY(sport) references sport(sponsor_id)
);

CREATE TABLE team_in_match (
	match_id INT NOT NULL,
	team_id INT NOT NULL,
	PRIMARY KEY(match_id, team_id),
	FOREIGN KEY(match_id) references match(match_id),
	FOREIGN KEY(team_id) references team(team_id)
);

CREATE TABLE game (
	game_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NOT NULL,
	location VARCHAR(100) NOT NULL,
	description VARCHAR(100),
	overall_winner VARCHAR(50) NOT NULL,
	PRIMARY KEY (game_id),
	FOREIGN KEY (overall_winner) REFERENCES organization_in_game(organization)
);

CREATE TABLE organization_in_game (
	game_id INT NOT NULL,
	organization VARCHAR(50) NOT NULL,
	PRIMARY KEY (game_id, organization),
	FOREIGN KEY (game_id) REFERENCES game(game_id)
);

CREATE TABLE sport (
	sport_id INT NOT NULL AUTO_INCREMENT,
	winner INT NOT NULL,
	time_start TIME NOT NULL,
	time_end TIME NOT NULL,
	date DATE NOT NULL,
	scoring_system VARCHAR(50) NOT NULL,
	game_id INT NOT NULL,
	PRIMARY KEY (sport_id),
	FOREIGN KEY (winner) REFERENCES team(team_id),
	FOREIGN KEY (game_id) REFERENCES game(game_id)
);