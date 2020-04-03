DROP DATABASE IF EXISTS EMPLOYEES_DB;
CREATE DATABASE EMPLOYEES_DB;
USE EMPLOYEES_DB;

CREATE TABLE DEPARTMENT (
	ID INT NOT NULL AUTO_INCREMENT,
	NAME VARCHAR(100),
	PRIMARY KEY(ID)
);
CREATE TABLE ROLES (
	ID INT NOT NULL AUTO_INCREMENT,
	TITLE VARCHAR(100),
	SALARY INT,
	DEPARTMENT_ID INT NOT NULL,
	PRIMARY KEY(ID),
	CONSTRAINT fk_department FOREIGN KEY (DEPARTMENT_ID) REFERENCES DEPARTMENT(ID)
);
CREATE TABLE EMPLOYEES (
	ID	INT NOT NULL AUTO_INCREMENT,
	FIRST_NAME VARCHAR(100),
	LAST_NAME VARCHAR(100),
	ROLE_ID	INT NOT NULL,
	MANAGER_ID INT,
	PRIMARY KEY (ID),
	FOREIGN KEY (ROLE_ID) REFERENCES ROLES(ID),
	FOREIGN KEY (MANAGER_ID) REFERENCES EMPLOYEES(ID)
);