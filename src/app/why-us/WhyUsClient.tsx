'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, ShieldCheck, Gem, HeartHandshake } from 'lucide-react';

export default function WhyUsPage() {
  return (
    <div className="bg-cream min-h-screen pb-16">
      
      {/* Hero Section */}
      <div className="bg-brand-900 text-cream py-20 px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Rose Fashion Promise</h1>
        <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
        <p className="font-sans text-brand-100 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          More than just clothing, we create wearable art. Discover the passion, precision, 
          and premium quality that goes into every single stitch of our hand-worked dresses.
        </p>
      </div>

      {/* Brand Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Image Side */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-t-full overflow-hidden shadow-2xl border-4 border-white">
              {/* Using one of your existing images as a beautiful placeholder */}
              <Image 
                src="/images/product/edited-25.webp" 
                alt="Master Craftsmanship" 
                fill
                className="object-cover object-top"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold/20 rounded-full blur-2xl -z-10"></div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-6">
              Crafting Elegance, <br /> Tailoring Dreams.
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed font-sans">
              <p>
                At Rose Fashion Designer, we believe that every woman deserves an outfit that makes her feel confident, beautiful, and completely unique. 
              </p>
              <p>
                What started as a small boutique passion has now grown into a premium destination for hand-worked dresses, luxury anarkalis, and signature custom fits. We don't believe in mass production; we believe in masterpieces.
              </p>
              <p>
                Our master artisans spend hours, sometimes days, perfecting the intricate embroidery and hand-work that make our collections truly stand out. When you wear Rose Fashion, you wear a legacy of Indian craftsmanship blended with modern elegance.
              </p>
            </div>
            
            <div className="mt-10">
              <Link 
                href="/custom-design" 
                className="inline-block bg-brand-900 text-cream px-8 py-3.5 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-brand-800 transition-colors shadow-md"
              >
                Experience Custom Fit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl font-bold text-brand-900 mb-2">Why Choose Us?</h2>
          <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">The Pillars of Our Quality</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Gem, title: "Premium Fabrics", desc: "We source only the finest, skin-friendly, and luxurious fabrics for our dresses." },
            { icon: Star, title: "Hand-Worked Details", desc: "Intricate embroidery and detailing done by expert artisans, not machines." },
            { icon: ShieldCheck, title: "Quality Assured", desc: "Every dress goes through a strict 3-step quality check before dispatch." },
            { icon: HeartHandshake, title: "Made for YOU", desc: "We celebrate all body types with our flawless made-to-measure custom service." }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-50 hover:shadow-lg transition-shadow duration-300 text-center group">
              <div className="w-16 h-16 mx-auto bg-brand-50 text-brand-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-900 group-hover:text-gold transition-colors duration-300">
                <feature.icon size={30} />
              </div>
              <h3 className="font-serif text-xl font-bold text-brand-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}