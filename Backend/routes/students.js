const express = require('express');
const router = express.Router();
const databaseService = require('../services/database');

// Apply auth middleware to all routes
router.use(require("../middleware/authMiddleware"));

// GET /api/students - Get all students with filters
router.get('/', async (req, res) => {
  try {
    const filters = {
      country: req.query.country,
      applicationStatus: req.query.status,
      grade: req.query.grade,
      limit: req.query.limit ? parseInt(req.query.limit) : undefined
    };
    
    // Remove undefined filters
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) delete filters[key];
    });
    
    const students = await databaseService.getStudents(filters);
    
    res.json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/students/:id - Get specific student
router.get('/:id', async (req, res) => {
  try {
    const student = await databaseService.getStudentById(req.params.id);
    
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/students - Create new student
router.post('/', async (req, res) => {
  try {
    const student = await databaseService.createStudent(req.body);
    
    res.status(201).json({
      success: true,
      data: student
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/students/:id - Update student info
router.put('/:id', async (req, res) => {
  try {
    const student = await databaseService.updateStudent(req.params.id, req.body);
    
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    const statusCode = error.message.includes('not found') ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/students/:id/timeline - Get student activity timeline
router.get('/:id/timeline', async (req, res) => {
  try {
    const activities = await databaseService.getStudentActivities(req.params.id);
    
    res.json({
      success: true,
      data: activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;