import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-cream pt-16 pb-8 border-t-[6px] border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* 1. Brand Col (Logo, About, Socials) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-6 bg-white/90 p-3 rounded-md shadow-sm hover:opacity-90 transition-opacity">
              <Image 
                src="/images/rose-logo-version-3.png" 
                alt="Rose Fashion Designer" 
                width={260} 
                height={60} 
                className="object-contain h-20 w-auto" 
              />
            </Link>
            <p className="text-brand-100 text-sm mb-8 font-sans leading-relaxed pr-4">
              Premium hand-worked women's dresses, Anarkali suits, and customized designer wear. Crafted with elegance and delivered with trust across India.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-5">
              <a href="#" target="_blank" className="text-brand-100 hover:text-gold hover:-translate-y-1 transition-all duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" target="_blank" className="text-brand-100 hover:text-gold hover:-translate-y-1 transition-all duration-300" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" target="_blank" className="text-brand-100 hover:text-gold hover:-translate-y-1 transition-all duration-300" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.1 8.4 2 10.2 2 12s.1 3.6.5 4.9c.5 1.5 1.7 2.7 3.2 3.1 2.8.5 11.8.5 14.6 0 1.5-.4 2.7-1.6 3.2-3.1.4-1.3.5-3.1.5-4.9s-.1-3.6-.5-4.9c-.5-1.5-1.7-2.7-3.2-3.1-2.8-.5-11.8-.5-14.6 0-1.5.4-2.7 1.6-3.2 3.1Z"/><path d="m10 15 5-3-5-3v6Z"/></svg>
              </a>
              <a href="#" target="_blank" className="text-brand-100 hover:text-gold hover:-translate-y-1 transition-all duration-300" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* 2. Shop Links */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-gold tracking-wide uppercase text-sm">Shop Collections</h3>
            <ul className="space-y-3 text-sm text-brand-50">
              <li><Link href="/shop" className="hover:text-gold hover:pl-1 transition-all duration-300 block">All Dresses</Link></li>
              <li><Link href="#" className="hover:text-gold hover:pl-1 transition-all duration-300 block">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-gold hover:pl-1 transition-all duration-300 block">Best Sellers</Link></li>
              <li><Link href="/custom-design" className="hover:text-gold hover:pl-1 transition-all duration-300 block">Custom Design (Tailor Made)</Link></li>
            </ul>
          </div>

          {/* 3. Customer Support */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-gold tracking-wide uppercase text-sm">Customer Care</h3>
            <ul className="space-y-3 text-sm text-brand-50">
              <li><Link href="/track-order" className="hover:text-gold hover:pl-1 transition-all duration-300 block">Track Your Order</Link></li>
              {/* 🚀 NAYE LINKS YAHAN HAIN */}
              <li><Link href="/refund-policy" className="hover:text-gold hover:pl-1 transition-all duration-300 block">Return & Replacement Policy</Link></li>
              <li><Link href="/contact-us" className="hover:text-gold hover:pl-1 transition-all duration-300 block">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-gold hover:pl-1 transition-all duration-300 block">FAQs</Link></li>
            </ul>
          </div>

          {/* 4. Contact Information */}
          <div>
            <h3 className="font-serif text-xl font-semibold mb-6 text-gold tracking-wide uppercase text-sm">Contact Us</h3>
            <ul className="space-y-4 text-sm text-brand-50">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-gold flex-shrink-0 mt-0.5" />
                <span className="leading-snug">Shop No 07, Building No 24b, Lallubhai Compound, Govandi East, Mumbai, Maharashtra 400043</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-gold flex-shrink-0" />
                <span>+91 9594444591</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-gold flex-shrink-0" />
                <a href="mailto:rosefashiondesigner313@gmail.com" className="hover:text-gold transition-colors">rosefashiondesigner313@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="border-t border-brand-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-200">
          <p>&copy; {new Date().getFullYear()} Rose Fashion Designer. All rights reserved.</p>
          
          {/* 🚀 NAYE LEGAL LINKS YAHAN HAIN */}
          <div className="flex space-x-4">
            <Link href="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span className="text-brand-700">|</span>
            <Link href="/terms-conditions" className="hover:text-gold transition-colors">Terms & Conditions</Link>
            <span className="text-brand-700">|</span>
            <Link href="/disclaimer" className="hover:text-gold transition-colors">Disclaimer</Link>
          </div>
        </div>
        
      </div>
    </footer>
  );
}