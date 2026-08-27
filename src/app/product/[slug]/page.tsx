import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import AddToCartForm from '@/components/product/AddToCartForm';

// Database API se slug ya ID ke zariye product lane ka function
async function getProduct(slug: string) {
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  
  try {
    const res = await fetch(`${baseUrl}/api/products`, { 
      cache: 'no-store' 
    });
    const data = await res.json();
    const allProducts = Array.isArray(data) ? data : data.products || [];
    
    return allProducts.find((p: any) => p.slug === slug || p._id === slug);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

// Metadata (SEO ke liye)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Rose Fashion Designer`,
    description: product.seoDescription || product.description || "Premium custom-made dresses.",
  };
}

// Main Product Page Component
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
  
  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Image Gallery (Sticky on desktop so it stays while scrolling) */}
        <div className="w-full md:sticky md:top-24">
          <ProductGallery images={product.images} />
        </div>

        {/* Right Side: Product Details & Cart Form (Stacked vertically from top to bottom) */}
        <div className="flex flex-col space-y-6">
          
          {/* 1. Title */}
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-900">
            {product.name}
          </h1>

          <div className="w-full h-px bg-gray-200"></div>
          
          {/* 2. Description (Multi-line supported) */}
          <p className="text-charcoal/80 font-sans leading-relaxed whitespace-pre-line text-sm md:text-base">
            {product.description}
          </p>

          {/* 3. Specifications (Fabric, Handwork, Category) */}
          <ul className="space-y-2 text-sm text-charcoal bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <li><strong className="text-brand-900">Fabric:</strong> {product.fabric || 'Premium Quality'}</li>
            <li><strong className="text-brand-900">Hand-work:</strong> {product.handworkDetails || 'Custom Detailed'}</li>
            <li><strong className="text-brand-900">Category:</strong> {product.category}</li>
          </ul>

          {/* 4. Price, Sizes, and Add to Cart Form (Ab ye sab description aur specs ke NEECHE aayega) */}
          <div className="pt-4 border-t border-gray-200">
            <AddToCartForm product={{
              ...product,
              images: product.images && product.images.length > 0 ? product.images : ['/images/placeholder.jpg'],
              sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'],
              colors: product.colors && product.colors.length > 0 ? product.colors : ['Default']
            }} />
          </div>

        </div>
      </div>
    </div>
  );
}