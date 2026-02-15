'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getStudyMaterials } from '@/lib/supabase';
import { StudyMaterial } from '@/types';
import { 
  Download, 
  FileText, 
  Calendar, 
  Users,
  Search,
  Filter,
  Eye
} from 'lucide-react';

export default function StudyMaterialsPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<StudyMaterial[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassGroup, setSelectedClassGroup] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const materialsData = await getStudyMaterials(user?.classGroup);
        setMaterials(materialsData);
        setFilteredMaterials(materialsData);
      } catch (error) {
        console.error('Error fetching study materials:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMaterials();
    }
  }, [user]);

  useEffect(() => {
    let filtered = materials;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(material => 
        material.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by class group
    if (selectedClassGroup !== 'all') {
      filtered = filtered.filter(material => material.classGroup === selectedClassGroup);
    }

    setFilteredMaterials(filtered);
  }, [searchTerm, selectedClassGroup, materials]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = (url: string, title: string) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (url: string) => {
    window.open(url, '_blank');
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h1>
        <p className="text-gray-600">Download and access comprehensive learning resources</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search materials..."
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

      {filteredMaterials.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No study materials found</h3>
          <p className="text-gray-600">
            {searchTerm || selectedClassGroup !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'No study materials available yet. Check back soon!'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                    PDF
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {material.title}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    Class {material.classGroup}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {formatDate(material.uploadedAt)}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePreview(material.fileUrl)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                  <button
                    onClick={() => handleDownload(material.fileUrl, material.title)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Categories */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Material Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Grammar Notes</h3>
            <p className="text-blue-700 mb-4">Comprehensive grammar rules and examples</p>
            <div className="text-blue-600 font-semibold">12 Materials</div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-3">Practice Worksheets</h3>
            <p className="text-green-700 mb-4">Interactive exercises and practice sheets</p>
            <div className="text-green-600 font-semibold">8 Materials</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-900 mb-3">Vocabulary Builders</h3>
            <p className="text-purple-700 mb-4">Word lists and vocabulary enhancement tools</p>
            <div className="text-purple-600 font-semibold">15 Materials</div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">How to Use Study Materials</h3>
        <ol className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="font-semibold mr-2">1.</span>
            Browse materials by your class group or search for specific topics
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">2.</span>
            Click "Preview" to view the material in your browser
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">3.</span>
            Click "Download" to save the material for offline study
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">4.</span>
            Practice regularly and review materials before exams
          </li>
        </ol>
      </div>
    </div>
  );
}
