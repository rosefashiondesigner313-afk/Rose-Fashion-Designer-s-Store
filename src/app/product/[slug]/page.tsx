import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import AddToCartForm from '@/components/product/AddToCartForm';

const createSlug = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

async function getProduct(slug: string) {
  const baseUrl = 'https://www.rosefashiondesigner.com';
  
  try {
    const res = await fetch(`${baseUrl}/api/products`, { 
      cache: 'no-store' 
    });
    const data = await res.json();
    const allProducts = Array.isArray(data) ? data : data.products || [];
    
    return allProducts.find((p: any) => {
      const generatedSlug = createSlug(p.name);
      return generatedSlug === slug || p.slug === slug || p._id === slug;
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Rose Fashion Designer`,
    description: product.seoDescription || product.description || "Premium custom-made dresses.",
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProduct(resolvedParams.slug);
  
  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
        
        {/* Left Side: Image Gallery */}
        <div className="w-full md:sticky md:top-24">
          <ProductGallery images={product.images} />
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col">
          
          {/* 1. Title (Hamesha sabse upar rahega) */}
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-900 mb-4">
            {product.name}
          </h1>

          <div className="w-full h-px bg-gray-200 mb-6"></div>
          
          {/* 🚀 MOBILE ORDER FIX: 
              Desktop par (md:flex-col) ye normal flow me rahega. 
              Lekin Mobile par hum Flexbox ke order-2 aur order-1 ka use karke 
              Price/Cart form ko pehle aur Description/Specs ko baad me le aaye hain. */}
          
          <div className="flex flex-col">
            
            {/* Price & Add to Cart Form (Mobile par pehle dikhega) */}
            <div className="order-1 md:order-2 pt-2 pb-6 md:py-0 border-b md:border-b-0 border-gray-200 mb-6 md:mb-0">
              <AddToCartForm product={{
                ...product,
                images: product.images && product.images.length > 0 ? product.images : ['/images/placeholder.jpg'],
                sizes: product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'],
                colors: product.colors && product.colors.length > 0 ? product.colors : ['Default']
              }} />
            </div>

            {/* Description & Specifications (Mobile par price ke NEECHE aayega) */}
            <div className="order-2 md:order-1 space-y-6">
              
              {/* Description */}
              <p className="text-charcoal/80 font-sans leading-relaxed whitespace-pre-line text-sm md:text-base">
                {product.description}
              </p>

              {/* Specifications */}
              <ul className="space-y-2 text-sm text-charcoal bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <li><strong className="text-brand-900">Fabric:</strong> {product.fabric || 'Premium Quality'}</li>
                <li><strong className="text-brand-900">Hand-work:</strong> {product.handworkDetails || 'Custom Detailed'}</li>
                <li><strong className="text-brand-900">Category:</strong> {product.category}</li>
              </ul>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}