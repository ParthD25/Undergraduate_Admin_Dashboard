const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });
}

// Middleware to verify Firebase ID token and check email domain
const authMiddleware = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization?.split("Bearer ")[1];
    if (!idToken) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = await admin.auth().verifyIdToken(idToken);

    // Allow only @admin.undergraduates.com emails
    if (!decoded.email.endsWith("@admin.undergraduates.com")) {
      return res.status(403).json({ error: "Unauthorized email domain" });
    }

    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;


