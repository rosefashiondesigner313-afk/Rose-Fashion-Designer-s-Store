import { notFound } from 'next/navigation';
import { mockProducts } from '@/data/mockProducts';
import ProductGallery from '@/components/product/ProductGallery';
import AddToCartForm from '@/components/product/AddToCartForm';

// 1. We define params as a Promise and await it
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = mockProducts.find(p => p.slug === resolvedParams.slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Rose Fashion Designer`,
    description: product.shortDescription,
  };
}

// 2. We make the main component async and await the params here too
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = mockProducts.find(p => p.slug === resolvedParams.slug);
  
  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Side: Image Gallery */}
        <div className="w-full">
          <ProductGallery images={product.images} />
        </div>

        {/* Right Side: Product Details & Cart Form */}
        <div className="flex flex-col">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-900 mb-2">
            {product.name}
          </h1>
          {/* <p className="font-sans text-brand-700 text-xl font-bold mb-6">
            ₹{product.price.toLocaleString('en-IN')}
          </p> */}

          <div className="w-full h-px bg-gray-200 mb-6"></div>
          
          <p className="text-charcoal/80 font-sans leading-relaxed mb-6">
            {product.seoDescription}
          </p>

          <ul className="space-y-2 text-sm text-charcoal mb-8">
            <li><strong className="text-brand-900">Fabric:</strong> {product.fabric}</li>
            <li><strong className="text-brand-900">Hand-work:</strong> {product.handworkDetails}</li>
            <li><strong className="text-brand-900">Category:</strong> {product.category}</li>
          </ul>

          {/* Interactive Form for Colors, Sizes, and Cart */}
          <AddToCartForm product={product} />

        </div>
      </div>
    </div>
  );
}