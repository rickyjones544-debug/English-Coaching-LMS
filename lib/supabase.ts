import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgwpzobqqaevyehrhwwc.supabase.co';
const supabaseAnonKey = 'sb_publishable_pBDynIDy1qFj0cDvYn-OEg_ZxP9eLVQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// User operations
export const createUser = async (userData: any) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getUser = async (uid: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('uid', uid)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const getAllStudents = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'student');
  
  if (error) throw error;
  return data;
};

// Live Class operations
export const addLiveClass = async (classData: any) => {
  const { data, error } = await supabase
    .from('liveClasses')
    .insert([classData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getLiveClasses = async (classGroup?: string) => {
  let query = supabase
    .from('liveClasses')
    .select('*')
    .order('date', { ascending: true });
  
  if (classGroup) {
    query = query.eq('classGroup', classGroup);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

export const getUpcomingLiveClasses = async (classGroup?: string) => {
  const now = new Date().toISOString();
  let query = supabase
    .from('liveClasses')
    .select('*')
    .gte('date', now)
    .order('date', { ascending: true })
    .limit(5);
  
  if (classGroup) {
    query = query.eq('classGroup', classGroup);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Recorded Class operations
export const addRecordedClass = async (classData: any) => {
  const { data, error } = await supabase
    .from('recordedClasses')
    .insert([classData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getRecordedClasses = async (classGroup?: string) => {
  let query = supabase
    .from('recordedClasses')
    .select('*')
    .order('createdAt', { ascending: false });
  
  if (classGroup) {
    query = query.eq('classGroup', classGroup);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Study Material operations
export const uploadStudyMaterial = async (materialData: any) => {
  const { data, error } = await supabase
    .from('materials')
    .insert([materialData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getStudyMaterials = async (classGroup?: string) => {
  let query = supabase
    .from('materials')
    .select('*')
    .order('uploadedAt', { ascending: false });
  
  if (classGroup) {
    query = query.eq('classGroup', classGroup);
  }
  
  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Announcement operations
export const addAnnouncement = async (announcementData: any) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert([announcementData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};

export const getAnnouncements = async () => {
  const { data, error } = await supabase
    .from('announcements')
    .select('*')
    .order('createdAt', { ascending: false })
    .limit(10);
  
  if (error) throw error;
  return data;
};

// Authentication helpers
export const signUpUser = async (email: string, password: string, name: string, classGroup: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        classGroup,
        role: 'student'
      }
    }
  });
  
  if (error) throw error;
  
  // Create user record in users table
  if (data.user) {
    await createUser({
      uid: data.user.id,
      email: data.user.email!,
      name,
      role: 'student',
      classGroup: classGroup as '1-5' | '6-8' | '9-12',
      createdAt: new Date()
    });

    // Send notification email to admin
    try {
      const notificationMessage = `🎓 New Student Registration at Ideal Education by Ashutosh Sir

👤 Student Details:
• Name: ${name}
• Email: ${email}
• Class Group: ${classGroup}
• Registration Date: ${new Date().toLocaleString()}

📱 Contact Information:
• WhatsApp: +91 91552 92575
• Email: ashutoshrajan303@gmail.com

🌐 Please login to your admin dashboard to manage this student.
`;

      // Send email notification (using mailto as fallback)
      const subject = `New Student Registration: ${name}`;
      const mailtoUrl = `mailto:ashutoshrajan303@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(notificationMessage)}`;
      
      // In a real implementation, you would use an email service here
      // For now, this opens the email client with the notification
      if (typeof window !== 'undefined') {
        window.open(mailtoUrl, '_blank');
      }

      // Send WhatsApp notification
      const whatsappMessage = `🎓 New Student Registration!\n\n👤 Name: ${name}\n📧 Email: ${email}\n📚 Class: ${classGroup}\n📅 Date: ${new Date().toLocaleString()}`;
      const whatsappUrl = `https://wa.me/919155292575?text=${encodeURIComponent(whatsappMessage)}`;
      
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
        }, 2000);
      }
    } catch (notificationError) {
      console.log('Notification failed:', notificationError);
    }
  }
  
  return data;
};

export const signInUser = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Contact Form operations
export const submitContactForm = async (contactData: any) => {
  const { data, error } = await supabase
    .from('contactSubmissions')
    .insert([contactData])
    .select();
  
  if (error) throw error;
  return data?.[0];
};
