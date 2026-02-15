'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getRecordedClasses } from '@/lib/supabase';
import { RecordedClass } from '@/types';
import { 
  Play, 
  Clock, 
  BookOpen, 
  Users,
  Search,
  Filter
} from 'lucide-react';

export default function RecordedClassesPage() {
  const { user } = useAuth();
  const [recordedClasses, setRecordedClasses] = useState<RecordedClass[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<RecordedClass[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassGroup, setSelectedClassGroup] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const classesData = await getRecordedClasses(user?.classGroup);
        setRecordedClasses(classesData);
        setFilteredClasses(classesData);
      } catch (error) {
        console.error('Error fetching recorded classes:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchClasses();
    }
  }, [user]);

  useEffect(() => {
    let filtered = recordedClasses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(cls => 
        cls.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cls.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by class group
    if (selectedClassGroup !== 'all') {
      filtered = filtered.filter(cls => cls.classGroup === selectedClassGroup);
    }

    setFilteredClasses(filtered);
  }, [searchTerm, selectedClassGroup, recordedClasses]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (url: string) => {
    const videoId = getVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '/api/placeholder/320/180';
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Recorded Classes</h1>
        <p className="text-gray-600">Watch previous classes at your own pace</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search classes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={selectedClassGroup}
            onChange={(e) => setSelectedClassGroup(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Classes</option>
            <option value="1-5">Class 1-5</option>
            <option value="6-8">Class 6-8</option>
            <option value="9-12">Class 9-12</option>
          </select>
        </div>
      </div>

      {filteredClasses.length === 0 ? (
        <div className="text-center py-12">
          <Play className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recorded classes found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedClassGroup !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'No recorded classes available yet. Check back soon!'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((recordedClass) => (
            <div key={recordedClass.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-100">
                <img
                  src={getThumbnailUrl(recordedClass.videoUrl)}
                  alt={recordedClass.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition flex items-center justify-center">
                  <a
                    href={recordedClass.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition transform hover:scale-110"
                  >
                    <Play className="w-6 h-6" />
                  </a>
                </div>
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                  Recorded
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {recordedClass.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {recordedClass.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    Class {recordedClass.classGroup}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    {formatDate(recordedClass.createdAt)}
                  </div>
                </div>
                
                <a
                  href={recordedClass.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Watch Now
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Access Recorded Classes</h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            Browse through the available recorded classes
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            Click on "Watch Now" to open the video
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            Videos will open in YouTube in a new tab
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            Take notes and practice along with the lesson
          </li>
        </ol>
      </div>
    </div>
  );
}
