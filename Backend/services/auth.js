// Authentication service for admin login
const { auth } = require("../config/firebase");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const AuthService = require("../services/auth");
const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key";

class AuthService {
  
  // Authenticates an admin user with email and password
  async loginAdmin(email, password) {
    throw new Error (" Use Firebase client"s SDK for login, then send ID token to backend for verification.");
  }

  // Verifies the Firebase ID token and checks if it"s from the authorized domain
  async verifyToken(token) {
    try {
      const decoded = await auth.verifyIdToken(token);

      if (!decoded.email.endsWith("@admin.undergraduates.com")) {
        throw new Error("Unauthorized domain");
      }

      return decoded;
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }

  // Creates a new admin user in Firebase Auth
  async createAdminUser(userData) {
    try {
      const user = await auth.createUser({email: userData.email,password: userData.password,displayName: userData.name});
      return user;

    } catch (err) 
    {
      throw new Error(err.message);
    }
  }

  // Updates custom claims for admin permissions
  async updateAdminPermissions(adminId, permissions) {
    try {await auth.setCustomUserClaims(adminId, { permissions });

      return { success: true };

    } catch (err) {throw new Error(err.message);
    }
  }

  // Generates a JWT token for the authenticated admin
  generateJWT(adminData) {
    return jwt.sign(
      {
        uid: adminData.uid,
        email: adminData.email,
        permissions: adminData.permissions || []
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  }

  // Checks if the admin has the required permission
  async validateAdminAccess(adminId, requiredPermission) {
    try {
      const user = await auth.getUser(adminId);
      const claims = user.customClaims || {};
      const perms = claims.permissions || [];
      return perms.includes(requiredPermission);
    } catch (err) {
      throw new Error("Permission validation has failed");
    }
  }
}

module.exports = new AuthService();


