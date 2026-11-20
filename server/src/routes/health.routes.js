const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Health check endpoint to verify backend status
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TaskFlow API is running smoothly',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(1)}s`,
  });
});

module.exports = router;
