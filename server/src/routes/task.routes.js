const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All task routes require authentication

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;
