DROP DATABASE IF EXISTS malicsi;
CREATE DATABASE IF NOT EXISTS malicsi;
USE malicsi;

CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(60) NOT NULL,
    active BOOLEAN NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (username)
);

CREATE TABLE organizer (
    id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id) REFERENCES user(id)
);

INSERT INTO user VALUES (1, 'jolibee', 'walakapagasa', FALSE);
