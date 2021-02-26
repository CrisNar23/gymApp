/******************** DB Connection gymAppDB ********************/

/* Configuration to connect to the database */
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  },
});

module.exports = knex;
