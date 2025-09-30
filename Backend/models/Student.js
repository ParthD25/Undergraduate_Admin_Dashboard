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
}


