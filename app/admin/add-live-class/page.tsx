'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addLiveClass } from '@/lib/firebase';
import { LiveClass } from '@/types';
import { 
  Video, 
  Calendar, 
  Clock, 
  Users,
  Link,
  Save,
  ArrowLeft
} from 'lucide-react';

export default function AddLiveClassPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    classGroup: '1-5' as '1-5' | '6-8' | '9-12',
    zoomLink: '',
    date: '',
    time: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Combine date and time to create a proper Date object
      const dateTime = new Date(`${formData.date}T${formData.time}`);
      
      const classData: Omit<LiveClass, 'id' | 'createdAt'> = {
        title: formData.title,
        description: formData.description,
        classGroup: formData.classGroup,
        zoomLink: formData.zoomLink,
        date: dateTime
      };

      await addLiveClass(classData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        classGroup: '1-5',
        zoomLink: '',
        date: '',
        time: ''
      });
    } catch (error: any) {
      setError(error.message || 'Failed to add live class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Live Class</h1>
        <p className="text-gray-600">Schedule a new live class for your students</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          Live class scheduled successfully!
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Spoken English Practice Session"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe what will be covered in this class..."
              />
            </div>

            {/* Class Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Class Group *
              </label>
              <select
                name="classGroup"
                value={formData.classGroup}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="1-5">Class 1-5</option>
                <option value="6-8">Class 6-8</option>
                <option value="9-12">Class 9-12</option>
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Zoom Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zoom Meeting Link *
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  name="zoomLink"
                  value={formData.zoomLink}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://zoom.us/j/..."
                />
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Students will be able to join using this link when the class is active
              </p>
            </div>
          </div>

          <div className="mt-8 flex space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Schedule Class
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Scheduling Live Classes</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="font-semibold mr-2">•</span>
            Schedule classes at least 24 hours in advance to give students time to prepare
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">•</span>
            Use descriptive titles so students know what to expect
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">•</span>
            Test your Zoom link before scheduling to ensure it works properly
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">•</span>
            Consider different time zones if you have students from various regions
          </li>
        </ul>
      </div>
    </div>
  );
}
