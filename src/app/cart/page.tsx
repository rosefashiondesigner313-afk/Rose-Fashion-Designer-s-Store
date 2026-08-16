'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/CartContext';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function CartPage() {
  const { cartItems, getCartTotal, removeFromCart } = useCart();

  // Agar Cart khali hai toh ye design dikhega
  if (cartItems.length === 0) {
    return (
      <div className="bg-cream min-h-[75vh] flex flex-col items-center justify-center px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-300 mb-6">
          <ShoppingBag size={48} />
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added any premium dresses to your cart yet. Discover our latest collections!
        </p>
        <Link 
          href="/shop" 
          className="bg-brand-900 text-cream px-8 py-3.5 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-colors shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Agar Cart me items hain toh ye design dikhega
  return (
    <div className="bg-cream min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Side: Cart Items List */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              
              {/* Table Header (Desktop only) */}
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-gray-100 bg-brand-50/50 text-xs font-bold text-charcoal uppercase tracking-wider">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-100">
                {cartItems.map((item: any, index: number) => (
                  <div key={index} className="p-6 flex flex-col md:grid md:grid-cols-12 gap-4 items-center group">
                    
                    {/* Product Info & Image */}
                    <div className="col-span-6 flex items-center gap-6 w-full">
                      <div className="relative w-24 h-32 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-bold text-brand-900 text-base md:text-lg line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">Size: <span className="font-bold text-charcoal">{item.size}</span></p>
                        
                        {/* Mobile view Price & Qty */}
                        <div className="md:hidden mt-2 text-sm">
                          <span className="font-bold text-brand-900">₹{item.price}</span> <span className="text-gray-400 mx-1">x</span> {item.quantity}
                        </div>
                        
                        {/* Remove Button */}
                       <button 
  onClick={() => {
    if(removeFromCart) {
        removeFromCart(index); // Yahan fix kiya hai - ab ye exact index bheja karega
    }
  }}
  className="text-red-400 hover:text-red-600 text-xs font-bold flex items-center gap-1 mt-4 transition-colors w-fit"
>
  <Trash2 size={14} /> Remove
</button>
                      </div>
                    </div>

                    {/* Desktop Price */}
                    <div className="col-span-2 text-center hidden md:block font-medium text-gray-600">
                      ₹{item.price}
                    </div>

                    {/* Desktop Quantity */}
                    <div className="col-span-2 text-center hidden md:block">
                      <div className="inline-flex items-center justify-center bg-gray-50 border border-gray-200 rounded-md px-4 py-1.5 font-bold text-brand-900">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Desktop Total Price */}
                    <div className="col-span-2 text-right hidden md:block font-bold text-brand-900 text-lg">
                      ₹{item.price * (item.quantity || 1)}
                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-28">
              <h2 className="font-serif text-2xl font-bold text-brand-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-medium">₹{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-bold tracking-wide">FREE</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-lg text-charcoal uppercase">Total Amount</span>
                <span className="font-serif text-3xl font-bold text-brand-900">₹{getCartTotal()}</span>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-brand-900 text-cream py-4 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                <ShieldCheck size={16} className="text-green-500" />
                <span>100% Secure Payments</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}