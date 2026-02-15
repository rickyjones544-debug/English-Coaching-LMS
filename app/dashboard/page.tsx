'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getUpcomingLiveClasses, getAnnouncements } from '@/lib/firebase';
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
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening in your English learning journey today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{upcomingClasses.length}</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Upcoming Classes</h3>
          <p className="text-gray-600 text-sm">This week</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Study Materials</h3>
          <p className="text-gray-600 text-sm">Available for download</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">85%</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Progress</h3>
          <p className="text-gray-600 text-sm">Course completion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Live Class */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Next Live Class</h2>
              <Video className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {upcomingClasses.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {upcomingClasses[0].title}
                  </h3>
                  <p className="text-gray-600 mb-4">{upcomingClasses[0].description}</p>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(upcomingClasses[0].date)}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatTime(upcomingClasses[0].date)}
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Join Class
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No upcoming classes scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Latest Announcements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Latest Announcements</h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            {announcements.length > 0 ? (
              <div className="space-y-4">
                {announcements.slice(0, 3).map((announcement) => (
                  <div key={announcement.id} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {announcement.content}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {formatDate(announcement.createdAt)}
                    </p>
                  </div>
                ))}
                {announcements.length > 3 && (
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View all announcements →
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No announcements yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <Video className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">View Live Classes</h3>
            <p className="text-gray-600 text-sm">Join upcoming sessions</p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <BookOpen className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Study Materials</h3>
            <p className="text-gray-600 text-sm">Download resources</p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Discussion Forum</h3>
            <p className="text-gray-600 text-sm">Connect with peers</p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <TrendingUp className="w-6 h-6 text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Progress Report</h3>
            <p className="text-gray-600 text-sm">Track your learning</p>
          </button>
        </div>
      </div>
    </div>
  );
}
