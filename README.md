# UG Admin Dashboard

## Overview
Internal CRM dashboard for managing student interactions on undergraduation.com platform. Built to track student engagement, monitor application progress, and facilitate team communication.

## Features
- **Student Directory**: View all students with filters and search functionality
- **Individual Profiles**: Detailed student information with interaction timeline
- **Communication Log**: Track emails, calls, and other communications
- **Internal Notes**: Team collaboration and student tracking
- **Progress Monitoring**: Application status tracking with progress indicators
- **Analytics**: Engagement metrics and insights

## Tech Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Email**: Customer.io integration (planned)

## Project Structure
```
ug-admin-dashboard/
├── Frontend/                 # Next.js React application
│   ├── components/          # Reusable UI components
│   ├── pages/              # Next.js pages and routing
│   ├── lib/                # Utilities and API functions
│   ├── contexts/           # React context providers
│   └── styles/             # Global styles and Tailwind config
├── Backend/                 # Node.js Express API
│   ├── routes/             # API route handlers
│   ├── models/             # Data models
│   ├── services/           # Business logic services
│   ├── middleware/         # Express middleware
│   ├── config/             # Configuration files
│   └── database/           # Database schema and utilities
└── README.md               # This file
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase project with Firestore enabled

### Backend Setup
1. Navigate to Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update Firebase credentials and other config values

4. Set up Firebase Admin SDK:
   - Download service account key from Firebase Console
   - Save as `firebase-service-account.json` in Backend root

5. Start development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Update Firebase config and API endpoints

4. Start development server:
   ```bash
   npm run dev
   ```

### Firebase Configuration
1. Create a new Firebase project
2. Enable Firestore database
3. Enable Authentication with Email/Password
4. Create admin users in Firebase Auth
5. Set up Firestore security rules for admin access


## Data Models
- **Student**: Personal info, application status, engagement metrics
- **Activity**: User interactions, logins, AI questions, document uploads
- **Communication**: Emails, calls, meetings with status tracking
- **Note**: Internal team notes with privacy and categorization
- **Task**: Follow-ups and reminders for admin team


## Next Steps
1. Implement authentication flow
2. Build student data fetching and display
3. Create communication logging system
4. Develop note-taking functionality
5. Add analytics and reporting features
6. Integrate with Customer.io for email automation

## Contributing
This is an internal project for undergraduation.com. 

