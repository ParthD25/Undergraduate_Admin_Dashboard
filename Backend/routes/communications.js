const express = require("express");
const router = express.Router();
const databaseService = require("../services/database");

// Apply auth middleware to all routes
router.use(require("../middleware/authMiddleware"));

// GET /api/communications/:studentId - Get communications for a student
router.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const communications = await databaseService.getCommunicationsByStudentId(studentId);
    res.json({
      success: true,
      data: communications
    });
  } catch (error) {
    console.error("Error getting communications:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/communications - Add new communication
router.post("/", async (req, res) => {
  try {
    const commData = req.body;
    const newComm = await databaseService.createCommunication(commData);
    res.status(201).json({
      success: true,
      data: newComm
    });
  } catch (error) {
    console.error("Error creating communication:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// PUT /api/communications/:id - Update communication
router.put("/:id", async (req, res) => {
  try {
    const commId = req.params.id;
    const updateData = req.body;
    await databaseService.updateCommunication(commId, updateData);
    res.json({
      success: true,
      message: "Communication updated successfully"
    });
  } catch (error) {
    console.error("Error updating communication:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// DELETE /api/communications/:id - Delete communication
router.delete("/:id", async (req, res) => {
  try {
    const commId = req.params.id;
    await databaseService.deleteCommunication(commId);
    res.json({
      success: true,
      message: "Communication deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting communication:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;


