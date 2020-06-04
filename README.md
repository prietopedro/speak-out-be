[![Maintainability](https://api.codeclimate.com/v1/badges/5639a94bef21c852db5f/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/speak-out-be/maintainability)

# API Documentation

#### Backend delpoyed at [AWS](https://speakoutbe.pedroprieto.dev) <br>

#### [Postman API Documentation](https://documenter.getpostman.com/view/8230639/SWTD8wyQ?version=latest#ab443920-3ba6-46b2-bff9-0de953af9172)

## Client Documentation

See [Frontend Documentation](https://github.com/prietop97/speak-out-fe) for details on the front-end of our project.

### Backend framework

- NodeJS
- ExpressJS
- PassportJS
- PostgreSQL
- Knex
- Postgres

## Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- **create postgres database** See more below
- **create .env file** Configure database and environment
- **npx knex migrate:latest** To create database tables
- **npx knex seed:run** To seed tables with data
- **npm run server** to start the local server

## Create postgres database

- Download postgres and pgAdmin https://www.postgresql.org/
- Create database using pgAdmin or terminal (Only database, tables will be created later)

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    * PORT - Port number (5000 by default)
    * NODE_ENV - set to "development" until ready for "production"
    * DB_NAME - local database name (Look above for more information)
    * DB_USER - local database role (Default to postgres but might be different depending on setup)
    * DB_ENV - local database environment ("development" until ready for "production")
    * DB_PASSWORD local database role password

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
