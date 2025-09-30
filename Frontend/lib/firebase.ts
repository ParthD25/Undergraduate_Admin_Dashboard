// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAVSIVQmi8X3YlVpdIGd4QX2oCs9H1oizo",
  authDomain: "ug-admin-644e2.firebaseapp.com",
  projectId: "ug-admin-644e2",
  storageBucket: "ug-admin-644e2.firebasestorage.app",
  messagingSenderId: "231868568841",
  appId: "1:231868568841:web:9d394454b2b52dfb12efd8",
  measurementId: "G-KK2DL2DGN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export default app;


