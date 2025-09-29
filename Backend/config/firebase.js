const admin = require('firebase-admin');
const path = require('path');

// Initialize Firebase Admin SDK with modern approach
let app;

try {
  // Check if Firebase app is already initialized
  if (admin.apps.length === 0) {
    // Path to your downloaded service account key
    const serviceAccountPath = path.join(__dirname, '../firebase-service-account.json');
    const serviceAccount = require(serviceAccountPath);
    
    // Fix private key formatting if needed
    if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
      // Ensure proper line breaks in private key
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
    
    // Initialize with the modern Firebase Admin SDK
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: 'ug-admin-644e2',
    });
    
    console.log('✅ Firebase Admin SDK initialized successfully!');
    console.log(`📦 Project ID: ${app.options.projectId}`);
  } else {
    app = admin.app(); // Use existing app
  }
} catch (error) {
  console.error('❌ Firebase Admin initialization error:', error.message);
  console.log('📁 Make sure you have downloaded the service account key and placed it at:');
  console.log('   Backend/firebase-service-account.json');
  console.log('');
  console.log('🔗 Download from: Firebase Console → Project Settings → Service Accounts → Generate new private key');
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