import { LiveClass, RecordedClass, StudyMaterial, Announcement, User } from '@/types';

// Mock data for demonstration without Firebase
export const mockLiveClasses: LiveClass[] = [
  {
    id: '1',
    title: 'Spoken English Basics',
    description: 'Learn fundamental spoken English skills',
    classGroup: '6-8',
    zoomLink: 'https://zoom.us/j/123456789',
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Grammar Workshop',
    description: 'Advanced grammar concepts',
    classGroup: '9-12',
    zoomLink: 'https://zoom.us/j/987654321',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    createdAt: new Date()
  }
];

export const mockRecordedClasses: RecordedClass[] = [
  {
    id: '1',
    title: 'Introduction to Verbs',
    description: 'Understanding different types of verbs',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    classGroup: '6-8',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Sentence Structure',
    description: 'Building proper English sentences',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    classGroup: '9-12',
    createdAt: new Date()
  }
];

export const mockStudyMaterials: StudyMaterial[] = [
  {
    id: '1',
    title: 'Verb Tenses Worksheet',
    fileUrl: '/materials/verb-tenses.pdf',
    classGroup: '6-8',
    uploadedAt: new Date()
  },
  {
    id: '2',
    title: 'Essay Writing Guide',
    fileUrl: '/materials/essay-guide.pdf',
    classGroup: '9-12',
    uploadedAt: new Date()
  }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Weekend Class Schedule',
    content: 'This weekend we have special grammar classes on Saturday and spoken English practice on Sunday.',
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'New Study Materials Available',
    content: 'Download the latest practice worksheets for your class group from the study materials section.',
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }
];

export const mockStudents: User[] = [
  {
    id: '1',
    uid: '1',
    name: 'Rahul Kumar',
    email: 'rahul@example.com',
    role: 'student',
    classGroup: '6-8',
    createdAt: new Date()
  },
  {
    id: '2',
    uid: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'student',
    classGroup: '9-12',
    createdAt: new Date()
  }
];
