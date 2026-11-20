const Project = require('../models/Project');
const Task = require('../models/Task');

/**
 * @route   GET /api/projects
 * @desc    Get all projects for the logged-in user
 * @access  Private
 */
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).sort({ createdAt: -1 });

    // Populate task counts for each project
    const projectsWithCounts = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ project: project._id });
        const completedCount = await Task.countDocuments({ project: project._id, status: 'completed' });
        return {
          ...project.toObject(),
          taskCount,
          completedCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: projectsWithCounts.length,
      data: projectsWithCounts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   POST /api/projects
 * @desc    Create a new project
 * @access  Private
 */
exports.createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a project title.',
      });
    }

    const project = await Project.create({
      title,
      description: description || '',
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/projects/:id
 * @desc    Get single project details
 * @access  Private
 */
exports.getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   PUT /api/projects/:id
 * @desc    Update project
 * @access  Private
 */
exports.updateProject = async (req, res, next) => {
  try {
    let project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized.',
      });
    }

    const { title, description, status } = req.body;

    if (title) project.title = title;
    if (description !== undefined) project.description = description;
    if (status) project.status = status;

    await project.save();

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   DELETE /api/projects/:id
 * @desc    Delete project and cascade delete all its tasks
 * @access  Private
 */
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or unauthorized.',
      });
    }

    // Cascade delete associated tasks
    await Task.deleteMany({ project: project._id });
    await project.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Project and associated tasks successfully deleted.',
    });
  } catch (error) {
    next(error);
  }
};
