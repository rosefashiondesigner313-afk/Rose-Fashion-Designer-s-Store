'use client';

import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const banners = [
  {
    id: 1,
    image: "/images/slider/Anarkali-mustard-suit.webp",
    title: "Anarkali Suits",
    subtitle: "From ₹4,999*",
    tag: "NEW ARRIVALS",
    link: "/shop",
  },
  {
    id: 2,
    image: "/images/slider/jumpsuit-pink.webp",
    title: "Custom Fits",
    subtitle: "Made to measure",
    tag: "BEST SELLER",
    link: "/shop",
  },
  {
    id: 3,
    image: "/images/slider/jumpsuit-black.webp",
    title: "Party Wear",
    subtitle: "Explore Collections",
    tag: "FESTIVE",
    link: "/shop",
  },
  {
    id: 4,
    image: "/images/slider/jumpsuit-1.webp",
    title: "Hand-Worked",
    subtitle: "Premium Quality",
    tag: "LUXURY",
    link: "/shop",
  },
  {
    id: 5,
    image: "/images/slider/dhoticut-suit.webp",
    title: "Bridal Wear",
    subtitle: "Your special day",
    tag: "WEDDING",
    link: "/shop",
  }
  // {
  //   id: 6,
  //   image: "https://images.unsplash.com/photo-1550634289-49cb5587f8a7?q=80&w=800&auto=format&fit=crop",
  //   title: "Dhoti Cut Suits",
  //   subtitle: "Modern traditional",
  //   tag: "TRENDING",
  //   link: "/category/dhoti-cut-suits",
  // },
  // {
  //   id: 7,
  //   image: "https://images.unsplash.com/photo-1550634288-c7e63b392a54?q=80&w=800&auto=format&fit=crop",
  //   title: "Black Jump Suits",
  //   subtitle: "Elegant & bold",
  //   tag: "SIGNATURE",
  //   link: "/category/black-jump-suits",
  // }
];

// 1. Create a duplicated array for the infinite loop illusion
const infiniteBanners = [...banners, ...banners];

export default function HeroSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync the dots with the scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const card = scrollRef.current.firstElementChild as HTMLElement;
      if (card) {
        const cardWidth = card.offsetWidth + 16;
        const currentIndex = Math.round(scrollPosition / cardWidth);
        // 2. Use modulo (%) so dots 8-14 map back to dots 1-7 automatically
        setActiveIndex(currentIndex % banners.length);
      }
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const card = current.firstElementChild as HTMLElement;
      const scrollAmount = card ? card.offsetWidth + 16 : 400; 
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      if (scrollRef.current) {
        const card = scrollRef.current.firstElementChild as HTMLElement;
        const cardWidth = card ? card.offsetWidth + 16 : 400;
        const scrollLeft = scrollRef.current.scrollLeft;

        // Move one slide to the right smoothly
        scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });

        // 3. The Teleport Trick: If we have scrolled past the first set of 7 images...
        if (scrollLeft >= cardWidth * (banners.length - 1)) {
          // Wait 500ms for the smooth scroll animation to finish...
          setTimeout(() => {
            if (scrollRef.current) {
              // ...and then instantly (behavior: 'auto') jump back to the original slide
              scrollRef.current.scrollTo({ 
                left: scrollRef.current.scrollLeft - (cardWidth * banners.length), 
                behavior: 'auto' 
              });
            }
          }, 500);
        }
      }
    }, 3500);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-6 group">
      
      {/* Slider Track */}
      <div 
        ref={scrollRef} 
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* We map over the DUPLICATED array here */}
        {infiniteBanners.map((banner, index) => (
          <Link 
            href={banner.link}
            // Use index in key because IDs are duplicated now
            key={`${banner.id}-${index}`} 
            className="relative flex-none w-full sm:w-[100%] md:w-[65%] lg:w-[45%] xl:w-[40%] h-[180px] sm:h-[200px] md:h-[240px] rounded-xl overflow-hidden snap-start block group-hover/card:shadow-lg transition-shadow"
          >
             <div 
              className="absolute inset-0 bg-cover bg-[center_top] transition-transform duration-500 group-hover/card:scale-105"
              style={{ backgroundImage: `url('${banner.image}')` }}
            >
              {/* <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 via-charcoal/50 to-transparent"></div> */}
            </div>
{/*
            <div className="relative z-10 h-full flex flex-col justify-center p-6 md:p-8 text-cream">
              <span className="inline-block bg-brand-700 text-white text-[10px] font-bold px-2 py-1 rounded-sm w-max mb-2 tracking-wider">
                {banner.tag}
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold mb-1">
                {banner.title}
              </h2>
              <p className="font-sans text-sm md:text-base text-cream/90 font-medium">
                {banner.subtitle}
              </p>
            </div> */}
          </Link>
        ))}
      </div>

      {/* Pagination Dots (Mobile & Desktop) */}
      <div className="flex justify-center mt-4 gap-1.5 md:hidden">
        {/* We map over the ORIGINAL array here so we only show 7 dots! */}
        {banners.map((_, index) => (
          <div
            key={index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index 
                ? 'w-5 bg-charcoal' 
                : 'w-1.5 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white shadow-md text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex hover:scale-110 z-20 border border-gray-100"
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white shadow-md text-charcoal p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:flex hover:scale-110 z-20 border border-gray-100"
        aria-label="Scroll right"
      >
        <ChevronRight size={24} />
      </button>

    </div>
  );
}