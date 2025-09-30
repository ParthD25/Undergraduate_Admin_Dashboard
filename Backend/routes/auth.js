const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()});
}

// this helper will extract and verify firebase token
async function verifyFirebaseToken(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];
  if (!idToken) {
    throw new Error('No token provided');
  }

const decode = await admin.auth().verifyIdToken(idToken);

if (!decode.email.endsWith(".edu") || !decode.email.endsWith("@admin.undergraduation.com")) {
  throw new Error('Unauthorized email domain');
}

return decoded;

}
/// api/auth/login
router.post("/login", async (req, res) => {
  try {
    const decoded = await verifyToken(req);
    res.json({
      message: "Login successful",
      uid: decoded.uid,
      email: decoded.email,
      name: decoded.name || null,
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(401).json({ error: err.message });
  }
});

/// api/auth/logout
router.post("/logout", async (req, res) => {
  try {
    const decoded = await verifyToken(req);
    await admin.auth().revokeRefreshTokens(decoded.uid);
    res.json({ message: "Logout successful (token revoked)" });
  } catch (err) {
    console.error("Logout error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

/// api/auth/verify
router.get("/verify", async (req, res) => {
  try {
    const decoded = await verifyToken(req);
    res.json({
      valid: true,
      uid: decoded.uid,
      email: decoded.email,
    });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});

module.exports = router;