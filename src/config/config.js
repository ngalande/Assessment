const path = require('path');
require('dotenv').config();

const { DATABASE, USERNAME, PASSWORD, HOST, DB_PORT } = process.env;
module.exports =
{
  username: USERNAME,
  password: PASSWORD,
  host: HOST,
  database: "probase",
  port: DB_PORT,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
}




