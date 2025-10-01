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
  // Check if note is private
  isPrivate() {
    return this.isPrivate;
  }

  // Get note preview (first 100 characters)
  getPreview() {
    return this.content.length > 100 ? this.content.substring(0, 100) + "..." : this.content;
  }

  // Check if note has specific tag
  hasTag(tag) {
    return this.tags.includes(tag);
  }

  // Get formatted timestamp
  getFormattedDate() {
    return new Date(this.timestamp).toLocaleDateString();
  }
}

module.exports = Note;


