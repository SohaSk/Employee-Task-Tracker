const sequelize = require('../config/db');
const Employee = require('./employee');
const Task = require('./task');

module.exports = {
  sequelize,
  Employee,
  Task
};
