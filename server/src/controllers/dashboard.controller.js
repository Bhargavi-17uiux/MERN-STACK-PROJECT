const Project = require('../models/Project');
const Task = require('../models/Task');

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard metrics and counts
 * @access  Private
 */
exports.getStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [
      totalProjects,
      totalTasks,
      todoCount,
      inProgressCount,
      completedCount,
      highPriorityCount,
    ] = await Promise.all([
      Project.countDocuments({ owner: userId }),
      Task.countDocuments({ assignedUser: userId }),
      Task.countDocuments({ assignedUser: userId, status: 'todo' }),
      Task.countDocuments({ assignedUser: userId, status: 'in_progress' }),
      Task.countDocuments({ assignedUser: userId, status: 'completed' }),
      Task.countDocuments({ assignedUser: userId, priority: 'high' }),
    ]);

    const upcomingTasks = await Task.find({
      assignedUser: userId,
      status: { $ne: 'completed' },
      dueDate: { $exists: true, $ne: null },
    })
      .sort({ dueDate: 1 })
      .limit(5)
      .populate('project', 'title');

    res.status(200).json({
      success: true,
      stats: {
        totalProjects,
        totalTasks,
        todoCount,
        inProgressCount,
        completedCount,
        highPriorityCount,
      },
      upcomingTasks,
    });
  } catch (error) {
    next(error);
  }
};
