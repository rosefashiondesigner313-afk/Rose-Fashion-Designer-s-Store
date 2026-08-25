'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
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

  // 👇 YAHAN CHANGES KIYE HAIN: 'About Us' ko list me add kar diya hai
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Custom Design', href: '/custom-design' },
    { name: 'About Us', href: '/about-us' }, // 👈 Naya Link
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

          {/* Desktop Navigation - ANIMATED BUTTONS WITH BORDERS */}
          <nav className="hidden md:flex space-x-2 lg:space-x-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="group relative px-4 py-2 font-medium text-sm text-charcoal tracking-widest uppercase overflow-hidden rounded-sm border border-brand-200 hover:border-brand-900 transition-colors duration-300"
              >
                {/* Background Fill Animation (Bottom to Top) */}
                <span className="absolute inset-0 w-full h-0 top-auto bottom-0 bg-brand-900 transition-all duration-300 ease-out group-hover:h-full"></span>
                
                {/* Text that changes color on hover */}
                <span className="relative z-10 group-hover:text-cream transition-colors duration-300">
                  {link.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* Icons (Account & Cart) */}
          <div className="flex items-center space-x-3 md:space-x-6">
            
            {/* USER AUTH LOGIC (Login / Profile & Logout) */}
            {session ? (
              <div className="flex items-center gap-2 md:gap-4">
                <Link href="/account" className="hidden sm:block text-sm font-bold text-brand-900 hover:text-brand-700 hover:underline transition-all">
                  Hi, {session.user?.name?.split(' ')[0]}
                </Link>
                
                {/* Logout Button */}
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="group flex flex-col items-center text-charcoal hover:text-red-600 transition-colors relative"
                  title="Logout"
                >
                  <div className="p-2 rounded-full group-hover:bg-red-50 transition-colors duration-300">
                    <LogOut size={22} />
                  </div>
                </button>
              </div>
            ) : (
              /* Login Icon (Jab user logged out ho) */
              <Link 
                href="/login"
                className="group flex flex-col items-center text-charcoal hover:text-brand-900 transition-colors relative"
                title="Login"
              >
                <div className="p-2 rounded-full group-hover:bg-brand-50 transition-colors duration-300">
                  <UserIcon size={22} />
                </div>
              </Link>
            )}

            {/* Live Shopping Cart */}
            <Link 
              href="/cart" 
              className="group flex flex-col items-center text-charcoal hover:text-brand-900 transition-colors relative"
            >
              <div className="p-2 rounded-full group-hover:bg-brand-50 transition-colors duration-300 relative">
                <ShoppingCart size={22} />
                
                {/* DYNAMIC CART BADGE */}
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
        <div className="md:hidden bg-white border-t border-brand-100 shadow-lg absolute w-full left-0">
          <div className="px-4 pt-2 pb-6 space-y-2">
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
          </div>
        </div>
      )}
    </header>
  );
}