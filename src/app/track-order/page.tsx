'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Package, CheckCircle2, Truck, Home } from 'lucide-react';

export default function TrackOrderPage() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !phone) {
      setError('Please enter both Order ID and Phone Number.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/orders/track?orderId=${encodeURIComponent(orderId)}&phone=${encodeURIComponent(phone)}`);
      const data = await res.json();
      
      if (res.ok && data.success) {
        setOrderData(data.order);
      } else {
        setError(data.message || 'Order not found. Please check your details.');
        setOrderData(null);
      }
    } catch (err) {
      setError('Network error. Please try again.');
      setOrderData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const currentStatus = orderData?.status || 'Processing';
  const isPlaced = true;
  const isProcessing = ['Processing', 'Shipped', 'Delivered'].includes(currentStatus);
  const isShipped = ['Shipped', 'Delivered'].includes(currentStatus);
  const isDelivered = currentStatus === 'Delivered';

  return (
    <div className="bg-cream min-h-screen pb-20">
      
      {/* Hero Section */}
      <div className="bg-brand-900 text-cream py-16 px-4 text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4">Track Your Order</h1>
        <p className="font-sans text-brand-100 text-sm md:text-base max-w-xl mx-auto">
          Enter your Order ID and Phone Number to get real-time updates.
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        
        {/* Tracking Form Card - Ye ab gayab nahi hoga */}
        <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Order ID *</label>
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-3 px-4 focus:outline-none focus:border-brand-900 bg-gray-50 text-sm" 
                placeholder="e.g. ROSE-459063" 
                required 
              />
            </div>
          <div className="flex-grow">
  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">Billing Phone Number *</label>
  <div className="flex items-center w-full border border-gray-300 rounded-md bg-gray-50 focus-within:border-brand-900 transition-all">
    {/* Permanent +91 prefix box */}
    <span className="px-3 text-sm font-semibold text-gray-600 bg-gray-100 border-r border-gray-300 py-3 rounded-l-md">
      +91
    </span>
    {/* 10-digit input field */}
    <input 
      type="tel" 
      value={phone}
      onChange={(e) => {
        const val = e.target.value.replace(/\D/g, '');
        if (val.length <= 10) setPhone(val);
      }}
      maxLength={10}
      className="w-full py-3 px-4 focus:outline-none bg-transparent text-sm" 
      placeholder="9876543210" 
      required 
    />
  </div>
</div>  
            <div className="flex items-end">
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full md:w-auto h-[46px] bg-brand-900 text-cream px-8 rounded-md font-bold uppercase tracking-widest text-xs hover:bg-brand-800 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Search size={16} /> {isLoading ? 'Checking...' : 'Track'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200 text-center">
              {error}
            </div>
          )}
        </div>

        {/* Tracking Result Timeline */}
        {orderData && (
          <div className="mt-12 bg-white p-6 md:p-10 rounded-2xl shadow-md border border-gray-100 animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Order Number</p>
                <p className="font-serif text-xl font-bold text-brand-900 uppercase">{orderData.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Current Status</p>
                <p className="font-bold text-brand-900 bg-brand-50 px-3 py-1 rounded-full text-xs inline-block">
                  {orderData.status}
                </p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="relative">
              <div className="absolute left-[21px] md:left-1/2 top-4 bottom-4 w-1 bg-gray-200 md:-translate-x-1/2 z-0"></div>

              <div className="space-y-12 md:space-y-0 md:flex justify-between relative z-10">
                
                {/* Step 1 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${isPlaced ? 'bg-brand-900 text-cream' : 'bg-gray-100 text-gray-400'}`}>
                    <Package size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-brand-900 text-sm">Order Placed</p>
                    <p className="text-xs text-gray-500">{new Date(orderData.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${isProcessing ? 'bg-brand-900 text-cream' : 'bg-gray-100 text-gray-400'}`}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-brand-900 text-sm">Processing</p>
                    <p className="text-xs text-gray-500">Tailoring in progress</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${isShipped ? 'bg-brand-900 text-cream' : 'bg-gray-100 text-gray-400'}`}>
                    <Truck size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-brand-900 text-sm">Shipped</p>
                    <p className="text-xs text-gray-500">{isShipped ? 'On the way' : 'Pending'}</p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex md:flex-col items-center gap-4 md:gap-3 text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${isDelivered ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    <Home size={20} />
                  </div>
                  <div className="text-left md:text-center">
                    <p className="font-bold text-gray-800 text-sm">Delivered</p>
                    <p className="text-xs text-gray-500">{isDelivered ? 'Completed' : 'Pending'}</p>
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