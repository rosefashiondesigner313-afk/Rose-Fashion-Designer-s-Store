'use client';

import { useState } from 'react';
import { Scissors, PencilRuler, UserCheck, Truck } from 'lucide-react';

export default function CustomDesignPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    idea: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = '919594444591'; // Aapka WhatsApp number
    const message = 
      `✨ *New Custom Design Request* ✨%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.fullName)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `✉️ *Email:* ${encodeURIComponent(formData.email || 'N/A')}%0A` +
      `👗 *Outfit Idea:* ${encodeURIComponent(formData.idea)}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-cream min-h-screen">
      <div className="bg-brand-900 text-cream py-16 md:py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Tailor-Made Elegance</h1>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="font-sans text-brand-100 text-base md:text-lg">
            Have a dream outfit in mind? Our master tailors will bring it to life. 
            From premium fabrics to precise measurements, experience true luxury crafted just for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">How It Works</h2>
          <p className="text-gray-600 font-medium uppercase tracking-widest text-sm">4 Simple Steps to Your Perfect Fit</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20 relative">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-brand-100 -z-10 -translate-y-1/2"></div>
          
          {[
            { icon: PencilRuler, title: "1. Share Your Idea", desc: "Show us a reference picture or describe your dream dress." },
            { icon: UserCheck, title: "2. Consultation", desc: "Our expert connects with you for fabric choice and measurements." },
            { icon: Scissors, title: "3. Crafting", desc: "Our master tailors stitch your outfit with extreme precision." },
            { icon: Truck, title: "4. Doorstep Delivery", desc: "Your custom-fit dress arrives at your doorstep globally." }
          ].map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-brand-50 flex flex-col items-center text-center group hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-brand-50 text-brand-900 rounded-full flex items-center justify-center mb-4 group-hover:bg-brand-900 group-hover:text-cream transition-colors duration-300">
                <step.icon size={28} />
              </div>
              <h3 className="font-bold text-brand-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col md:flex-row max-w-5xl mx-auto">
          <div className="bg-brand-900 p-8 md:p-12 text-cream md:w-2/5 flex flex-col justify-center">
            <h3 className="font-serif text-2xl font-bold mb-4 text-gold">Book a Free Consultation</h3>
            <p className="text-brand-100 text-sm mb-8 leading-relaxed">
              Fill out the form with your details and outfit requirements. Our fashion consultant will contact you within 24 hours to discuss the design, fabric, and pricing.
            </p>
            <div className="space-y-4">
              <p className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center font-bold">📞</span>
                +91 9594444591
              </p>
              <p className="flex items-center gap-3 text-sm">
                <span className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center font-bold">✉️</span>
                design@rosefashiondesigner.com
              </p>
            </div>
          </div>
          
          <div className="p-8 md:p-12 md:w-3/5">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
                    placeholder="+91 XXXXX XXXXX" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent" 
                  placeholder="your@email.com" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Describe Your Outfit Idea *</label>
                <textarea 
                  rows={4} 
                  name="idea"
                  value={formData.idea}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 transition-colors bg-transparent resize-none" 
                  placeholder="E.g., I want a black anarkali suit for a wedding function with golden embroidery..." 
                  required
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-900 text-cream py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-700 transition-colors shadow-md mt-4">
                Send Request via WhatsApp
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}