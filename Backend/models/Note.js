// Note data model
class Note {
  constructor(data) {
    this.id = data.id;
    this.studentId = data.studentId;
    this.content = data.content;
    this.adminId = data.adminId;
    this.adminName = data.adminName;
    this.timestamp = data.timestamp;
    this.isPrivate = data.isPrivate;
    this.tags = data.tags || [];
  }

  // Methods will be implemented here
}