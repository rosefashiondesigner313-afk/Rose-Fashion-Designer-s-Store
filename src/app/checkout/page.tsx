'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ShieldCheck, Truck, CreditCard, QrCode, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('UPI'); // Default UPI ya COD select kar sakte hain
  const [showQrModal, setShowQrModal] = useState(false);

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
    
    if (cartItems.length === 0 && status === 'authenticated') {
      router.push('/shop');
    }
  }, [status, router, cartItems.length, session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === 'UPI') {
      // Agar UPI select hai toh pehle QR code popup dikhayenge
      setShowQrModal(true);
    } else {
      // Direct COD order execute karenge
      executeOrder('Cash on Delivery');
    }
  };

  const executeOrder = async (finalPaymentMethod: string) => {
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
        paymentMethod: finalPaymentMethod,
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        setShowQrModal(false);
        alert(`🎉 Order Placed Successfully! Your Order ID is ${data.orderId}`);
        clearCart();
        router.push('/account');
      } else {
        alert('Failed to place order: ' + data.message);
        setIsLoading(false);
      }
    } catch (error) {
      alert('Something went wrong!');
      setIsLoading(false);
    }
  };

  if (status === 'loading' || cartItems.length === 0) return null;

  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl font-bold text-brand-900 mb-8 text-center">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side - Shipping Form & Payment Method */}
          <div className="w-full lg:w-2/3 space-y-6">
            
            {/* Shipping Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                <Truck size={24} className="text-brand-900" /> Shipping Details
              </h2>
              
              <form id="checkout-form" onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Full Name *</label>
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent text-sm" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal uppercase mb-2">Street Address / Flat No. *</label>
                  <input required type="text" name="addressLine" value={formData.addressLine} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent text-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">City *</label>
                    <input required type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">State *</label>
                    <input required type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-charcoal uppercase mb-2">Pincode *</label>
                    <input required type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-brand-900 bg-transparent text-sm" />
                  </div>
                </div>
              </form>
            </div>
            
            {/* Payment Method Section (Updated with Online UPI Option) */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                <CreditCard size={24} className="text-brand-900" /> Payment Method
              </h2>

              <div className="space-y-4">
                {/* UPI QR Option */}
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-brand-900 bg-brand-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="w-4 h-4 accent-brand-900" />
                    <div>
                      <span className="font-bold text-sm text-brand-900 block">Pay Online via UPI / QR Code</span>
                      <span className="text-xs text-gray-500">Google Pay, PhonePe, Paytm, BHIM</span>
                    </div>
                  </div>
                  <QrCode size={24} className="text-brand-900" />
                </label>

                {/* COD Option */}
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-brand-900 bg-brand-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="w-4 h-4 accent-brand-900" />
                    <div>
                      <span className="font-bold text-sm text-brand-900 block">Cash on Delivery (COD)</span>
                      <span className="text-xs text-gray-500">Pay when your custom dress arrives</span>
                    </div>
                  </div>
                </label>
              </div>
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
                {isLoading ? 'Processing...' : <><ShieldCheck size={20} /> {paymentMethod === 'UPI' ? 'Proceed to QR Payment' : 'Place Order'}</>}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 🚀 UPI QR CODE MODAL POPUP */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center space-y-6 animate-in zoom-in-95 duration-200">
            <h3 className="font-serif text-2xl font-bold text-brand-900">Scan & Pay via UPI</h3>
            <p className="text-xs text-gray-500">Scan this QR code using Google Pay, PhonePe, Paytm, or any UPI app to complete your payment.</p>
            
            {/* Dynamic UPI QR Code */}
            <div className="bg-gray-50 p-4 rounded-2xl border-2 border-dashed border-brand-200 inline-block">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=rosefashion@upi&pn=RoseFashion&am=${getCartTotal()}&cu=INR`} 
                alt="UPI QR Code" 
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            <div className="bg-brand-50 p-3 rounded-xl">
              <p className="text-xs text-gray-600">Amount to Pay:</p>
              <p className="text-xl font-bold text-brand-900">₹{getCartTotal().toLocaleString()}</p>
            </div>

            <div className="space-y-3">
              <button 
                type="button"
                disabled={isLoading}
                onClick={() => executeOrder('Online UPI')}
                className="w-full py-3.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-colors shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <CheckCircle2 size={18} /> {isLoading ? 'Verifying...' : 'I Have Paid Successfully'}
              </button>
              <button 
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 text-gray-500 hover:text-gray-700 text-xs font-bold"
              >
                Cancel / Change Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}