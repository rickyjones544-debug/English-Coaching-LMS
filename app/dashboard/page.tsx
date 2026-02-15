'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getUpcomingLiveClasses, getAnnouncements } from '@/lib/supabase';
import { LiveClass, Announcement } from '@/types';
import { 
  Calendar, 
  Clock, 
  Video, 
  Bell, 
  BookOpen,
  Users,
  TrendingUp
} from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [upcomingClasses, setUpcomingClasses] = useState<LiveClass[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use Supabase data
    const fetchData = async () => {
      try {
        const [classesData, announcementsData] = await Promise.all([
          getUpcomingLiveClasses(user?.classGroup),
          getAnnouncements()
        ]);
        setUpcomingClasses(classesData);
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div style={{padding: '2rem'}}>
        <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{
              height: '8rem',
              background: '#f3f4f6',
              borderRadius: '0.5rem',
              flex: 1,
              animation: 'pulse 2s infinite'
            }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{padding: '2rem'}}>
      {/* Welcome Section */}
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>
          Welcome back, {user?.name}!
        </h1>
        <p style={{color: '#6b7280'}}>
          Here's what's happening in your English learning journey today.
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
        <div style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: '#dbeafe',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Video style={{width: '1.5rem', height: '1.5rem', color: '#2563eb'}} />
            </div>
            <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937'}}>{upcomingClasses.length}</span>
          </div>
          <h3 style={{color: '#1f2937', fontWeight: '600'}}>Upcoming Classes</h3>
          <p style={{color: '#6b7280', fontSize: '0.875rem'}}>This week</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: '#d1fae5',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <BookOpen style={{width: '1.5rem', height: '1.5rem', color: '#059669'}} />
            </div>
            <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937'}}>12</span>
          </div>
          <h3 style={{color: '#1f2937', fontWeight: '600'}}>Study Materials</h3>
          <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Available for download</p>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '0.75rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
            <div style={{
              width: '3rem',
              height: '3rem',
              background: '#e9d5ff',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <TrendingUp style={{width: '1.5rem', height: '1.5rem', color: '#7c3aed'}} />
            </div>
            <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937'}}>85%</span>
          </div>
          <h3 style={{color: '#1f2937', fontWeight: '600'}}>Progress</h3>
          <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Course completion</p>
        </div>
      </div>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem'}}>
        {/* Next Live Class */}
        <div style={{
          background: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{padding: '1.5rem', borderBottom: '1px solid #e5e7eb'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <h2 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937'}}>Next Live Class</h2>
              <Video style={{width: '1.25rem', height: '1.25rem', color: '#9ca3af'}} />
            </div>
          </div>
          <div style={{padding: '1.5rem'}}>
            {upcomingClasses.length > 0 ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <h3 style={{fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem'}}>
                    {upcomingClasses[0].title}
                  </h3>
                  <p style={{color: '#6b7280', marginBottom: '1rem'}}>{upcomingClasses[0].description}</p>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', color: '#374151'}}>
                      <Calendar style={{width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#9ca3af'}} />
                      {formatDate(upcomingClasses[0].date)}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', color: '#374151'}}>
                      <Clock style={{width: '1rem', height: '1rem', marginRight: '0.5rem', color: '#9ca3af'}} />
                      {formatTime(upcomingClasses[0].date)}
                    </div>
                  </div>
                </div>
                <button style={{
                  width: '100%',
                  background: '#2563eb',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  Join Class
                </button>
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '2rem 0'}}>
                <Video style={{width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem'}} />
                <p style={{color: '#6b7280'}}>No upcoming classes scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Latest Announcements */}
        <div style={{
          background: 'white',
          borderRadius: '0.75rem',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{padding: '1.5rem', borderBottom: '1px solid #e5e7eb'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <h2 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937'}}>Latest Announcements</h2>
              <Bell style={{width: '1.25rem', height: '1.25rem', color: '#9ca3af'}} />
            </div>
          </div>
          <div style={{padding: '1.5rem'}}>
            {announcements.length > 0 ? (
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {announcements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} style={{
                    borderLeft: '4px solid #2563eb',
                    paddingLeft: '1rem'
                  }}>
                    <h3 style={{fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem'}}>
                      {announcement.title}
                    </h3>
                    <p style={{color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem'}}>
                      {announcement.content}
                    </p>
                    <p style={{color: '#9ca3af', fontSize: '0.75rem'}}>
                      {formatDate(announcement.createdAt)}
                    </p>
                  </div>
                ))}
                {announcements.length > 3 && (
                  <button style={{
                    color: '#2563eb',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    View all announcements →
                  </button>
                )}
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '2rem 0'}}>
                <Bell style={{width: '3rem', height: '3rem', color: '#d1d5db', margin: '0 auto 1rem'}} />
                <p style={{color: '#6b7280'}}>No announcements yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{marginTop: '2rem'}}>
        <h2 style={{fontSize: '1.25rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem'}}>Quick Actions</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
          <button style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'box-shadow 0.2s'
          }}>
            <Video style={{width: '1.5rem', height: '1.5rem', color: '#2563eb', marginBottom: '0.5rem'}} />
            <h3 style={{fontWeight: '600', color: '#1f2937'}}>View Live Classes</h3>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Join upcoming sessions</p>
          </button>
          <button style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'box-shadow 0.2s'
          }}>
            <BookOpen style={{width: '1.5rem', height: '1.5rem', color: '#059669', marginBottom: '0.5rem'}} />
            <h3 style={{fontWeight: '600', color: '#1f2937'}}>Study Materials</h3>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Download resources</p>
          </button>
          <button style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'box-shadow 0.2s'
          }}>
            <Users style={{width: '1.5rem', height: '1.5rem', color: '#7c3aed', marginBottom: '0.5rem'}} />
            <h3 style={{fontWeight: '600', color: '#1f2937'}}>Discussion Forum</h3>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Connect with peers</p>
          </button>
          <button style={{
            background: 'white',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid #e5e7eb',
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'box-shadow 0.2s'
          }}>
            <TrendingUp style={{width: '1.5rem', height: '1.5rem', color: '#ea580c', marginBottom: '0.5rem'}} />
            <h3 style={{fontWeight: '600', color: '#1f2937'}}>Progress Report</h3>
            <p style={{color: '#6b7280', fontSize: '0.875rem'}}>Track your learning</p>
          </button>
        </div>
      </div>
    </div>
  );
}
