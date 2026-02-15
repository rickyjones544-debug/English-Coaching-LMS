'use client';

import Link from 'next/link';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award,
  CheckCircle,
  Star,
  MessageSquare,
  ChevronRight,
  Play,
  Calendar,
  Clock,
  Video,
  Download
} from 'lucide-react';

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        background: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#3b82f6' }}>
            Ideal Coaching Classes
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
            <Link href="#about" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>About</Link>
            <Link href="#courses" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>Courses</Link>
            <Link href="#contact" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>Contact</Link>
            <Link 
              href="/auth/login" 
              style={{ 
                background: '#3b82f6', 
                color: 'white', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '0.5rem', 
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '5rem 2rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            Master English with Confidence
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', lineHeight: '1.6' }}>
            Join the best English coaching classes for students from Class 1 to 12. 
            Expert teachers, interactive learning, and proven results.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link 
              href="/auth/register"
              style={{
                background: '#10b981',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Users size={20} />
              Start Learning Today
            </Link>
            <Link 
              href="#courses"
              style={{
                background: 'transparent',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: '2px solid white',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <BookOpen size={20} />
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{ padding: '4rem 2rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>
              About Our Founder
            </h2>
            <div style={{
              width: '100px',
              height: '100px',
              background: '#e5e7eb',
              borderRadius: '50%',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap size={40} color="#6b7280" />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1f2937' }}>
                Expert English Educator
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem' }}>
                With over 10 years of experience in teaching English to Indian students, 
                our founder has helped thousands of students achieve fluency and confidence in English communication.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={20} color="#10b981" />
                  <span style={{ color: '#4b5563' }}>Certified English Teacher</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={20} color="#10b981" />
                  <span style={{ color: '#4b5563' }}>5000+ Students Taught</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Award size={20} color="#10b981" />
                  <span style={{ color: '#4b5563' }}>95% Success Rate</span>
                </div>
              </div>
            </div>
            <div>
              <div style={{
                background: '#ddd6fe',
                borderRadius: '1rem',
                padding: '2rem',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#1f2937' }}>
                  Our Teaching Philosophy
                </h4>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563' }}>
                  We believe in making English learning fun, interactive, and practical. 
                  Our classes focus on real-world communication skills that students can use immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" style={{ padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1f2937' }}>
            Our Courses
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '3rem' }}>
            Comprehensive English programs designed for every age group
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#fef3c7',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={30} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                Classes 1-5
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Basic English fundamentals, reading comprehension, and foundational grammar for young learners.
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#dbeafe',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GraduationCap size={30} color="#3b82f6" />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                Classes 6-8
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Intermediate grammar, composition skills, and spoken English practice for growing students.
              </p>
            </div>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#e0e7ff',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Award size={30} color="#6366f1" />
              </div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                Classes 9-12
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Advanced grammar, literature analysis, and exam preparation for senior students.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 2rem', background: '#f3f4f6' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: '#1f2937' }}>
            Why Choose Ideal Coaching Classes?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#10b981',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Video size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                Live Interactive Classes
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Real-time virtual classes with experienced teachers and interactive learning.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#3b82f6',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Download size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                Study Materials
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Comprehensive PDFs, worksheets, and practice materials for all levels.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: '#f59e0b',
                borderRadius: '50%',
                margin: '0 auto 1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Star size={40} color="white" />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#1f2937' }}>
                Expert Teachers
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.6' }}>
                Qualified and experienced teachers dedicated to student success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '4rem 2rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center', color: '#1f2937' }}>
            What Our Students Say
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{
              background: '#f9fafb',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: '#4b5563', marginBottom: '1rem' }}>
                "Ideal Coaching Classes transformed my English skills. The teachers are amazing and the classes are so interactive!"
              </p>
              <p style={{ fontWeight: '600', color: '#1f2937' }}>
                - Priya Sharma, Class 8
              </p>
            </div>
            <div style={{
              background: '#f9fafb',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: '#4b5563', marginBottom: '1rem' }}>
                "I joined for spoken English classes and now I can speak confidently. Best decision ever!"
              </p>
              <p style={{ fontWeight: '600', color: '#1f2937' }}>
                - Rahul Kumar, Class 10
              </p>
            </div>
            <div style={{
              background: '#f9fafb',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', marginBottom: '1rem' }}>
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} size={16} color="#f59e0b" fill="#f59e0b" />
                ))}
              </div>
              <p style={{ fontStyle: 'italic', color: '#4b5563', marginBottom: '1rem' }}>
                "The personalized attention and expert guidance helped me score excellent marks in exams."
              </p>
              <p style={{ fontWeight: '600', color: '#1f2937' }}>
                - Anjali Reddy, Class 12
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>
            Ready to Start Your English Learning Journey?
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'white', marginBottom: '2rem' }}>
            Join thousands of successful students and master English with confidence.
          </p>
          <Link 
            href="/auth/register"
            style={{
              background: 'white',
              color: '#667eea',
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Enroll Now
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        background: '#1f2937', 
        color: 'white', 
        padding: '2rem', 
        textAlign: 'center' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>
            &copy; 2024 Ideal Coaching Classes. All rights reserved.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            <Link href="#contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</Link>
            <Link href="#courses" style={{ color: 'white', textDecoration: 'none' }}>Courses</Link>
            <Link href="/auth/login" style={{ color: 'white', textDecoration: 'none' }}>Student Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
