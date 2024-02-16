CREATE DATABASE IF NOT EXISTS usersdb;

USE usersdb;

CREATE TABLE
    userprofile (
        id INT (11) NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) DEFAULT NULL,
        lastName VARCHAR(45) DEFAULT NULL,
        email VARCHAR(45) DEFAULT NULL,
        salary INT (11) DEFAULT NULL,
        PRIMARY KEY (id)
    );

DESCRIBE userprofile;

INSERT INTO
    userprofile
values
    (1, 'Ryan', 'Ray', 'ray@mail.com', 20000),
    (2, 'Joe', 'McMillan', 'joe@mail.com', 40000),
    (3, 'John', 'Carter', 'john@mail.com', 50000);

SELECT
    *
FROM
    userprofile;