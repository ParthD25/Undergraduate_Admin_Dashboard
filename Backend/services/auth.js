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
    // Note: Actual login should be done via Firebase Client SDK
    // This method can be used for server-side verification after client login has occurred
    try {
      // Get user by email
      const userRecord = await auth.getUserByEmail(email);
      
      // Check if user has admin permissions (set via custom claims)
      const claims = userRecord.customClaims || {};
      if (!claims.permissions || !claims.permissions.includes('admin')) {
        throw new Error('User does not have admin permissions');
      }
      
      return {
        uid: userRecord.uid,
        email: userRecord.email,
        name: userRecord.displayName,
        permissions: claims.permissions
      };
    } catch (error) {
      throw new Error('Admin authentication failed: ' + error.message);
    }
  }

  // Verifies the Firebase ID token and checks if it"s from the authorized domain endsWith("@admin.undergraduates.com"))  
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


