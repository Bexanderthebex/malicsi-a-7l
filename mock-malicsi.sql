DROP DATABASE IF EXISTS malicsi;
CREATE DATABASE IF NOT EXISTS malicsi;
USE malicsi;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (username)
);

CREATE TABLE organizer (
    id INT NOT NULL,
    name VARCHAR(50),
    description VARCHAR(100),
    PRIMARY KEY (id)
);
