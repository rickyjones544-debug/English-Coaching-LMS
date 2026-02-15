'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthContext';
import { Eye, EyeOff, Mail, Lock, User, GraduationCap } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    classGroup: '1-5'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      await signUp(formData.email, formData.password, formData.name, formData.classGroup);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
      <div style={{maxWidth: '400px', width: '100%', background: 'white', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '2rem'}}>
        <div style={{textAlign: 'center', marginBottom: '2rem'}}>
          <div style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', background: '#3b82f6', borderRadius: '50%', marginBottom: '1rem'}}>
            <GraduationCap style={{width: '2rem', height: '2rem', color: 'white'}} />
          </div>
          <h1 style={{fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>Create Account</h1>
          <p style={{color: '#6b7280'}}>Join Ideal Coaching Classes</p>
        </div>

        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
              Full Name
            </label>
            <div style={{position: 'relative'}}>
              <User style={{position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1.25rem', height: '1.25rem'}} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.15s'}}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
              Email Address
            </label>
            <div style={{position: 'relative'}}>
              <Mail style={{position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1.25rem', height: '1.25rem'}} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{width: '100%', paddingLeft: '2.5rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.15s'}}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
              Class Group
            </label>
            <select
              name="classGroup"
              value={formData.classGroup}
              onChange={handleChange}
              required
              style={{width: '100%', paddingLeft: '1rem', paddingRight: '1rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.15s'}}
            >
              <option value="1-5">Class 1-5</option>
              <option value="6-8">Class 6-8</option>
              <option value="9-12">Class 9-12</option>
            </select>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
              Password
            </label>
            <div style={{position: 'relative'}}>
              <Lock style={{position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1.25rem', height: '1.25rem'}} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{width: '100%', paddingLeft: '2.5rem', paddingRight: '3rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.15s'}}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem'}}
              >
                {showPassword ? <EyeOff style={{width: '1.25rem', height: '1.25rem'}} /> : <Eye style={{width: '1.25rem', height: '1.25rem'}} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem'}}>
              Confirm Password
            </label>
            <div style={{position: 'relative'}}>
              <Lock style={{position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', width: '1.25rem', height: '1.25rem'}} />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={{width: '100%', paddingLeft: '2.5rem', paddingRight: '3rem', paddingTop: '0.75rem', paddingBottom: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', outline: 'none', transition: 'border-color 0.15s'}}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem'}}
              >
                {showConfirmPassword ? <EyeOff style={{width: '1.25rem', height: '1.25rem'}} /> : <Eye style={{width: '1.25rem', height: '1.25rem'}} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '0.75rem 1rem', borderRadius: '0.5rem'}}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{width: '100%', background: '#3b82f6', color: 'white', paddingTop: '0.75rem', paddingBottom: '0.75rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1, transition: 'background-color 0.15s'}}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{marginTop: '1.5rem', textAlign: 'center'}}>
          <p style={{color: '#6b7280'}}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{color: '#3b82f6', textDecoration: 'none', fontWeight: '600'}}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
