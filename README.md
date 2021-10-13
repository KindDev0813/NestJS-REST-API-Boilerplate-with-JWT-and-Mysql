# NestJS-REST-API-Boilerplate-with-JWT-and-Mysql

NestJS RESTful API Boilerplate with JWT Authentication and backend Mysql. It covers the basic needs, and boilerplate work of a new project. It promotes the best practices that follow the clean architecture.

The Rest API provides the following features right out of the box:

-   Endpoints in the widely accepted format
-   Standard CRUD operations
-   JWT-based authentication
-   Middleware
-   Environment dependent application configuration
-   Logging
-   Error handling
-   Database migration and seeding
-   Data validation
-   Full test cover
-   Cache(Redis) integration
-   Docker compose
-   API doc using swagger as yaml file

## Getting Started

[Docker](https://www.docker.com/get-started) is needed if you want to try the API without setting up your
own database server.

Run the following commands to start experiencing this API:

```shell
# download the starter kit
git clone https://github.com/chaksaray/NestJS-REST-API-Boilerplate-with-JWT-and-Mysql.git

cd NestJS-REST-API-Boilerplate-with-JWT-and-Mysql

# start a Mysql database server, redis cache & running project in a Docker container
docker-compose up -d

# run migrate database
$ bin/migrate

# revert migration
$ bin/migration-revert

# generate migration file
$ bin/migration-generate ${NameMigration}

# revert migration
$ bin/seed

# test
$ bin/test

# watch test
$ bin/test-watch

```

At this time, you have a REST API server running at `http://127.0.0.1:3000`. It provides the following endpoints:

-   `GET /`: show a welcome page
-   `POST /v1/login`: authenticates a user and generates a JWT
-   `GET /v1/users`: returns a paginated list of the albums
-   `GET /v1/users/:id`: returns the detailed information of an user
-   `POST /v1/users`: creates a new user
-   `PUT /v1/users/:id`: updates an existing user
-   `DELETE /v1/users/:id`: deletes a user


## Project Layout

This API uses the following project layout:

```
.
├── src
│   ├── auth             authentication feature
│   ├── cache            redis cache is implemented here
│   ├── domains          contains the folders of the logic for instance, user, post ...
│   ├── scripts          useful scripts
│   ├── log.config.ts    config log
│   ├── ormconfig.service.ts    orm config for our service
|   └── main.ts          where the app is run
├── bin                  useful commands
├── config               database & redis cache configuration
├── docs                 api doc, swagger.yml
├── logs                 contain error & info log
├── mysql
|   ├── migrations       migration files
|   ├── seeds            seeding database data
│   └── init-db.sql      create database
├── tests
|   ├── integration      integration test
│   └── unit             unit test
└── .env                 environment variables
```
