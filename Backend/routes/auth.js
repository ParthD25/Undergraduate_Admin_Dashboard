const express = require("express");
const router = express.Router();

// Apply auth middleware to all routes
router.use(require("../middleware/authMiddleware"));

/// api/auth/login
router.post("/login", async (req, res) => {
  try {
    const decoded = req.user;
    res.json({
      message: "Login successful",
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || null
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(401).json({ error: err.message });
  }
});

/// api/auth/logout
router.post("/logout", async (req, res) => {
  try {
    const decoded = req.user;

    await admin.auth().revokeRefreshTokens(decoded.uid);

    res.json({ message: "Logout successful (token revoked)" });
  } catch (err) {console.error("Logout error:", err.message);

    res.status(400).json({ error: err.message });
  }
});

/// api/auth/verify
router.get("/verify", async (req, res) => {
  try {
    const decoded = req.user;

    res.json({valid: true,uid: decoded.uid,email: decoded.email});

  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

module.exports = router;


