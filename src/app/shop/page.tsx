'use client';

import { useState } from 'react';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { mockProducts } from '@/data/mockProducts'; // ERROR FIX: Sahi data import kiya

export default function ShopPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // FILTER LOGIC: Kise select kiya gaya hai uski state
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Automatically saari unique categories data me se nikalna
  const allCategories = Array.from(new Set(mockProducts.map(product => product.category)));

  // Checkbox pe click karne ka function
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) // Agar pehle se tick hai, toh hata do
        : [...prev, category]              // Agar nahi hai, toh add kar do
    );
  };

  // Jo category select hui hai, sirf wahi products dikhana
  const filteredProducts = mockProducts.filter(product => {
    if (selectedCategories.length === 0) return true; // Agar kuch select nahi kiya, toh sab dikhao
    return selectedCategories.includes(product.category);
  });

  return (
    <div className="bg-cream min-h-screen pb-16">
      
      {/* Page Header */}
      <div className="bg-brand-900 text-cream py-12 px-4 text-center">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-3">Shop Collections</h1>
        <p className="font-sans text-brand-100 text-sm md:text-base max-w-2xl mx-auto">
          Explore our exclusive range of hand-worked dresses, premium anarkalis, and signature jumpsuits.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        {/* Mobile Filter Button */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <span className="font-bold text-charcoal">{filteredProducts.length} Products</span>
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-md shadow-sm text-sm font-bold text-brand-900"
          >
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out p-6 overflow-y-auto
            md:relative md:translate-x-0 md:w-1/4 md:bg-transparent md:shadow-none md:p-0 md:block
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            
            <div className="flex justify-between items-center mb-6 md:hidden">
              <h2 className="font-serif text-2xl font-bold text-brand-900">Filters</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-gray-500 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-bold text-charcoal uppercase tracking-widest text-sm mb-4 border-b border-gray-200 pb-2 flex justify-between">
                  Categories <ChevronDown size={16} />
                </h3>
                <ul className="space-y-3">
                  {allCategories.map((cat, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        id={cat} 
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                        className="w-4 h-4 accent-brand-900 cursor-pointer" 
                      />
                      <label htmlFor={cat} className="text-sm text-gray-600 cursor-pointer hover:text-brand-900 transition-colors">
                        {cat}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price Filter (UI Only for now) */}
              <div>
                <h3 className="font-bold text-charcoal uppercase tracking-widest text-sm mb-4 border-b border-gray-200 pb-2 flex justify-between">
                  Price <ChevronDown size={16} />
                </h3>
                <ul className="space-y-3">
                  {['Under ₹5,000', '₹5,000 - ₹10,000', 'Over ₹10,000'].map((price, idx) => (
                    <li key={idx} className="flex items-center gap-3 opacity-50 cursor-not-allowed">
                      <input type="checkbox" id={price} disabled className="w-4 h-4 accent-brand-900 cursor-not-allowed" />
                      <label htmlFor={price} className="text-sm text-gray-600 cursor-not-allowed">
                        {price} (Coming Soon)
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Dark Overlay for Mobile Filter */}
          {isMobileFilterOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            />
          )}

          {/* Product Grid */}
          <main className="w-full md:w-3/4">
            <div className="hidden md:flex justify-between items-center mb-6">
              <span className="text-sm text-gray-500">Showing {filteredProducts.length} results</span>
              <select className="bg-transparent border-b border-gray-300 text-sm py-1 outline-none cursor-pointer focus:border-brand-900">
                <option>Sort by Latest</option>
                <option>Sort by Price: Low to High</option>
                <option>Sort by Price: High to Low</option>
              </select>
            </div>

            {/* ERROR FIX: Ab yahan filteredProducts map ho raha hai */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
                <h3 className="text-xl font-serif font-bold text-brand-900 mb-2">No dresses found</h3>
                <p className="text-gray-500">Try selecting a different category.</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}