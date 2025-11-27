const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Employee = require('./employee');

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('todo','in-progress','done'), defaultValue: 'todo' },
  dueDate: { type: DataTypes.DATE, allowNull: true }
}, {
  timestamps: true
});

Task.belongsTo(Employee, { foreignKey: 'employeeId', as: 'assignee' });
Employee.hasMany(Task, { foreignKey: 'employeeId', as: 'tasks' });

module.exports = Task;
