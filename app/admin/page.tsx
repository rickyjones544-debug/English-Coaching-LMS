'use client';

import { useEffect, useState } from 'react';
import { getAllStudents } from '@/lib/supabase';
import { User } from '@/types';
import { 
  Users, 
  Video, 
  BookOpen, 
  FileText, 
  Bell,
  TrendingUp,
  Calendar,
  Clock,
  GraduationCap
} from 'lucide-react';

export default function AdminDashboard() {
  const [students, setStudents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsData = await getAllStudents();
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const studentsByClassGroup = {
    '1-5': students.filter(s => s.classGroup === '1-5').length,
    '6-8': students.filter(s => s.classGroup === '6-8').length,
    '9-12': students.filter(s => s.classGroup === '9-12').length,
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
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
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your Ideal Coaching Classes platform
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{students.length}</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Total Students</h3>
          <p className="text-gray-600 text-sm">Registered users</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">8</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Live Classes</h3>
          <p className="text-gray-600 text-sm">This month</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">24</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Recorded Classes</h3>
          <p className="text-gray-600 text-sm">Total available</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">35</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Study Materials</h3>
          <p className="text-gray-600 text-sm">Available for download</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Students by Class Group */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Students by Class Group</h2>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Class 1-5</h3>
                    <p className="text-gray-600 text-sm">Primary level</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{studentsByClassGroup['1-5']}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Class 6-8</h3>
                    <p className="text-gray-600 text-sm">Middle school</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{studentsByClassGroup['6-8']}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Class 9-12</h3>
                    <p className="text-gray-600 text-sm">High school</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-gray-900">{studentsByClassGroup['9-12']}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Video className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Live class scheduled</p>
                  <p className="text-gray-600 text-sm">Grammar Basics - Class 6-8</p>
                  <p className="text-gray-500 text-xs">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">New study material uploaded</p>
                  <p className="text-gray-600 text-sm">Verb Tenses Worksheet</p>
                  <p className="text-gray-500 text-xs">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">New student registered</p>
                  <p className="text-gray-600 text-sm">Priya Sharma - Class 8</p>
                  <p className="text-gray-500 text-xs">1 day ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bell className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-medium">Announcement posted</p>
                  <p className="text-gray-600 text-sm">Weekend batch schedule updated</p>
                  <p className="text-gray-500 text-xs">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <Video className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Add Live Class</h3>
            <p className="text-gray-600 text-sm">Schedule new session</p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <BookOpen className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Add Recording</h3>
            <p className="text-gray-600 text-sm">Upload class video</p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <FileText className="w-6 h-6 text-purple-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Upload Material</h3>
            <p className="text-gray-600 text-sm">Add study resources</p>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition text-left">
            <Bell className="w-6 h-6 text-orange-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Post Announcement</h3>
            <p className="text-gray-600 text-sm">Send updates</p>
          </button>
        </div>
      </div>

      {/* Upcoming Schedule */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Today's Schedule</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Spoken English Practice</h3>
                <p className="text-gray-600">Class 6-8 • 10:00 AM - 11:00 AM</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                Active
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Grammar Workshop</h3>
                <p className="text-gray-600">Class 9-12 • 2:00 PM - 3:30 PM</p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Upcoming
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
