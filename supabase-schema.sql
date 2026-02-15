-- Create tables for English Coaching LMS

-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'student')),
  classGroup TEXT NOT NULL CHECK (classGroup IN ('1-5', '6-8', '9-12')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Live Classes table
CREATE TABLE liveClasses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  classGroup TEXT NOT NULL CHECK (classGroup IN ('1-5', '6-8', '9-12')),
  zoomLink TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recorded Classes table
CREATE TABLE recordedClasses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  videoUrl TEXT NOT NULL,
  classGroup TEXT NOT NULL CHECK (classGroup IN ('1-5', '6-8', '9-12')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study Materials table
CREATE TABLE materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  fileUrl TEXT NOT NULL,
  classGroup TEXT NOT NULL CHECK (classGroup IN ('1-5', '6-8', '9-12')),
  uploadedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements table
CREATE TABLE announcements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE liveClasses ENABLE ROW LEVEL SECURITY;
ALTER TABLE recordedClasses ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid()::text = uid);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid()::text = uid);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = uid);

-- Public read policies for educational content
CREATE POLICY "Live classes are publicly readable" ON liveClasses FOR SELECT USING (true);
CREATE POLICY "Recorded classes are publicly readable" ON recordedClasses FOR SELECT USING (true);
CREATE POLICY "Study materials are publicly readable" ON materials FOR SELECT USING (true);
CREATE POLICY "Announcements are publicly readable" ON announcements FOR SELECT USING (true);

-- Admin policies for content management
CREATE POLICY "Admins can manage live classes" ON liveClasses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.uid = auth.uid()::text AND users.role = 'admin')
);
CREATE POLICY "Admins can manage recorded classes" ON recordedClasses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.uid = auth.uid()::text AND users.role = 'admin')
);
CREATE POLICY "Admins can manage materials" ON materials FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.uid = auth.uid()::text AND users.role = 'admin')
);
CREATE POLICY "Admins can manage announcements" ON announcements FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE users.uid = auth.uid()::text AND users.role = 'admin')
);

-- Create indexes for better performance
CREATE INDEX idx_users_uid ON users(uid);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_classGroup ON users(classGroup);

CREATE INDEX idx_liveClasses_date ON liveClasses(date);
CREATE INDEX idx_liveClasses_classGroup ON liveClasses(classGroup);

CREATE INDEX idx_recordedClasses_classGroup ON recordedClasses(classGroup);
CREATE INDEX idx_recordedClasses_created_at ON recordedClasses(created_at);

CREATE INDEX idx_materials_classGroup ON materials(classGroup);
CREATE INDEX idx_materials_uploadedAt ON materials(uploadedAt);

CREATE INDEX idx_announcements_created_at ON announcements(created_at);

-- Insert sample data
INSERT INTO users (uid, name, email, role, classGroup) VALUES
('admin-uid', 'Admin User', 'admin@idealcoaching.com', 'admin', '9-12'),
('student-uid-1', 'Rahul Kumar', 'rahul@example.com', 'student', '6-8'),
('student-uid-2', 'Priya Sharma', 'priya@example.com', 'student', '9-12');

INSERT INTO liveClasses (title, description, classGroup, zoomLink, date) VALUES
('Spoken English Basics', 'Learn fundamental spoken English skills', '6-8', 'https://zoom.us/j/123456789', NOW() + INTERVAL '1 day'),
('Grammar Workshop', 'Advanced grammar concepts', '9-12', 'https://zoom.us/j/987654321', NOW() + INTERVAL '2 days');

INSERT INTO recordedClasses (title, description, videoUrl, classGroup) VALUES
('Introduction to Verbs', 'Understanding different types of verbs', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '6-8'),
('Sentence Structure', 'Building proper English sentences', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', '9-12');

INSERT INTO materials (title, fileUrl, classGroup) VALUES
('Verb Tenses Worksheet', '/materials/verb-tenses.pdf', '6-8'),
('Essay Writing Guide', '/materials/essay-guide.pdf', '9-12');

INSERT INTO announcements (title, content) VALUES
('Weekend Class Schedule', 'This weekend we have special grammar classes on Saturday and spoken English practice on Sunday.'),
('New Study Materials Available', 'Download the latest practice worksheets for your class group from the study materials section.');
