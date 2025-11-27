const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false},
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'user' }
}, {
  timestamps: true
});

module.exports = Employee;
