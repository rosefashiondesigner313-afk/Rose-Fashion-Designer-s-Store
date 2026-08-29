'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { Suspense } from 'node_modules/react'; // ya 'react'

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ROSE-XXXXXX';

  return (
    <div className="bg-cream min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 max-w-lg w-full p-8 md:p-10 text-center space-y-6">
        
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={48} />
        </div>

        <div className="space-y-2">
          <h1 className="font-serif text-3xl font-bold text-brand-900">Order Placed Successfully!</h1>
          <p className="text-sm text-gray-500">Thank you for shopping with Rose Fashion Designer. Your custom dress order has been received.</p>
        </div>

        <div className="bg-brand-50/60 border border-brand-100 rounded-2xl p-4 space-y-1">
          <span className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order ID</span>
          <p className="text-xl font-bold text-brand-900 font-mono">{orderId}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Link 
            href={`/track-order?id=${orderId}`}
            className="flex-1 bg-brand-900 text-cream py-3.5 rounded-xl font-bold text-sm hover:bg-brand-800 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Package size={18} /> Track Order
          </Link>
          <Link 
            href="/account"
            className="flex-1 bg-white border-2 border-brand-900 text-brand-900 py-3.5 rounded-xl font-bold text-sm hover:bg-brand-50 transition-colors flex items-center justify-center gap-2"
          >
            View My Orders <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}