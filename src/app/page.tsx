'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Scissors, ShieldCheck, Truck } from 'lucide-react';
import HeroSlider from '@/components/home/HeroSlider';
import LeadCapture from '@/components/home/LeadCapture';
import ProductCard from '@/components/product/ProductCard';



export default function Home() {
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🚀 MONGODB SE ASALI PRODUCTS FETCH KARNA (MANUAL CONTROL KE SATH)
  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        const allProducts = Array.isArray(data) ? data : data.products || [];
        
        // 🔥 YAHAN HAI AAPKA ASALI CONTROL
        // Ye line database ko bolegi: "Sirf wahi products laao jisme isFeatured true ho ook"
        const selectedProducts = allProducts.filter((product: any) => product.isFeatured === true);
        
        setTrendingProducts(selectedProducts);
      } catch (error) {
        console.error("Failed to load trending products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      
      <HeroSlider/>
      
      {/* LEAD GENERATION BANNER */}
      <LeadCapture />

      {/* 2.5 TRENDING PRODUCTS (REAL MONGODB DATA) */}
      <section className="py-16 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-4">Trending Now</h2>
          <div className="w-24 h-1 bg-gold mx-auto"></div>
        </div>
        
        {/* Loading State or Products Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-900"></div>
          </div>
        ) : trendingProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {trendingProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8 border border-dashed border-gray-300 rounded-lg">
            No featured products found. (Aapne database me abhi tak kisi product par <b>isFeatured: true</b> nahi lagaya hai).
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/shop" className="inline-block border border-brand-900 text-brand-900 px-8 py-3 font-semibold uppercase tracking-widest text-sm hover:bg-brand-900 hover:text-cream transition-colors duration-300">
            View All Dresses
          </Link>
        </div>
      </section>

      {/* 3. TRUST SECTION (Why Choose Us) */}
      <section className="bg-brand-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-900 rounded-full flex items-center justify-center mb-6">
                <Scissors size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">Custom Tailored</h3>
              <p className="text-charcoal/70 text-sm">Every dress can be customized to your exact measurements, color preference, and style requirements.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-900 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">Premium Quality</h3>
              <p className="text-charcoal/70 text-sm">We use only the finest fabrics and authentic hand-work. Quality checked rigorously before dispatch.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-100 text-brand-900 rounded-full flex items-center justify-center mb-6">
                <Truck size={32} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">Secure Delivery</h3>
              <p className="text-charcoal/70 text-sm">Transparent order tracking and secure packaging ensure your dream dress reaches you safely.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CUSTOM DESIGN CTA */}
      <section className="py-24 px-4 text-center max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-900 mb-6">Have a Design in Mind?</h2>
        <p className="font-sans text-charcoal/80 mb-8 max-w-2xl mx-auto">
          Send us a reference image and your measurements. Our expert designers will bring your vision to life with our premium hand-work and finishing.
        </p>
        <Link href="/custom-design" className="inline-block border-2 border-brand-900 text-brand-900 px-8 py-3 font-semibold uppercase tracking-widest text-sm hover:bg-brand-900 hover:text-cream transition-colors duration-300">
          Start Custom Order
        </Link>
      </section>

    </div>
  );
}