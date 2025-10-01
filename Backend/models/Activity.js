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
  // Get activity type display name
  getTypeDisplayName() {
    const typeNames = {
      "login": "User Login",
      "ai_question": "AI Question Asked",
      "document_upload": "Document Uploaded",
      "profile_update": "Profile Updated",
      "college_search": "College Search"
    };
    return typeNames[this.type] || this.type;
  }

  // Check if activity is recent (within last hour)
  isRecent() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return new Date(this.timestamp) > oneHourAgo;
  }

  // Get activity metadata as formatted string
  getMetadataString() {
    if (!this.metadata) return "";
    return Object.entries(this.metadata).map(([key, value]) => `${key}: ${value}`).join(", ");
  }
}

module.exports = Activity;


