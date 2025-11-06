// index.js - BEGINNER FRIENDLY API for First-Time API Testing Students
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import our simple modules
const studentRoutes = require('./routes/students');
const studentModel = require('./models/students');

// Create the app
const app = express();
const PORT = 3000;

// Simple middleware
app.use(cors()); // Allow requests from any website
app.use(bodyParser.json()); // Parse JSON in request bodies

// Use our routes
app.use('/', studentRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.log('Error:', err.message);
  res.status(500).json({
    error: 'Something went wrong',
    message: err.message
  });
});

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The page ${req.method} ${req.path} was not found`
  });
});

// Start the server
app.listen(PORT, () => {
  console.log('🎓 STUDENT API STARTED!');
  console.log(`🌐 Open your browser to: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/docs`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`👥 Students loaded: ${studentModel.getAllStudents().length}`);
  console.log('');
  console.log('🚀 Ready for testing! Start by visiting /docs');
});