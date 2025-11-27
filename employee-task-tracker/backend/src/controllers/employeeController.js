const { Employee, Task } = require('../models');
const { validationResult } = require('express-validator');

// List all employees with their tasks
exports.listEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      include: [{ model: Task, as: 'tasks' }]
    });
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

// Get single employee by ID
exports.getEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findByPk(req.params.id, {
      include: [{ model: Task, as: 'tasks' }]
    });
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

// Create new employee with unique email check
exports.createEmployee = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, role } = req.body;

    // Check if email already exists
    const existing = await Employee.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const newEmp = await Employee.create({
      name,
      email,
      role: role || 'user'
    });
    res.status(201).json(newEmp);
  } catch (err) {
    next(err);
  }
};

// Update employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    const { name, email, role } = req.body;

    // Optional: check for email conflicts on update
    if (email && email !== emp.email) {
      const existing = await Employee.findOne({ where: { email } });
      if (existing) return res.status(400).json({ message: 'Email already exists' });
    }

    await emp.update({ name, email, role });
    res.json(emp);
  } catch (err) {
    next(err);
  }
};

// Delete employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });

    await emp.destroy();
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    next(err);
  }
};
