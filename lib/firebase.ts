import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/firebase/firebaseConfig';
import { User, LiveClass, RecordedClass, StudyMaterial, Announcement, ClassGroup } from '@/types';

// User operations
export const createUser = async (userData: Omit<User, 'createdAt'>) => {
  const userDoc = {
    ...userData,
    createdAt: new Date()
  };
  return await addDoc(collection(db, 'users'), userDoc);
};

export const getUser = async (uid: string): Promise<User | null> => {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as User;
};

export const getAllStudents = async (): Promise<User[]> => {
  const q = query(collection(db, 'users'), where('role', '==', 'student'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
};

// Live Class operations
export const addLiveClass = async (classData: Omit<LiveClass, 'id' | 'createdAt'>) => {
  const classDoc = {
    ...classData,
    createdAt: new Date()
  };
  return await addDoc(collection(db, 'liveClasses'), classDoc);
};

export const getLiveClasses = async (classGroup?: ClassGroup): Promise<LiveClass[]> => {
  let q = query(collection(db, 'liveClasses'), orderBy('date', 'asc'));
  if (classGroup) {
    q = query(q, where('classGroup', '==', classGroup));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LiveClass[];
};

export const getUpcomingLiveClasses = async (classGroup?: ClassGroup): Promise<LiveClass[]> => {
  const now = new Date();
  let q = query(
    collection(db, 'liveClasses'), 
    where('date', '>=', now),
    orderBy('date', 'asc'),
    limit(5)
  );
  if (classGroup) {
    q = query(q, where('classGroup', '==', classGroup));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as LiveClass[];
};

// Recorded Class operations
export const addRecordedClass = async (classData: Omit<RecordedClass, 'id' | 'createdAt'>) => {
  const classDoc = {
    ...classData,
    createdAt: new Date()
  };
  return await addDoc(collection(db, 'recordedClasses'), classDoc);
};

export const getRecordedClasses = async (classGroup?: ClassGroup): Promise<RecordedClass[]> => {
  let q = query(collection(db, 'recordedClasses'), orderBy('createdAt', 'desc'));
  if (classGroup) {
    q = query(q, where('classGroup', '==', classGroup));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as RecordedClass[];
};

// Study Material operations
export const uploadStudyMaterial = async (file: File, title: string, classGroup: ClassGroup) => {
  const storageRef = ref(storage, `study-materials/${classGroup}/${file.name}`);
  await uploadBytes(storageRef, file);
  const fileUrl = await getDownloadURL(storageRef);
  
  const materialDoc = {
    title,
    fileUrl,
    classGroup,
    uploadedAt: new Date()
  };
  return await addDoc(collection(db, 'materials'), materialDoc);
};

export const getStudyMaterials = async (classGroup?: ClassGroup): Promise<StudyMaterial[]> => {
  let q = query(collection(db, 'materials'), orderBy('uploadedAt', 'desc'));
  if (classGroup) {
    q = query(q, where('classGroup', '==', classGroup));
  }
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as StudyMaterial[];
};

// Announcement operations
export const addAnnouncement = async (announcementData: Omit<Announcement, 'id' | 'createdAt'>) => {
  const announcementDoc = {
    ...announcementData,
    createdAt: new Date()
  };
  return await addDoc(collection(db, 'announcements'), announcementDoc);
};

export const getAnnouncements = async (): Promise<Announcement[]> => {
  const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(10));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Announcement[];
};
