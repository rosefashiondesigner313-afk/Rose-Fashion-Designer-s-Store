'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react'; // 👈 Icons import kiye hain

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); 
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // 👈 State password toggle ke liye

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (isLogin) {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        setError('Invalid email or password');
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } else {
      try {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || 'Registration failed');
          setLoading(false);
        } else {
          await signIn('credentials', {
            redirect: false,
            email: formData.email,
            password: formData.password,
          });
          router.push('/');
          router.refresh();
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-cream min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <div className="text-center mb-8">
          <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Sign in to access your orders and wishlist.' : 'Join Rose Fashion for exclusive custom designs.'}
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => { setIsLogin(true); setError(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${isLogin ? 'bg-white shadow-sm text-brand-900' : 'text-gray-500'}`}
          >
            Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setError(''); }}
            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${!isLogin ? 'bg-white shadow-sm text-brand-900' : 'text-gray-500'}`}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md mb-6 text-center border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {!isLogin && (
            <>
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Full Name *</label>
                <input 
                  type="text" name="name" required={!isLogin} value={formData.name} onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
                  placeholder="Enter your name" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Phone Number</label>
                <input 
                  type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
                  placeholder="+91 XXXXX XXXXX" 
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Email Address *</label>
            <input 
              type="email" name="email" required value={formData.email} onChange={handleChange}
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
              placeholder="your@email.com" 
            />
          </div>

          {/* 🚀 PASSWORD FIELD WITH SHOW/HIDE TOGGLE */}
          <div>
            <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Password *</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password" 
                required 
                value={formData.password} 
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 pr-10 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
                placeholder="••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-900 p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-brand-900 transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button 
            type="submit" disabled={loading}
            className="w-full bg-brand-900 text-cream py-3.5 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-colors shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

      </div>
    </div>
  );
}