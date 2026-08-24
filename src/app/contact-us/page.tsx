import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactUsPage() {
  return (
    <div className="bg-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-10 border-b border-gray-100 pb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-4">
            Contact Us
          </h1>
          <p className="text-gray-500 font-sans text-sm">
            We are here to help you with your custom dresses and fitting queries.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans text-charcoal">
          
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-brand-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-6">
                Have a question about a dress, need fitting adjustments, or want to inquire about a custom order? Reach out to us using the details below.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full text-brand-900">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Us</p>
                  {/* 🚨 YAHAN CLIENT KA EMAIL DAALEIN 🚨 */}
                  <p className="text-lg font-bold text-brand-900">rosefashiondesigner313@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full text-brand-900">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Call / WhatsApp</p>
                  {/* 🚨 YAHAN CLIENT KA PHONE NUMBER DAALEIN 🚨 */}
                  <p className="text-lg font-bold text-brand-900">+91 9594444591</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-50 p-3 rounded-full text-brand-900">
                  <Clock size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Operating Hours</p>
                  <p className="text-base text-gray-700">Monday to Saturday<br/>10:00 AM to 7:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Block */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={24} className="text-brand-900" />
              <h3 className="text-xl font-bold text-brand-900">Our Boutique</h3>
            </div>
            
            <div className="space-y-2 text-gray-600 leading-relaxed">
              <p className="font-bold text-charcoal">Rose Fashion Designer</p>
              {/* 🚨 YAHAN CLIENT KA POORA ADDRESS DAALEIN 🚨 */}
              <p>Shop No 07, Building No 24b</p>
              <p>Lallubhai Compound, Govandi East</p>
              <p> Mumbai, Maharashtra 400043</p>
              <p>India</p>
            </div>
            
            <p className="mt-8 text-sm text-gray-500 italic">
              Note: Visits to the boutique for custom measurements are by appointment only. Please call us before visiting.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}