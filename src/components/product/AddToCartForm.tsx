'use client';

import { useState } from 'react';
import { Product } from '@/types';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag } from 'lucide-react';

export default function AddToCartForm({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`, // Yahan se bhi color hata diya
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: 1
    });
  };
  
 

  return (
    <div className="mt-4 space-y-6">
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-semibold text-charcoal mb-3 uppercase tracking-wider">Color: <span className="font-normal text-brand-900">{selectedColor}</span></h3>
        <div className="flex gap-3">
          {product.colors.map(color => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-sm text-sm transition-all ${selectedColor === color ? 'border-brand-900 bg-brand-50 text-brand-900 font-bold' : 'border-gray-200 text-charcoal hover:border-brand-200'}`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between mb-3">
          <h3 className="text-sm font-semibold text-charcoal uppercase tracking-wider">Size</h3>
          <button className="text-sm text-brand-700 underline hover:text-brand-900">Size Guide</button>
        </div>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[3rem] h-12 flex items-center justify-center border rounded-sm text-sm transition-all px-4 ${selectedSize === size ? 'border-brand-900 bg-brand-900 text-white font-bold' : 'border-gray-200 text-charcoal hover:border-brand-200'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Action Area: Twin Buttons (Price & Add to Cart) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-6 border-t border-gray-200">
        
        {/* Price Box (Looks like a button) */}
        <div className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-white border-2 border-brand-900 py-4 px-4 rounded-sm shadow-sm text-brand-900">
          <span className="text-xs uppercase tracking-widest font-semibold text-charcoal/70 mt-1">Total:</span>
          <span className="text-xl font-serif font-bold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-medium ml-1">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="w-full sm:w-1/2 flex items-center justify-center gap-2 bg-brand-900 border-2 border-brand-900 text-cream py-4 px-4 rounded-sm font-bold uppercase tracking-widest hover:bg-brand-700 hover:border-brand-700 transition-colors shadow-md hover:shadow-lg"
        >
          <ShoppingBag size={20} /> Add to Cart
        </button>
        
      </div>
    </div>
  );
}