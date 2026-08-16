'use client';

import { useState } from 'react';
import { Search, Package, CheckCircle2, Truck, Home } from 'lucide-react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Fake submit function UI check karne ke liye
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId) setIsTracking(true);
  };

  return (
    <div className="bg-cream min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="bg-brand-900 text-cream py-16 px-4 text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Track Your Order</h1>
        <p className="font-sans text-brand-100 text-sm md:text-base max-w-xl mx-auto">
          Enter your Order ID below to get real-time updates on your beautiful Rose Fashion outfit.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Tracking Form Card */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Order ID</label>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900 transition-all bg-gray-50" 
                placeholder="e.g. ROSE-12345" 
                required 
              />
            </div>
            <div className="flex-grow">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Email or Phone</label>
              <input 
                type="text" 
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-brand-900 focus:ring-1 focus:ring-brand-900 transition-all bg-gray-50" 
                placeholder="Email or Billing Phone" 
                required 
              />
            </div>
            <div className="flex items-end">
              <button 
                type="submit" 
                className="w-full md:w-auto h-[50px] bg-brand-900 text-cream px-8 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Search size={18} /> Track
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Result (Timeline) - Sirf tab dikhega jab Track button click hoga */}
        {isTracking && (
          <div className="mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-md border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Order Number</p>
                <p className="font-serif text-xl font-bold text-brand-900 uppercase">{orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Estimated Delivery</p>
                <p className="font-bold text-green-600">22 Aug, 2026</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-[21px] md:left-1/2 top-4 bottom-4 w-1 bg-gray-200 md:-translate-x-1/2 z-0"></div>
              {/* Active Connecting Line (Progress) */}
              <div className="absolute left-[21px] md:left-1/2 top-4 h-1/2 w-1 bg-brand-900 md:-translate-x-1/2 z-0"></div>

              <div className="space-y-12 md:space-y-0 md:flex justify-between relative z-10">
                
                {/* Step 1 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className="w-12 h-12 bg-brand-900 text-cream rounded-full flex items-center justify-center shadow-md">
                    <Package size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-brand-900 text-sm">Order Placed</p>
                    <p className="text-xs text-gray-500">15 Aug, 10:30 AM</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className="w-12 h-12 bg-brand-900 text-cream rounded-full flex items-center justify-center shadow-md">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-brand-900 text-sm">Processing</p>
                    <p className="text-xs text-gray-500">Tailoring in progress</p>
                  </div>
                </div>

                {/* Step 3 (Current) */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className="w-12 h-12 bg-brand-100 text-brand-900 border-2 border-brand-900 rounded-full flex items-center justify-center shadow-md">
                    <Truck size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-brand-900 text-sm">Shipped</p>
                    <p className="text-xs text-gray-500">Pending</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center shadow-sm">
                    <Home size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-gray-400 text-sm">Delivered</p>
                    <p className="text-xs text-gray-400">Pending</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}