'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Security & Auto-Fill Logic
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // User ka saved data auto-fill karne ke liye fetch karo
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data) {
            setFormData({
              fullName: session?.user?.name || '',
              phone: data.phone || '',
              addressLine: data.address?.street || '',
              city: data.address?.city || '',
              state: data.address?.state || '',
              pincode: data.address?.pincode || '',
            });
          }
        });
    }
    
    // Agar cart khali hai toh wapas shop par bhej do
    if (cartItems.length === 0 && status === 'authenticated') {
      router.push('/shop');
    }
  }, [status, router, cartItems.length, session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.size,
          image: item.image
        })),
        totalAmount: getCartTotal(),
        shippingAddress: formData,
        paymentMethod: 'Cash on Delivery',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        // Order success hone par account page par bhej do
        alert(`🎉 Order Placed Successfully! Your Order ID is ${data.orderId}`);

        // Yahan aap cart empty karne ka function call kar sakte hain agar aapke context me hai
        clearCart();
        router.push('/account');
      } else {
        alert('Failed to place order: ' + data.message);
      }
    } catch (error) {
      alert('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || cartItems.length === 0) return null;

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl font-bold text-brand-900 mb-8 text-center">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Shipping Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                <Truck size={24} className="text-brand-900" /> Shipping Details
              </h2>
              
              <form id="checkout-form" onSubmit={placeOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Full Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase mb-2">Street Address / Flat No. *</label>
                  <input required type="text" name="addressLine" value={formData.addressLine} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">City *</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">State *</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Pincode *</label>
                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent" />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mt-6">
              <h2 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                <CreditCard size={24} className="text-brand-900" /> Payment Method
              </h2>
              <div className="border border-brand-900 bg-brand-50 rounded-lg p-4 flex items-center gap-3">
                <input type="radio" checked readOnly className="w-4 h-4 accent-brand-900" />
                <span className="font-bold text-brand-900">Cash on Delivery (COD)</span>
              </div>
              <p className="text-xs text-gray-500 mt-2 ml-7">Pay when your dress arrives at your doorstep.</p>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
              <h2 className="text-xl font-bold text-brand-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b border-gray-100 pb-4">
                    <div className="relative w-16 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-brand-900 mt-1">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4 text-sm">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{getCartTotal()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600 font-bold">FREE</span></div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-lg text-charcoal">Total</span>
                <span className="font-serif text-2xl font-bold text-brand-900">₹{getCartTotal()}</span>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                disabled={isLoading}
                className="w-full bg-brand-900 text-cream py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? 'Processing...' : <><ShieldCheck size={20} /> Place Order</>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}