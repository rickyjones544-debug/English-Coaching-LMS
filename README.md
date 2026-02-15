# Ideal Coaching Classes - English LMS Platform

A production-ready Learning Management System for Ideal Coaching Classes, Banka Bihar, focused on Spoken English and Grammar classes for Indian students (Class 1 to 12).

## Features

- **Public Marketing Website** with professional landing page
- **Authentication System** with Firebase Auth
- **Student Dashboard** with live classes, recorded materials, and study resources
- **Admin Panel** for teacher management
- **Responsive Design** optimized for Indian students and parents

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Firebase (Authentication, Firestore, Storage)
- Lucide React Icons

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd ideal-coaching-classes
npm install
```

### 2. Firebase Configuration

Create a Firebase project and configure:

1. Enable Authentication (Email/Password)
2. Set up Firestore Database
3. Configure Storage

Create a `.env.local` file with:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
/app
  /admin - Admin panel routes
  /dashboard - Student dashboard routes
  /auth - Authentication pages
  /api - API routes
/components
  /ui - Reusable UI components
  /auth - Authentication components
  /dashboard - Dashboard components
/lib
  /firebase.ts - Firebase operations
/firebase
  /firebaseConfig.ts - Firebase configuration
/types
  /index.ts - TypeScript type definitions
```

## Database Collections

- `users` - User profiles and roles
- `liveClasses` - Scheduled live classes
- `recordedClasses` - Video recordings
- `materials` - Study materials (PDFs)
- `announcements` - Teacher announcements

## Deployment

The application is ready for deployment on Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

## Default Admin

To create an admin account, register with email and manually set the role to "admin" in Firestore.

## Support

For technical support, contact the development team.
