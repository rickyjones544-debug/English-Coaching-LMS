'use client';

import { useEffect, useState } from 'react';
import { getAnnouncements } from '@/lib/firebase';
import { Announcement } from '@/types';
import { 
  Bell, 
  Calendar, 
  User,
  Search,
  Megaphone
} from 'lucide-react';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const announcementsData = await getAnnouncements();
        setAnnouncements(announcementsData);
        setFilteredAnnouncements(announcementsData);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    let filtered = announcements;

    if (searchTerm) {
      filtered = filtered.filter(announcement => 
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAnnouncements(filtered);
  }, [searchTerm, announcements]);

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

  const isRecent = (date: Date) => {
    const now = new Date();
    const announcementDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - announcementDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Announcements</h1>
        <p className="text-gray-600">Stay updated with the latest news and updates from Rajan Sir</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className="text-center py-12">
          <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No announcements found</h3>
          <p className="text-gray-600">
            {searchTerm 
              ? 'Try adjusting your search criteria'
              : 'No announcements available at the moment. Check back soon!'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredAnnouncements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`
                bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition
                ${isRecent(announcement.createdAt) ? 'border-l-4 border-l-blue-500' : 'border border-gray-200'}
              `}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {announcement.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(announcement.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        Rajan Sir
                      </div>
                    </div>
                  </div>
                </div>
                {isRecent(announcement.createdAt) && (
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    NEW
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {announcement.content}
                </p>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">
                    Posted on {formatDate(announcement.createdAt)} at {formatTime(announcement.createdAt)}
                  </p>
                  {isRecent(announcement.createdAt) && (
                    <span className="text-sm text-blue-600 font-medium">
                      Recent Announcement
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">{announcements.length}</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Total Announcements</h3>
          <p className="text-gray-600 text-sm">All time</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {announcements.filter(a => isRecent(a.createdAt)).length}
            </span>
          </div>
          <h3 className="text-gray-900 font-semibold">Recent Updates</h3>
          <p className="text-gray-600 text-sm">Last 7 days</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Active</span>
          </div>
          <h3 className="text-gray-900 font-semibold">Status</h3>
          <p className="text-gray-600 text-sm">System running</p>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">About Announcements</h3>
        <div className="space-y-2 text-blue-800">
          <p>• All important updates and notices will be posted here</p>
          <p>• Check regularly for class schedules, exam dates, and other information</p>
          <p>• Recent announcements (within 7 days) are marked as "NEW"</p>
          <p>• For urgent matters, contact Rajan Sir directly</p>
        </div>
      </div>
    </div>
  );
}
