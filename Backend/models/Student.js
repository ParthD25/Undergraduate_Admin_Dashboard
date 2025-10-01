// Student data model
class Student {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.grade = data.grade;
    this.country = data.country;
    this.applicationStatus = data.applicationStatus; // "Exploring", "Shortlisting", "Applying", "Submitted"
    this.lastActive = data.lastActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  // Methods will be implemented here
  // Check if student is currently active (active within last 7 days)
  isActive() {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return new Date(this.lastActive) > sevenDaysAgo;
  }

  // Get student's full name (assuming name is full name)
  getFullName() {
    return this.name;
  }

  // Check if student needs essay help
  needsEssayHelp() {
    // This would be based on some field, for now return false
    return false;
  }

  // Get student's application progress as percentage
  getProgressPercentage() {
    const statusProgress = {
      "Exploring": 25,
      "Shortlisting": 50,
      "Applying": 75,
      "Submitted": 100
    };
    return statusProgress[this.applicationStatus] || 0;
  }
}

module.exports = Student;


