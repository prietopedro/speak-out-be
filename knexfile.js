// Update with your config settings.
require("dotenv").config();
const parse = require("pg-connection-string").parse

// OLD DATABASE SETUP
// const database_name = process.env.DB_NAME;
// const database_user = process.env.DB_USER;
// const database_password = process.env.DB_PASSWORD;
// const database_host = process.env.DB_HOST;

// NEW DATABASE SETUP
const database_url = parse(process.env.DATABASE_URL)
database_url.ssl = { rejectUnauthorized: false };

module.exports = {
	production: {
		client: "pg",
		connection: database_url,
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
	development: {
		client: "pg",
		connection: database_url,
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
	testing: {
		client: "pg",
		connection: database_url,
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
};
