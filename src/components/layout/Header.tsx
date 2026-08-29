'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut, UserCheck } from 'lucide-react';
import { useCart } from '@/lib/CartContext'; 

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart(); 
  const [mounted, setMounted] = useState(false);
  
  // Session data fetch kar rahe hain
  const { data: session } = useSession();

  // Next.js hydration error se bachne ke liye
  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Custom Design', href: '/custom-design' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Why Us', href: '/why-us' },
    { name: 'Track Order', href: '/track-order' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-cream border-b border-brand-100 shadow-sm transition-all duration-300">
      
      {/* Announcement Bar */}
      <div className="bg-brand-900 text-cream text-xs text-center py-2.5 font-sans tracking-widest uppercase">
        Premium Hand-Worked Dresses • Custom Made for You
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-charcoal hover:text-brand-900 transition-colors p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Logo - Clean, Large & Transparent */}
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link href="/" className="block hover:opacity-90 transition-opacity">
              <Image 
                src="/images/rose-logo-version-3.png" 
                alt="Rose Fashion Designer" 
                width={220} 
                height={70} 
                className="object-contain h-12 md:h-16 w-auto" 
                priority 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="group relative px-4 py-2 font-medium text-sm text-charcoal tracking-widest uppercase overflow-hidden rounded-sm border border-brand-200 hover:border-brand-900 transition-colors duration-300"
              >
                <span className="absolute inset-0 w-full h-0 top-auto bottom-0 bg-brand-900 transition-all duration-300 ease-out group-hover:h-full"></span>
                <span className="relative z-10 group-hover:text-cream transition-colors duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Icons (Account & Cart) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            
            {/* 🚀 IMPROVED USER AUTH DISPLAY (Desktop & Mobile clear profile pill) */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link 
                  href="/account" 
                  className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-900 px-3 py-1.5 rounded-full border border-brand-200 transition-all text-xs font-bold"
                  title="View Account"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-900 text-cream flex items-center justify-center text-[10px] font-bold">
                    {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="hidden sm:inline">
                    Hi, {session?.user?.name ? session.user.name.split(' ')[0] : 'Account'}
                  </span>
                </Link>
                
                {/* Logout Button */}
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="p-2 text-charcoal hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link 
                href="/login"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-charcoal hover:text-brand-900 px-3 py-2 rounded-lg hover:bg-brand-50 transition-all"
              >
                <UserIcon size={20} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

            {/* Live Shopping Cart */}
            <Link 
              href="/cart" 
              className="group flex flex-col items-center text-charcoal hover:text-brand-900 transition-colors relative"
            >
              <div className="p-2 rounded-full group-hover:bg-brand-50 transition-colors duration-300 relative">
                <ShoppingCart size={22} />
                
                {mounted && cartCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-brand-900 text-cream text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-md animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
            
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-brand-100 shadow-xl absolute w-full left-0">
          <div className="px-4 pt-4 pb-6 space-y-2">
            
            {/* Mobile User Status Box */}
            {session && (
              <div className="mb-3 p-3 bg-brand-50 rounded-xl border border-brand-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-brand-900 text-cream flex items-center justify-center text-xs font-bold">
                    {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-sm font-bold text-brand-900">{session.user?.name}</p>
                  </div>
                </div>
                <Link 
                  href="/account" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xs font-bold bg-brand-900 text-cream px-3 py-1.5 rounded-lg"
                >
                  My Account
                </Link>
              </div>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-sm font-bold tracking-widest uppercase text-charcoal hover:text-cream hover:bg-brand-900 rounded-sm transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}

            {!session && (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center px-4 py-3 text-sm font-bold tracking-widest uppercase text-cream bg-brand-900 rounded-sm mt-4"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}