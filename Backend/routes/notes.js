const express = require("express");
const router = express.Router();
const databaseService = require("../services/database");

// Apply auth middleware to all routes
router.use(require("../middleware/authMiddleware"));

//  Get notes for a student
router.get("/:studentId", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const notes = await databaseService.getNotesByStudentId(studentId);

    res.json({
      success: true,
      data: notes
    });

  } catch (error) {
    console.error("Error getting notes:", error);

    res.status(500).json({

      success: false,
      error: error.message

    });
  }
}
);

// Add new note
router.post("/", async (req, res) => {
  try {
    const noteData = req.body;
    const newNote = await databaseService.createNote(noteData);

    res.status(201).json({
      success: true,
      data: newNote
    });
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({
      success: false,
      error: error.message
    }
  );
  }
});

// Update note
router.put("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const updateData = req.body;
    await databaseService.updateNote(noteId, updateData);

    res.json({
      success: true,
      message: "Note updated successfully"
    });
  } catch (error) {
    console.error("Error updating note:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
);

//Delete note
router.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    await databaseService.deleteNote(noteId);

    res.json({
      success: true,
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting note:", error);

    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;


