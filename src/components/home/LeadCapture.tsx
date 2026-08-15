import { PhoneCall, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

export default function LeadCapture() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-4 md:py-8 w-full">
      <div className="bg-brand-900 rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
        
        {/* Subtle background pattern/texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

        {/* Lead Gen Text */}
        <div className="text-center lg:text-left flex-1 relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-3">
            Talk to Our Master Tailors
          </h2>
          <p className="font-sans text-brand-100 text-sm md:text-base max-w-lg mx-auto lg:mx-0">
            Have a specific design in mind? <span className="text-gold font-bold">Call us directly</span> or <span className="text-gold font-bold">Book a free consultation</span> to discuss measurements, fabrics, and customizations.
          </p>
        </div>
        
        {/* Lead Gen Actions (Buttons) */}
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full lg:w-auto justify-center">
          
          {/* Call Now Button */}
          <a 
            href="tel:+919999999999" // Replace with your actual business number
            className="flex items-center justify-center gap-2 bg-gold text-brand-900 px-8 py-3 rounded-md font-bold hover:bg-cream transition-colors whitespace-nowrap shadow-md uppercase tracking-wide text-sm"
          >
            <PhoneCall size={20} />
            Call Now
          </a>

          {/* Book Now Button */}
          <Link 
            href="/custom-design" 
            className="flex items-center justify-center gap-2 border-2 border-cream text-cream px-8 py-3 rounded-md font-bold hover:bg-cream hover:text-brand-900 transition-colors whitespace-nowrap shadow-md uppercase tracking-wide text-sm"
          >
            <CalendarCheck size={20} />
            Book Now
          </Link>

        </div>
      </div>
    </section>
  );
}