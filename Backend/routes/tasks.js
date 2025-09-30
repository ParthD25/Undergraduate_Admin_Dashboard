const express = require("express");
const router = express.Router();
const databaseService = require("../services/database");

// Apply auth middleware to all routes
router.use(require("../middleware/authMiddleware"));

// POST /api/tasks - Create a new task
router.post("/", async (req, res) => {
  try {
    // Get the task data from the request body
    const taskData = req.body;

    // Create the task using the database service
    const newTask = await databaseService.createTask(taskData);

    // Send back the created task
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    
    res.status(500).json({ error: "Failed to create task" });
  }
});

// GET /api/tasks - Get all tasks, optionally filtered by studentId
router.get("/", async (req, res) => {
  try {
    // Get the studentId from query parameters
    const filters = {};
    if (req.query.studentId) {
      filters.studentId = req.query.studentId;

    }

    // Get the tasks from the database
    const tasks = await databaseService.getTasks(filters);

    // Send back the tasks
    res.json(tasks);
  } catch (error) {
    console.error("Error getting tasks:", error);

    res.status(500).json({ error: "Failed to get tasks" });

  }});

// PUT /api/tasks/:id - Update a task"s status
router.put("/:id", async (req, res) => {
  try {
    // Get the task ID from the URL
    const taskId = req.params.id;

    // Get the update data from the request body
    const updateData = req.body;

    // Update the task in the database
    await databaseService.updateTask(taskId, updateData);

    // Send back success message
    res.json({ message: "Task updated successfully" });

  } catch (error) {
    console.error("Error updating task:", error);

    res.status(500).json({ error: "Failed to update task" });

  }
});

module.exports = router;


