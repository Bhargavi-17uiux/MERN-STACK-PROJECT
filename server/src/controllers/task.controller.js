const Task = require('../models/Task');
const Project = require('../models/Project');

/**
 * @route   GET /api/tasks
 * @desc    Get tasks with optional search and filter queries
 * @access  Private
 */
exports.getTasks = async (req, res, next) => {
  try {
    const { projectId, status, priority, search } = req.query;

    const query = { assignedUser: req.user._id };

    if (projectId) {
      query.project = projectId;
    }

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const tasks = await Task.find(query)
      .populate('project', 'title status')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/tasks
 * @desc    Create a new task
 * @access  Private
 */
exports.createTask = async (req, res, next) => {
  try {
    const { title, description, project, priority, dueDate } = req.body;

    if (!title || !project) {
      return res.status(400).json({
        success: false,
        message: 'Please provide task title and project ID.',
      });
    }

    // Verify project belongs to user
    const existingProject = await Project.findOne({
      _id: project,
      owner: req.user._id,
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized.',
      });
    }

    const task = await Task.create({
      title,
      description: description || '',
      project,
      assignedUser: req.user._id,
      priority: priority || 'medium',
      dueDate: dueDate || null,
      status: 'todo',
    });

    const populatedTask = await Task.findById(task._id).populate('project', 'title');

    res.status(201).json({
      success: true,
      data: populatedTask,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/tasks/:id
 * @desc    Get single task details
 * @access  Private
 */
exports.getTaskById = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedUser: req.user._id,
    }).populate('project', 'title');

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/tasks/:id
 * @desc    Update task (e.g. status transition, priority, title)
 * @access  Private
 */
exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({
      _id: req.params.id,
      assignedUser: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    const { title, description, status, priority, dueDate } = req.body;

    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    const updatedTask = await Task.findById(task._id).populate('project', 'title');

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/tasks/:id
 * @desc    Delete task
 * @access  Private
 */
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      assignedUser: req.user._id,
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found.',
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
