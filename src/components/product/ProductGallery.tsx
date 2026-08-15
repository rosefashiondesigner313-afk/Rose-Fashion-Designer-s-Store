'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4 w-full max-w-md mx-auto lg:max-w-lg lg:mx-0">
      
      {/* Main Large Image - Height controlled here */}
      <div className="relative aspect-[4/5] md:aspect-[3/4] max-h-[550px] w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-brand-50">
        <Image 
          src={mainImage} 
          alt="Product view" 
          fill 
          sizes="(max-width: 768px) 100vw, 50vw" 
          className="object-cover object-top" 
          priority 
        />
      </div>
      
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto py-1 [&::-webkit-scrollbar]:hidden">
        {images.map((img, index) => (
          <button 
            key={index} 
            onClick={() => setMainImage(img)}
            className={`relative w-20 h-24 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
              mainImage === img 
                ? 'border-brand-900 shadow-md' 
                : 'border-transparent hover:border-brand-200'
            }`}
          >
            <Image 
              src={img} 
              alt={`Thumbnail ${index + 1}`} 
              fill 
              sizes="80px" 
              className="object-cover object-top" 
            />
          </button>
        ))}
      </div>

    </div>
  );
}