ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'CrisNar23';
flush privileges;

CREATE DATABASE gymAppDB;

USE gymAppDB;

CREATE TABLE cities(
	city_id INT AUTO_INCREMENT,
	city_name VARCHAR(40) NOT NULL,
	PRIMARY KEY(city_id)
);

CREATE TABLE headquarters(
	headquarters_id INT AUTO_INCREMENT,
	headquarter_name VARCHAR(40) NOT NULL,
	city_id INT NOT NULL,
	PRIMARY KEY(headquarter_name, city_id),
	INDEX(headquarters_id),
	FOREIGN KEY(city_id) REFERENCES cities(city_id)
);

CREATE TABLE roles(
	role_id INT AUTO_INCREMENT,
	role_name VARCHAR(50) NOT NULL,
	PRIMARY KEY(role_id)
);

CREATE TABLE users(
	user_id VARCHAR(20),
	username VARCHAR(40) NOT NULL,
	password VARCHAR(255) NOT NULL,
	role_id INT NOT NULL DEFAULT 2,
	headquarter_name VARCHAR(40) NOT NULL,
	city_id INT NOT NULL,
	PRIMARY KEY(user_id),
	FOREIGN KEY(headquarter_name, city_id) REFERENCES headquarters(headquarter_name, city_id),
	FOREIGN KEY(role_id) REFERENCES roles(role_id)
);

INSERT INTO
	`gymappdb`.`roles` (`role_name`)
VALUES
	('admin');

INSERT INTO
	`gymappdb`.`roles` (`role_name`)
VALUES
	('standard');

INSERT INTO
	`gymappdb`.`cities` (`city_name`)
VALUES
	('Pasto');

INSERT INTO
	`gymappdb`.`headquarters` (`headquarter_name`, `city_id`)
VALUES
	('Sede 1', 1);

INSERT INTO
	`gymappdb`.`users` (
		`user_id`,
		`username`,
		`password`,
		`role_id`,
		`headquarter_name`,
		`city_id`
	)
VALUES
	('123456', 'Admin', '123456', '1', 'Sede 1', '1');