'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { ShieldCheck, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'Online'>('Online');

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

    if (paymentMethod === 'Online') {
      handleRazorpayPayment();
    } else {
      executeOrder('Cash on Delivery');
    }
  };

  // 🚀 Razorpay Integration Function
  const handleRazorpayPayment = async () => {
    setIsLoading(true);

    try {
      // 1. Load Razorpay Script Dynamically
      const res = await new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

      if (!res) {
        alert('Razorpay SDK failed to load. Check your internet connection.');
        setIsLoading(false);
        return;
      }

      // 2. Create Order on Backend
      const orderRes = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: getCartTotal() }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        alert('Failed to initiate online payment. Please try again.');
        setIsLoading(false);
        return;
      }

      // 3. Open Razorpay Checkout Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Rose Fashion Designer',
        description: 'Purchase Custom Hand-worked Dresses',
        order_id: orderData.order.id,
        handler: async function (response: any) {
          // Payment successful hone ke baad order database me save karenge
          await executeOrder('Online UPI / Card', response.razorpay_payment_id);
        },
        modal: {
        // 🚀 YEH NAYA ADD KARNA HAI: Jab user popup cancel karega tab ye chalega
          ondismiss: function () {
            setIsLoading(false); // Loading hata dega taaki button stuck na ho
            console.log('Payment checkout modal closed by user');
          },
        },
        prefill: {
          name: formData.fullName,
          email: session?.user?.email || '',
          contact: formData.phone,
        },
        theme: {
          color: '#4A0E17', // Brand Wine/Maroon Color
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      paymentObject.on('payment.failed', function (response: any) {
        alert(`Payment Failed: ${response.error.description}`);
        setIsLoading(false);
      });

    } catch (error) {
      console.error('Payment error:', error);
      alert('Something went wrong during payment initialization.');
      setIsLoading(false);
    }
  };

  const executeOrder = async (finalPaymentMethod: string, paymentId?: string) => {
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
        paymentId: paymentId || 'COD',
      };

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

    if (res.ok) {
        clearCart();
        // 🚀 Direct success page par bhejenge orderId ke sath bina kisi alert ke
        window.location.href = `/order-success?orderId=${data.orderId}`;
      } else {
        console.error('Failed to place order:', data.message);
        alert('Failed to place order: ' + data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Something went wrong!', error);
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
            
            {/* Payment Method Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-xl font-bold text-brand-900 mb-6 flex items-center gap-2">
                <CreditCard size={24} className="text-brand-900" /> Payment Method
              </h2>

              <div className="space-y-4">
                {/* Online Payment Option */}
                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'Online' ? 'border-brand-900 bg-brand-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="payment" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} className="w-4 h-4 accent-brand-900" />
                    <div>
                      <span className="font-bold text-sm text-brand-900 block">Pay Online via UPI, Card, NetBanking (Razorpay)</span>
                      <span className="text-xs text-gray-500">Google Pay, PhonePe, Paytm, Cards, UPI</span>
                    </div>
                  </div>
                  <CreditCard size={24} className="text-brand-900" />
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
                {isLoading ? 'Processing...' : <><ShieldCheck size={20} /> {paymentMethod === 'Online' ? 'Proceed to Pay Securely' : 'Place COD Order'}</>}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}