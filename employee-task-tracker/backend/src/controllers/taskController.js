const { Task, Employee } = require('../models');
const { validationResult } = require('express-validator');

exports.listTasks = async (req, res, next) => {
  try {
    const where = {};
    const { status, employeeId } = req.query;
    if (status) where.status = status;
    if (employeeId) where.employeeId = employeeId;
    const tasks = await Task.findAll({ where, include: [{ model: Employee, as: 'assignee' }], order: [['createdAt','DESC']] });
    res.json(tasks);
  } catch (err) { next(err); }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [{ model: Employee, as: 'assignee' }] });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) { next(err); }
};

exports.createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) { next(err); }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Not found' });
    await task.update(req.body);
    res.json(task);
  } catch (err) { next(err); }
};
