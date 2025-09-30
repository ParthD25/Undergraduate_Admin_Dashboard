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
}


