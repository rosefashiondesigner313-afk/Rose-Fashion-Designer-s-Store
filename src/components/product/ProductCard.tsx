'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Zap, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/CartContext';

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const router = useRouter();
  
  // Naya State: Wishlist ko toggle karne ke liye
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fallback sizes agar database me empty ho
  const defaultSize = (product.sizes && product.sizes.length > 0) ? product.sizes[0] : 'M';
  
  // 🔥 IMPORTANT: Database id (._id) ya slug ko pehchanna
  const productIdentifier = product.slug || product._id || product.id;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    addToCart({
      id: `${productIdentifier}-${defaultSize}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: defaultSize,
      quantity: 1
    });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    handleAddToCart(e);
    router.push('/cart'); 
  };
  
  // Function: Heart button click handle karne ke liye
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); 
    setIsWishlisted(!isWishlisted);
  };

  // Check agar dusri image exist karti hai
  const hasSecondImage = product.images && product.images.length > 1;

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-brand-50">
      
      {/* 1. Image Area (Hover Effect ke sath) */}
      <Link href={`/product/${productIdentifier}`} className="relative aspect-[3/4] md:aspect-[4/5] max-h-[420px] w-full overflow-hidden bg-gray-50 block">
        
        {/* Background (2nd) Image */}
        {hasSecondImage && (
          <Image
            src={product.images[1]}
            alt={`${product.name} back view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="absolute inset-0 object-cover object-top transition-transform duration-700 group-hover:scale-105 z-0"
          />
        )}

        {/* Foreground (1st) Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`absolute inset-0 object-cover object-top transition-all duration-700 z-10 ${hasSecondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
        />
        
        {/* Top Left: Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
          {product.mrp && (
            <span className="bg-brand-700 text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-md">
              Sale
            </span>
          )}
          {product.category === 'Hand-Worked Dresses' && (
            <span className="bg-gold text-brand-900 text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest shadow-md">
              Premium
            </span>
          )}
        </div>

        {/* Top Right: Wishlist Heart Button */}
        <button 
          onClick={toggleWishlist}
          className="absolute top-3 right-3 z-20 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-300 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-charcoal hover:text-red-500'}`} 
          />
        </button>

        {/* Bottom Right: Price Tag Over Image */}
        <div className="absolute bottom-3 right-3 z-20 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-gray-100 flex items-center gap-2">
          <span className="font-bold text-sm text-brand-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.mrp && (
            <span className="text-[10px] text-gray-400 line-through font-medium">₹{product.mrp.toLocaleString('en-IN')}</span>
          )}
        </div>
      </Link>

      {/* 2. Product Details */}
      <div className="p-5 flex flex-col flex-grow text-center z-20 relative bg-white">
        <Link href={`/product/${productIdentifier}`}>
          <h3 className="font-serif text-lg font-bold text-brand-900 mb-1 group-hover:text-brand-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-charcoal/60 font-sans mb-2 line-clamp-1 uppercase tracking-wide">
          {product.category || 'Dress'}
        </p>

        <div className="flex-grow"></div>

        {/* 3. Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3 pt-4 border-t border-brand-50">
          <button 
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-2 bg-cream text-brand-900 border border-brand-200 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-brand-50 transition-colors"
          >
            <ShoppingBag size={14} />
            Add
          </button>
          
          <button 
            onClick={handleBuyNow}
            className="flex items-center justify-center gap-2 bg-brand-900 text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-brand-700 transition-colors shadow-sm"
          >
            <Zap size={14} />
            Buy Now
          </button>
        </div>
      </div>

    </div>
  );
}