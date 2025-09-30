// Activity/Interaction data model
class Activity {
  constructor(data) {
    this.id = data.id;
    this.studentId = data.studentId;
    this.type = data.type; // "login", "ai_question", "document_upload", "profile_update", "college_search"
    this.description = data.description;
    this.metadata = data.metadata; // Additional context/data
    this.timestamp = data.timestamp;
    this.ipAddress = data.ipAddress;
    this.userAgent = data.userAgent;
  }

  // Methods will be implemented here
}


