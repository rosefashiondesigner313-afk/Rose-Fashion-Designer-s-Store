'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react'; // 👈 Icons import kiye hain

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 👈 New password toggle state
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // 👈 Confirm password toggle state
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setMessage('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="text-center p-8 text-red-500">
        Invalid Password Reset Token.
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="font-serif text-3xl font-bold text-brand-900 text-center mb-2">Set New Password</h2>
        <p className="text-gray-500 text-sm text-center mb-6">Enter your new password below.</p>

        {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 text-center">{error}</div>}
        {message && <div className="bg-green-50 text-green-600 text-sm p-3 rounded-md mb-4 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* New Password Field with Eye Icon */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase mb-2">New Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-brand-900 bg-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-900 p-1"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field with Eye Icon */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase mb-2">Confirm New Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                required 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-brand-900 bg-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-900 p-1"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-brand-900 text-cream py-3 rounded-md font-bold uppercase hover:bg-brand-800 transition-colors mt-4 disabled:opacity-70"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}