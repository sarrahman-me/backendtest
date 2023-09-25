import Sequelize from "sequelize";
import dbConfig from "../config/database.js";
import Users from "../models/users.js";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = Users(sequelize, Sequelize);

export default db;
