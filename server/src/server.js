const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware: Enable Cross-Origin Resource Sharing (allows frontend to talk to backend)
app.use(cors());

// Middleware: Parse incoming JSON request payloads
app.use(express.json());

// Routes
const healthRoutes = require('./routes/health.routes');
app.use('/api/health', healthRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TaskFlow API',
    docs: '/api/health for system status',
  });
});

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found`,
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[TaskFlow Server] Running on http://localhost:${PORT}`);
  });
}

module.exports = app;
