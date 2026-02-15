export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'admin' | 'student';
  classGroup: '1-5' | '6-8' | '9-12';
  createdAt: Date;
}

export interface LiveClass {
  id: string;
  title: string;
  description: string;
  classGroup: '1-5' | '6-8' | '9-12';
  zoomLink: string;
  date: Date;
  createdAt: Date;
}

export interface RecordedClass {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  classGroup: '1-5' | '6-8' | '9-12';
  createdAt: Date;
}

export interface StudyMaterial {
  id: string;
  title: string;
  fileUrl: string;
  classGroup: '1-5' | '6-8' | '9-12';
  uploadedAt: Date;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export type ClassGroup = '1-5' | '6-8' | '9-12';
export type UserRole = 'admin' | 'student';
