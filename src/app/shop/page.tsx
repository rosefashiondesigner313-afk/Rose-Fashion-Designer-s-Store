'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, SlidersHorizontal, X, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '@/lib/CartContext';

export default function ShopPage() {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [toast, setToast] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (res.ok && data.success) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Failed to fetch products");
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const allCategories = Array.from(new Set(products.map(product => product.category)));

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = products.filter(product => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(product.category);
  });

  const handleAddToCart = (product: any, e: React.MouseEvent) => {
    e.preventDefault(); // Click karne par link trigger na ho
    const defaultSize = product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'M';
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: defaultSize,
      quantity: 1
    });
    setToast(`✅ ${product.name} added to cart!`);
    setTimeout(() => setToast(''), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-cream min-h-screen pb-16 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-green-50 text-green-700 px-6 py-3 rounded-full shadow-lg border border-green-200 font-bold text-sm flex items-center gap-2 animate-in slide-in-from-top-5">
          {toast}
        </div>
      )}

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

              {/* Price Filter */}
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

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {filteredProducts.map((product) => {
                  const createSlug = (text: string) => {
                    if (!text) return '';
                    return text
                      .toLowerCase()
                      .trim()
                      .replace(/[^\w\s-]/g, '')
                      .replace(/[\s_-]+/g, '-')
                      .replace(/^-+|-+$/g, '');
                  };

                  const productIdentifier = product.slug || createSlug(product.name) || product._id;
                  const hasSecondImage = product.images && product.images.length > 1;

                  return (
                    <div key={product._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                      
                      {/* 🚀 IMAGE CLICKABLE LINK TO DETAILED PAGE */}
                      <Link href={`/product/${productIdentifier}`} className="relative h-80 bg-gray-100 overflow-hidden block">
                        {hasSecondImage && (
                          <img 
                            src={product.images[1]} 
                            alt={`${product.name} view`} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 z-0" 
                          />
                        )}
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 z-10 ${hasSecondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`} 
                        />

                        {!product.inStock && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-20">Sold Out</div>
                        )}
                        {product.isFeatured && product.inStock && (
                          <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md z-20">
                            <Star size={12} className="fill-yellow-900" /> Featured
                          </div>
                        )}
                      </Link>

                      <div className="p-5 flex flex-col flex-grow">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">{product.category}</p>
                        
                        {/* 🚀 TITLE CLICKABLE LINK TO DETAILED PAGE */}
                        <Link href={`/product/${productIdentifier}`}>
                          <h3 className="font-bold text-charcoal text-lg mb-2 line-clamp-2 hover:text-brand-900 cursor-pointer">{product.name}</h3>
                        </Link>
                        
                        <div className="flex items-center gap-3 mb-5 mt-auto">
                          <span className="font-bold text-xl text-brand-900">₹{product.price.toLocaleString()}</span>
                          {product.mrp && <span className="text-sm text-gray-400 line-through">₹{product.mrp.toLocaleString()}</span>}
                        </div>
                        
                        <button 
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!product.inStock}
                          className="w-full py-3 rounded-lg bg-brand-900 text-cream font-bold text-sm hover:bg-brand-800 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                          <ShoppingBag size={18} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                      </div>
                    </div>
                  );
                })}

              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-20 text-brand-900" />
                <h3 className="text-xl font-serif font-bold text-brand-900 mb-2">No dresses found</h3>
                <p className="text-gray-500">Try selecting a different category or check back later.</p>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}