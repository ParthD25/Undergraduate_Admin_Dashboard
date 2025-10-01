// Communication data model
class Communication {
  constructor(data) {
    this.id = data.id;
    this.studentId = data.studentId;
    this.type = data.type; // "email", "sms", "call", "meeting"
    this.direction = data.direction; // "inbound", "outbound"
    this.content = data.content;
    this.subject = data.subject;
    this.timestamp = data.timestamp;
    this.adminId = data.adminId;
    this.status = data.status; // "sent", "delivered", "read", "failed"
  }

  // Methods will be implemented here
  // Check if communication was successful
  isSuccessful() {
    return this.status === "delivered" || this.status === "read";
  }

  // Get communication summary
  getSummary() {
    return `${this.type} ${this.direction}: ${this.subject || this.content.substring(0, 50)}...`;
  }

  // Check if communication is recent (within last 24 hours)
  isRecent() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    return new Date(this.timestamp) > oneDayAgo;
  }
}

module.exports = Communication;


