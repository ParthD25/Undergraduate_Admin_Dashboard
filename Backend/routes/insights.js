const express = require("express");
const router = express.Router();
const databaseService = require("../services/database");

// Apply auth middleware to all routes
router.use(require("../middleware/authMiddleware"));

// GET insights of students for dashboard
router.get("/", async (req, res) => {
  try {
    // Get the insights from the database
    const insights = await databaseService.getInsights();

    // Send back the insights data to the client 
    res.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error("Error getting insights:", error);
    res.status(500).json({

      success: false,

      error: error.message
    });
    }
});

module.exports = router;


