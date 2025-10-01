const admin = require("firebase-admin");

// Initialize Firebase Admin SDK with modern approach
let app;

try {
  // Check if Firebase app is already initialized
  if (admin.apps.length === 0) {
    // For development, use application default credentials
    // This works with Firebase CLI login or Google Cloud SDK
    app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: "ug-admin-644e2",
    });
    
    console.log("✅ Firebase Admin SDK initialized successfully!");
    console.log(`📦 Project ID: ${app.options.projectId}`);
  } else {
    app = admin.app(); // Use existing app
  }
} catch (error) {
  console.error("❌ Firebase Admin initialization error:", error.message);
  console.log("� For development, make sure you have:");
  console.log("   1. Firebase CLI installed: npm install -g firebase-tools");
  console.log("   2. Logged in: firebase login");
  console.log("   3. Or set GOOGLE_APPLICATION_CREDENTIALS environment variable");
  console.log("");
  console.log("🔗 Alternative: Download service account key from Firebase Console");
  console.log("   and place it at: Backend/firebase-service-account.json");
}

// Initialize Firestore and Auth with modern SDK
const db = admin.firestore();
const auth = admin.auth();

// Set Firestore settings for better performance
if (db) {
  db.settings({
    ignoreUndefinedProperties: true
  });
}

module.exports = { db, auth, admin, app };


