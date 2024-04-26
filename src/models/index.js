const dbconfig = require("../config/config");
const Sequelize = require("sequelize");
require('dotenv').config();

const { DATABASE, USERNAME, PASSWORD, HOST, DB_PORT } = process.env;
// console.log(PASSWORD)

const sequelize = new Sequelize("postgres://postgres:troi1576@localhost/probase", {
    dialect: dbconfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbconfig.pool.max,
        min: dbconfig.pool.min,
        acquire: dbconfig.pool.acquire,
        idle: dbconfig.pool.idle
    }
})


const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./users/users')(sequelize, Sequelize);




module.exports = db;
