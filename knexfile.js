// Update with your config settings.
require("dotenv").config();

// OLD DATABASE SETUP
// const database_name = process.env.DB_NAME;
// const database_user = process.env.DB_USER;
// const database_password = process.env.DB_PASSWORD;
// const database_host = process.env.DB_HOST;

// NEW DATABASE SETUP
const database_url = process.env.DATABASE_URL
console.log(database_url)

module.exports = {
	production: {
		client: "postgresql",
		connection: database_url,
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
	development: {
		client: "postgresql",
		connection: database_url,
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
	testing: {
		client: "postgresql",
		connection: database_url,
		seeds: {
			directory: "./database/seeds",
		},
		migrations: {
			directory: "./database/migrations",
		},
	},
};
