const { act } = require('react');
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
        query = query.where('personalInfo.country', '==',filters.country);
      }
      if (filters.applicationStatus) {
        query = query.where('applicationInfo.status', '==',filters.applicationStatus);
      }
      if (filters.grade) {
        query = query.where('personalInfo.grade', '==',filters.grade);
      }
      
      // Add ordering
      query = query.orderBy('createdAt','desc');
      
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
      
      // Return the updated student
      return await this.getStudentById(studentId);
    } catch (error) {
      console.error(` Error updating student ${studentId}:`, error);
      throw error;
    }
  }

  // Activity operations
  async addActivity(studentId, activityData) {
    try {
      if (!activityData.type || !activityData.description) {
        throw new Error('Activity type and description are required');
      }

      // Create activity record
      const activityRecord = {
        studentId: studentId,
        type: activityData.type,
        description: activityData.description,
        metadata: activityData.metadata || {},
        timestamp: new Date(),
        createdAt: new Date()
      };

      // This will create an activities collection
      const activityRef = await db.collection('activities').add(activityRecord);

      console.log(' Activity has been successfully added for student:', studentId, ' ', activityData.type);
      // update students engagement metrics based on activity type
      await this.updateStudentEngagement(studentId, activityData.type);

      return { id: activityRef.id, ...activityRecord };
    } catch (error) {
      console.error(' Error adding activity for student ' + studentId + ':', error);
      throw error;
    }
  }

  async updateStudentEngagement(studentId, activityType) {
    try {
      const studentRef = db.collection('students').doc(studentId);
      const studentDoc = await studentRef.get();

      if (!studentDoc.exists) {
        throw new Error('Student with ID (' + studentId + ') not found');
      }

      const currentEngagement = studentDoc.data().engagement || {};
      const updates = {
        lastActive: new Date(),
        engagementScore: (currentEngagement.engagementScore || 0) + 1
      };

      // Update specific counters based on activity type
      if (activityType === 'login') {
        updates.totalLogins = (currentEngagement.totalLogins || 0) + 1;
      }
      else if (activityType === 'ai_question') {
        updates.aiQuestionsAsked = (currentEngagement.aiQuestionsAsked || 0) + 1;
      }
      else if (activityType === 'document_upload') {
        updates.documentsUploaded = (currentEngagement.documentsUploaded || 0) + 1;
      }

      await studentRef.update({
        engagement: updates,
        updatedAt: new Date()
      });

      console.log(' Updated engagement for student ' + studentId);
    } catch (error) {
      console.error(' Error updating engagement for student ' + studentId + ':', error);
      throw error;
    }
  }

  async getStudentActivities(studentId, limit = 50) {
    try {
      const activitiesRef = db.collection('activities');
      const query = activitiesRef
        .where('studentId', '==', studentId)
        .orderBy('timestamp', 'desc')
        .limit(limit);

      const snapshot = await query.get();
      const activities = [];

      snapshot.forEach(doc => {
        activities.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log(' Retrieved ' + activities.length + ' activities for student ' + studentId);
      return activities;
    } catch (error) {
      console.error(' Error getting activities for student ' + studentId + ':', error);
      throw error;
    }
  }

  // Communication operations
  async addCommunication(communicationData) {
    try {
      if (!communicationData.studentId || !communicationData.type) {
        throw new Error('Student ID and communication type are required');
      }

      const communicationRecord = {
        ...communicationData,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const commRef = await db.collection('communications').add(communicationRecord);
      console.log(' Communication added for student ' + communicationData.studentId);

      return { id: commRef.id, ...communicationRecord };
    } catch (error) {
      console.error(' Error adding communication:', error);
      throw error;
    }
  }

  async getCommunications(studentId) {
    try {
      const commRef = db.collection('communications');
      const query = commRef
        .where('studentId', '==', studentId)
        .orderBy('timestamp', 'desc');

      const snapshot = await query.get();
      const communications = [];

      snapshot.forEach(doc => {
        communications.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log(' Retrieved ' + communications.length + ' communications for student ' + studentId);
      return communications;
    } catch (error) {
      console.error(' Error getting communications for student ' + studentId + ':', error);
      throw error;
    }
  }

  async updateCommunication(communicationId, updateData) {
    try {
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date()
      };

      await db.collection('communications').doc(communicationId).update(updateWithTimestamp);
      console.log(' Communication updated: ' + communicationId);

      return { id: communicationId, ...updateWithTimestamp };
    } catch (error) {
      console.error(' Error updating communication ' + communicationId + ':', error);
      throw error;
    }
  }

  // Note operations
  async addNote(noteData) {
    try {
      if (!noteData.studentId || !noteData.content) {
        throw new Error('Student ID and note content are required');
      }

      const noteRecord = {
        ...noteData,
        timestamp: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const noteRef = await db.collection('notes').add(noteRecord);
      console.log(' Note added for student ' + noteData.studentId);

      return { id: noteRef.id, ...noteRecord };
    } catch (error) {
      console.error(' Error adding note:', error);
      throw error;
    }
  }

  async getNotes(studentId) {
    try {
      const notesRef = db.collection('notes');
      const query = notesRef
        .where('studentId', '==', studentId)
        .orderBy('timestamp', 'desc');

      const snapshot = await query.get();
      const notes = [];

      snapshot.forEach(doc => {
        notes.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log(' Retrieved ' + notes.length + ' notes for student ' + studentId);
      return notes;
    } catch (error) {
      console.error(' Error getting notes for student ' + studentId + ':', error);
      throw error;
    }
  }

  async updateNote(noteId, updateData) {
    try {
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date()
      };

      await db.collection('notes').doc(noteId).update(updateWithTimestamp);
      console.log(' Note updated: ' + noteId);

      return { id: noteId, ...updateWithTimestamp };
    } catch (error) {
      console.error(' Error updating note ' + noteId + ':', error);
      throw error;
    }
  }

  async deleteNote(noteId) {
    try {
      await db.collection('notes').doc(noteId).delete();
      console.log(' Note deleted: ' + noteId);

      return { success: true, message: 'Note deleted successfully' };
    } catch (error) {
      console.error(' Error deleting note ' + noteId + ':', error);
      throw error;
    }
  }

  // Task operations
  async createTask(taskData) {
    try {
      if (!taskData.studentId || !taskData.title) {
        throw new Error('Student ID and task title are required');
      }

      const taskRecord = {
        ...taskData,
        status: taskData.status || 'pending',
        priority: taskData.priority || 'medium',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const taskRef = await db.collection('tasks').add(taskRecord);
      console.log(' Task created for student ' + taskData.studentId);

      return { id: taskRef.id, ...taskRecord };
    } catch (error) {
      console.error(' Error creating task:', error);
      throw error;
    }
  }

  async getTasks(filters = {}) {
    try {
      let query = db.collection('tasks');

      if (filters.studentId) {
        query = query.where('studentId', '==', filters.studentId);
      }
      if (filters.status) {
        query = query.where('status', '==', filters.status);
      }
      if (filters.assignedTo) {
        query = query.where('assignedTo', '==', filters.assignedTo);
      }

      query = query.orderBy('createdAt', 'desc');

      if (filters.limit) {
        query = query.limit(filters.limit);
      }

      const snapshot = await query.get();
      const tasks = [];

      snapshot.forEach(doc => {
        tasks.push({
          id: doc.id,
          ...doc.data()
        });
      });

      console.log(' Retrieved ' + tasks.length + ' tasks');
      return tasks;
    } catch (error) {
      console.error(' Error getting tasks:', error);
      throw error;
    }
  }

  async updateTask(taskId, updateData) {
    try {
      const updateWithTimestamp = {
        ...updateData,
        updatedAt: new Date()
      };

      await db.collection('tasks').doc(taskId).update(updateWithTimestamp);
      console.log(' Task updated: ' + taskId);

      return { id: taskId, ...updateWithTimestamp };
    } catch (error) {
      console.error(' Error updating task ' + taskId + ':', error);
      throw error;
    }
  }

  // Analytics and insights
  async getStudentStats() {
    try {
      const studentsSnapshot = await db.collection('students').get();
      const totalStudents = studentsSnapshot.size;

      let stats = {
        totalStudents: totalStudents,
        byStatus: {},
        byCountry: {},
        byGrade: {},
        totalEngagement: 0
      };

      studentsSnapshot.forEach(doc => {
        const student = doc.data();
        const status = student.applicationInfo?.status || 'Unknown';
        const country = student.personalInfo?.country || 'Unknown';
        const grade = student.personalInfo?.grade || 'Unknown';
        const engagement = student.engagement?.engagementScore || 0;

        stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
        stats.byCountry[country] = (stats.byCountry[country] || 0) + 1;
        stats.byGrade[grade] = (stats.byGrade[grade] || 0) + 1;
        stats.totalEngagement += engagement;
      });

      console.log(' Retrieved student statistics');
      return stats;
    } catch (error) {
      console.error(' Error getting student stats:', error);
      throw error;
    }
  }

  async getEngagementMetrics(dateRange) {
    try {
      const activitiesRef = db.collection('activities');
      let query = activitiesRef;

      if (dateRange && dateRange.start) {
        query = query.where('timestamp', '>=', new Date(dateRange.start));
      }
      if (dateRange && dateRange.end) {
        query = query.where('timestamp', '<=', new Date(dateRange.end));
      }

      const snapshot = await query.get();
      const metrics = {
        totalActivities: snapshot.size,
        byType: {},
        byStudent: {},
        timeline: []
      };

      snapshot.forEach(doc => {
        const activity = doc.data();
        const type = activity.type;
        const studentId = activity.studentId;

        metrics.byType[type] = (metrics.byType[type] || 0) + 1;
        metrics.byStudent[studentId] = (metrics.byStudent[studentId] || 0) + 1;
        metrics.timeline.push({
          id: doc.id,
          ...activity
        });
      });

      console.log(' Retrieved engagement metrics');
      return metrics;
    } catch (error) {
      console.error(' Error getting engagement metrics:', error);
      throw error;
    }
  }
}

module.exports = new DatabaseService();