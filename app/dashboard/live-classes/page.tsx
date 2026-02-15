'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getLiveClasses } from '@/lib/firebase';
import { LiveClass } from '@/types';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users,
  ExternalLink,
  Filter
} from 'lucide-react';

export default function LiveClassesPage() {
  const { user } = useAuth();
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<LiveClass[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesData = await getLiveClasses(user?.classGroup);
        setLiveClasses(classesData);
        setFilteredClasses(classesData);
      } catch (error) {
        console.error('Error fetching live classes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClasses();
    }
  }, [user]);

  useEffect(() => {
    const now = new Date();
    let filtered = liveClasses;

    if (selectedFilter === 'upcoming') {
      filtered = liveClasses.filter(cls => new Date(cls.date) >= now);
    } else if (selectedFilter === 'past') {
      filtered = liveClasses.filter(cls => new Date(cls.date) < now);
    }

    setFilteredClasses(filtered);
  }, [selectedFilter, liveClasses]);

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

  const isClassActive = (date: Date) => {
    const classTime = new Date(date);
    const now = new Date();
    const timeDiff = Math.abs(classTime.getTime() - now.getTime());
    const minutesDiff = Math.ceil(timeDiff / (1000 * 60));
    return minutesDiff <= 60 && classTime >= now;
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Classes</h1>
        <p className="text-gray-600">Join interactive live sessions with Rajan Sir</p>
      </div>

      {/* Filter Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {[
            { value: 'all', label: 'All Classes' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'past', label: 'Past Classes' }
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value as any)}
              className={`
                px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${selectedFilter === filter.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                }
              `}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="text-center py-12">
          <Video className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No classes found</h3>
          <p className="text-gray-600">
            {selectedFilter === 'upcoming' 
              ? 'No upcoming classes scheduled. Check back soon!'
              : selectedFilter === 'past'
              ? 'No past classes yet.'
              : 'No classes available at the moment.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((liveClass) => {
            const isActive = isClassActive(liveClass.date);
            const isPast = new Date(liveClass.date) < new Date();
            
            return (
              <div key={liveClass.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${isActive 
                        ? 'bg-green-100 text-green-800' 
                        : isPast 
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-blue-100 text-blue-800'
                      }
                    `}>
                      {isActive ? 'LIVE NOW' : isPast ? 'COMPLETED' : 'UPCOMING'}
                    </span>
                    <Video className="w-5 h-5 text-gray-400" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {liveClass.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {liveClass.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                      {formatDate(liveClass.date)}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-gray-400" />
                      {formatTime(liveClass.date)}
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users className="w-4 h-4 mr-2 text-gray-400" />
                      Class {liveClass.classGroup}
                    </div>
                  </div>
                  
                  {isActive ? (
                    <a
                      href={liveClass.zoomLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Join Live Class
                    </a>
                  ) : isPast ? (
                    <button 
                      disabled
                      className="w-full bg-gray-200 text-gray-500 py-2 rounded-lg cursor-not-allowed"
                    >
                      Class Completed
                    </button>
                  ) : (
                    <button 
                      disabled
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-not-allowed opacity-75"
                    >
                      Join at {formatTime(liveClass.date)}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Join Live Classes</h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            Check the schedule for upcoming classes
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            Join 5 minutes before the class starts
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            Click "Join Live Class" when it becomes active
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            Ensure you have a stable internet connection
          </li>
        </ol>
      </div>
    </div>
  );
}
