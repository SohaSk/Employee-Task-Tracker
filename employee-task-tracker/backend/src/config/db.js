const { Sequelize } = require('sequelize');
require('dotenv').config();
const dialect = process.env.DB_DIALECT || 'sqlite';

const sequelize = new Sequelize({
  dialect,
  storage: process.env.DB_STORAGE || './database.sqlite',
  logging: false
});

module.exports = sequelize;
