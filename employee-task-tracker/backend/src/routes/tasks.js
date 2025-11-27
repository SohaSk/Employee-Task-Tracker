const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.listTasks);
router.get('/:id', taskController.getTask);

router.post('/',
  body('title').isString().notEmpty(),
  body('employeeId').optional().isInt(),
  body('status').optional().isIn(['todo','in-progress','done']),
  taskController.createTask
);

router.put('/:id',
  param('id').isInt(),
  body('title').optional().isString(),
  body('status').optional().isIn(['todo','in-progress','done']),
  body('employeeId').optional().isInt(),
  taskController.updateTask
);

module.exports = router;
