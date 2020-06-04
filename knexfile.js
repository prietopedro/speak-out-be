// Update with your config settings.
require("dotenv").config();

const database_name = process.env.DB_NAME;
const database_user = process.env.DB_USER;
const database_password = process.env.DB_PASSWORD;
const database_host = process.env.DB_HOST;

module.exports = {
	production: {
		client: "postgresql",
		connection: {
			port: 5432,
			database: database_name,
			user: database_user,
			password: database_password,
		},
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
	development: {
		client: "postgresql",
		connection: {
			host: database_host,
			database: database_name,
			user: database_user,
			password: database_password,
		},
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
	testing: {
		client: "postgresql",
		connection: {
			host: database_host,
			database: database_name,
			user: database_user,
			password: database_password,
		},
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
};
