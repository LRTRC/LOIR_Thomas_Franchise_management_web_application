# Documentation

## Deployed version 
> _This deployed version is a demo version. For practical reasons its server and its API will shut down after 15 minutes of inactivity. The App restart may take 1 minute on first page load (front-end server). Thank you for waiting until then. The API (back-end server) may take 20 seconds to restart on first authentication request. Thank you for your patience :)._

https://loir-thomas-franchise-management-web-0r8c.onrender.com/

Auth with a user : 
id = toto@dev.fr
password = AZE1234a!

Auth with a guest : 
id = tutu@dev.fr
password = AZE1234a!

## GitHub
GitHub : https://github.com/LRTRC/LOIR_Thomas_Franchise_management_web_application/

Branch:
* develop : version in development
* main : stable version


## Installation
* Download and install node LTS from [nodejs.org](https://nodejs.org/en/download/).
* Check that node has been successfully installed. $ node -v
* Clone git repository.
```bash
$ git clone https://github.com/LRTRC/LOIR_Thomas_Franchise_management_web_application.git
$ cd LOIR_Thomas_Franchise_management_web_application
```

## UML Diagrams
Please refer to the app's [UML diagrams](https://drive.google.com/file/d/1ER9JRr4pfG5k1hQrd_xif_c9QbKl-b-L/view?usp=share_link), specially to connect the back-end to a local database that will not be provided in this repository

## Local PostgreSQL server

However, if you still want to use the application locally, you will need to create a local PostgreSQL server. Please follow the next steps.


####

### Install PostgreSQL CLI (psql) with ubuntu
[documentation](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-database)

[tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-20-04#step-1-installing-postgresql)
```bash
$ sudo apt update
$ sudo apt install postgresql postgresql-contrib
$ psql --version
# Enter the command:
$ sudo passwd postgres   
# You will get a prompt to enter your new password. Close and reopen your terminal.
$ sudo service postgresql start
$ sudo -u postgres psql
```

### create a postgres database and user :
```postgresql
$ sudo -u postgres psql
$ postgres=# create database franchisesmanagement;
$ postgres=# create user franchisemanager with encrypted password 'mypass';
$ zx9Kr4LNK7S
$ postgres=# grant all privileges on database franchisesmanagement to franchisemanager ;
```

### Connect to psql with the admin user 'postgress'
```
$ sudo -u postgres psql
```

### Connect to the database 
```postgresql
\c franchisesmanagement
```

### Create tables 
```postgresql
CREATE TABLE users(
id SERIAL PRIMARY KEY,
first_name VARCHAR(100) NULL,
last_name VARCHAR(100) NULL,
email VARCHAR(255) UNIQUE NOT NULL,   
phone VARCHAR(50) NULL,
role VARCHAR(50) NOT NULL),
passphrase VARCHAR(60) NOT NULL;

CREATE TABLE franchisees(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
address VARCHAR(255) NULL,
phone VARCHAR(50) NULL,
default_modules JSON NULL,
isActive BOOLEAN NOT NULL
);

CREATE TABLE structures(
id SERIAL PRIMARY KEY,
id_franchise INT NOT NULL REFERENCES franchisees(id),
name VARCHAR(100) NOT NULL,
address VARCHAR(255) NULL,
phone VARCHAR(50) NULL,
isActive BOOLEAN NOT NULL,
subscriptions BOOLEAN NOT NULL,
group_lessons BOOLEAN NOT NULL,
private_coaching BOOLEAN NOT NULL,
workforce BOOLEAN NOT NULL,
plannings BOOLEAN NOT NULL,
equipments BOOLEAN NOT NULL,
advertising BOOLEAN NOT NULL,
snacks BOOLEAN NOT NULL
);

CREATE TABLE franchisees_users(
id SERIAL PRIMARY KEY,
id_franchise INT NOT NULL REFERENCES franchisees(id),
id_user INT NOT NULL REFERENCES users(id)
);

CREATE TABLE structures_users(
id SERIAL PRIMARY KEY,
id_structure INT NOT NULL REFERENCES structures(id),
id_user INT NOT NULL REFERENCES users(id)
);

```

### Grant privileges to the user franchisemanager on tables
```postgresql
GRANT SELECT ON ALL TABLES IN SCHEMA public TO franchisemanager ;
GRANT INSERT ON ALL TABLES IN SCHEMA public TO franchisemanager ;
GRANT UPDATE ON ALL TABLES IN SCHEMA public TO franchisemanager ;
GRANT DELETE ON ALL TABLES IN SCHEMA public TO franchisemanager ;
```

### Disconnect from current user
alt + d

### Connect to the database with the user 'franchisemanager'
```
$ psql -d franchisesmanagement -U franchisemanager
```

### Restart PostgreSQL server
```bash
$ sudo service postgresql restart
```

### When connected to psql
List all schemas : \dn

List all databases : \db

(when connect to database) List all tables : \dt


