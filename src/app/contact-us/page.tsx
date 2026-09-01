'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    pincode: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = '919594444591'; // Aapka WhatsApp number
    const textMessage = 
      `💬 *New Contact / Inquiry* 💬%0A%0A` +
      `👤 *Name:* ${encodeURIComponent(formData.fullName)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `🏠 *Address:* ${encodeURIComponent(formData.address)}%0A` +
      `📍 *Pincode:* ${encodeURIComponent(formData.pincode)}%0A` +
      `✉️ *Message:* ${encodeURIComponent(formData.message || 'N/A')}`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${textMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-12 border-b border-gray-100 pb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 font-sans text-sm">
            We are here to help you with your custom dresses and fitting queries.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-sans text-charcoal">
          
          {/* Left Side: Contact Details & Boutique Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-4">Get in Touch</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Have a question about a dress, need fitting adjustments, or want to inquire about a custom order? Reach out to us using the details below or fill out the form.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full text-brand-900">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Us</p>
                  <p className="text-base font-bold text-brand-900">rosefashiondesigner313@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full text-brand-900">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Call / WhatsApp</p>
                  <p className="text-base font-bold text-brand-900">+91 9594444591</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full text-brand-900">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operating Hours</p>
                  <p className="text-sm text-gray-700">Monday to Saturday<br/>10:00 AM to 7:00 PM</p>
                </div>
              </div>
            </div>

            {/* Address Block */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <MapPin size={22} className="text-brand-900" />
                <h3 className="text-lg font-bold text-brand-900">Our Boutique</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-600 leading-relaxed">
                <p className="font-bold text-charcoal">Rose Fashion Designer</p>
                <p>Shop No 07, Building No 24b</p>
                <p>Lallubhai Compound, Govandi East</p>
                <p>Mumbai, Maharashtra 400043</p>
                <p>India</p>
              </div>
              <p className="mt-4 text-xs text-gray-500 italic">
                Note: Visits for custom measurements are by appointment only.
              </p>
            </div>
          </div>

          {/* Right Side: WhatsApp Inquiry Form with Address & Pincode */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-brand-900 mb-2">Send Message via WhatsApp</h3>
            <p className="text-xs text-gray-500 mb-6">Fill out your details and query, it will directly open in our WhatsApp chat.</p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">Full Name *</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-900 transition-colors" 
                  placeholder="Enter your name" 
                  required 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-900 transition-colors" 
                  placeholder="+91 XXXXX XXXXX" 
                  required 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">Address *</label>
                  <input 
                    type="text" 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-900 transition-colors" 
                    placeholder="Your City / Area" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">Pincode *</label>
                  <input 
                    type="text" 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-900 transition-colors" 
                    placeholder="Pincode" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1">Your Message / Query *</label>
                <textarea 
                  rows={3} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-brand-900 transition-colors resize-none" 
                  placeholder="Write your query here..." 
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-900 text-cream py-3 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-brand-700 transition-colors shadow-md mt-2 flex items-center justify-center gap-2"
              >
                <span>💬</span> Send on WhatsApp
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}