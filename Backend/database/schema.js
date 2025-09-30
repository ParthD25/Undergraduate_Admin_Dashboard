// Firebase Firestore Database Schema file
// Collections Structure:
// students collection
const studentSchema = {
  id: "string", // auto-generated document ID
  personalInfo: {
    name: "string",
    email: "string",
    phone: "string",
    grade: "string", // "9th", "10th", "11th", "12th", "Graduate"
    country: "string",
    dateOfBirth: "timestamp",
    parentContact: "string"
  },
  applicationInfo: {
    status: "string", 
    interestedFields: ["string"], // Array of fields like
    targetCountries: ["string"],
    budgetRange: "string",
    preferredIntakeYear: "string"
  },
  engagement: {
    lastActive: "timestamp",
    totalLogins: "number",
    aiQuestionsAsked: "number",
    documentsUploaded: "number",
    profileCompleteness: "number", // percentage
    engagementScore: "number" // calculated score
  },
  createdAt: "timestamp",
  updatedAt: "timestamp"
};

// activities collection (subcollection of students)
const activitySchema = {
  id: "string",
  type: "string", // "login", "ai_question", "document_upload", "profile_update", "college_search", "essay_help"
  description: "string",
  metadata: {
    questionAsked: "string", // for ai_question type
    documentType: "string", // for document_upload type
    collegeSearched: "string", // for college_search type
    pageVisited: "string", // for general browsing
  },
  timestamp: "timestamp",
  sessionId: "string",
  ipAddress: "string",
  userAgent: "string"
};

//communications collection
const communicationSchema = {
  id: "string",
  studentId: "string",
  type: "string", // "email", "sms", "call", "meeting", "whatsapp"
  direction: "string", 
  subject: "string",
  content: "string",
  status: "string", // "sent", "delivered", "read", "replied", "failed"
  adminId: "string",
  adminName: "string",
  timestamp: "timestamp",
  followUpRequired: "boolean",
  followUpDate: "timestamp",
  tags: ["string"]
};

// notes collection
const noteSchema = {
  id: "string",
  studentId: "string",
  content: "string",
  adminId: "string",
  adminName: "string",
  timestamp: "timestamp",
  isPrivate: "boolean",
  priority: "string", // "low", "medium", "high", "urgent"
  tags: ["string"],
  category: "string" // "general", "follow_up", "concern", "opportunity"
};

// admins collection (for admin management)
const adminSchema = {
  id: "string",
  email: "string",
  name: "string",
  role: "string", // "admin", "counselor", "manager"
  permissions: ["string"],
  createdAt: "timestamp",
  lastLogin: "timestamp",
  isActive: "boolean"
};

// tasks collection (for follow-ups and reminders)
const taskSchema = {
  id: "string",
  studentId: "string",
  assignedTo: "string", // admin ID
  title: "string",
  description: "string",
  type: "string", // "follow_up", "call", "email", "document_review"
  priority: "string", // "low", "medium", "high", "urgent"
  status: "string", // "pending", "in_progress", "completed", "cancelled"
  dueDate: "timestamp",
  createdAt: "timestamp",
  completedAt: "timestamp",
  createdBy: "string" // admin ID
};

module.exports = {
  studentSchema,
  activitySchema,
  communicationSchema,
  noteSchema,
  adminSchema,
  taskSchema
};