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
