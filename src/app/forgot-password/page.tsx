'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError('Failed to send request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="font-serif text-3xl font-bold text-brand-900 text-center mb-2">Forgot Password</h2>
        <p className="text-gray-500 text-sm text-center mb-6">Enter your registered email address to receive a password reset link.</p>

        {error && <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-4 text-center">{error}</div>}
        {message && <div className="bg-green-50 text-green-600 text-sm p-3 rounded-md mb-4 text-center">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent"
              placeholder="your@email.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-brand-900 text-cream py-3 rounded-md font-bold uppercase hover:bg-brand-800 transition-colors mt-4 disabled:opacity-70"
          >
            {loading ? 'Sending Link...' : 'Send Reset Link'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link href="/login" className="text-xs text-gray-500 hover:text-brand-900">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}