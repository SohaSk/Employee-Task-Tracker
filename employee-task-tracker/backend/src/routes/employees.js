const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.listEmployees);
router.get('/:id', employeeController.getEmployee);

router.post('/',
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  employeeController.createEmployee
);

router.put('/:id',
  param('id').isInt(),
  body('name').optional().isString(),
  body('email').optional().isEmail(),
  employeeController.updateEmployee
);

router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
