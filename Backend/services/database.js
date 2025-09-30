const { db } = require('../config/firebase');

// Database utility functions for data operations

class DatabaseService {
  
  // Student operations
  async createStudent(studentData) {
    try {
      // Add timestamp and default values
      const studentWithDefaults = {
        ...studentData,
        createdAt: new Date(),
        updatedAt: new Date(),
        engagement: {
          lastActive: new Date(),
          totalLogins: 0,
          aiQuestionsAsked: 0,
          documentsUploaded: 0,
          profileCompleteness: 30,
          engagementScore: 0
        }
      };
      
      // Add to Firestore
      const docRef = await db.collection('students').add(studentWithDefaults);
      console.log(' Student created with ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...studentWithDefaults
      };
    } catch (error) {
      console.error(' Error creating student:', error);
      throw error;
    }
  }

  async getStudents(filters = {}) {
    try {
      let query = db.collection('students');
      
      // Apply filters
      if (filters.country) {
        query = query.where('personalInfo.country', '==', filters.country);
      }
      if (filters.applicationStatus) {
        query = query.where('applicationInfo.status', '==', filters.applicationStatus);
      }
      if (filters.grade) {
        query = query.where('personalInfo.grade', '==', filters.grade);
      }
      
      // Add ordering
      query = query.orderBy('createdAt', 'desc');
      
      // Apply limit if specified
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      
      const snapshot = await query.get();
      const students = [];
      
      snapshot.forEach(doc => {
        students.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      console.log(` Retrieved ${students.length} students`);
      return students;
    } catch (error) {
      console.error(' Error getting students:', error);
      throw error;
    }
  }

  async getStudentById(studentId) {
    try {
      const doc = await db.collection('students').doc(studentId).get();
      
      if (!doc.exists) {
        throw new Error(`Student with ID ${studentId} not found`);
      }
      
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error(` Error getting student ${studentId}:`, error);
      throw error;
    }
  }

  async updateStudent(studentId, updateData) {
    try {
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date()
      };
      
      await db.collection('students').doc(studentId).update(updateWithTimestamp);
      console.log(' Student updated:', studentId);
      
      // Return updated student
      return await this.getStudentById(studentId);
    } catch (error) {
      console.error(` Error updating student ${studentId}:`, error);
      throw error;
    }
  }

  // Activity operations
  async addActivity(studentId, activityData) {
    // Implementation will go here
  }

  async getStudentActivities(studentId, limit = 50) {
    // Implementation will go here
  }

  // Communication operations
  async addCommunication(communicationData) {
    // Implementation will go here
  }

  async getCommunications(studentId) {
    // Implementation will go here
  }

  async updateCommunication(communicationId, updateData) {
    // Implementation will go here
  }

  // Note operations
  async addNote(noteData) {
    // Implementation will go here
  }

  async getNotes(studentId) {
    // Implementation will go here
  }

  async updateNote(noteId, updateData) {
    // Implementation will go here
  }

  async deleteNote(noteId) {
    // Implementation will go here
  }

  // Task operations
  async createTask(taskData) {
    // Implementation will go here
  }

  async getTasks(filters = {}) {
    // Implementation will go here
  }

  async updateTask(taskId, updateData) {
    // Implementation will go here
  }

  // Analytics and insights
  async getStudentStats() {
    // Implementation will go here
  }

  async getEngagementMetrics(dateRange) {
    // Implementation will go here
  }
}

module.exports = new DatabaseService();