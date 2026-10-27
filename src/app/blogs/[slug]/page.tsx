import { blogPosts } from '@/data/blogs';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// 🚀 Har blog ke liye dynamic SEO Metadata generate karne ka function
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Blog Not Found – Rose Fashion Designer',
    };
  }

  return {
    title: `${post.title} – Rose Fashion Designer`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/blogs" className="text-sm font-bold text-gold hover:underline mb-6 inline-block">
        ← Back to all blogs
      </Link>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
        <span>{post.date}</span>
        <span>•</span>
        <span>{post.readTime}</span>
      </div>

      <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-900 mb-6 leading-tight">
        {post.title}
      </h1>

      <div className="relative h-80 md:h-[450px] w-full rounded-2xl overflow-hidden shadow-lg mb-8">
        <Image 
          src={post.image} 
          alt={post.title} 
          fill 
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Content */}
      <div 
        className="prose prose-lg max-w-none text-gray-700 space-y-4 font-sans leading-relaxed mb-16"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* 🛍️ RELATED DRESS / PRODUCT CARDS SECTION */}
      {post.relatedProducts && post.relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-10 mt-12">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-900 mb-2">
              Shop The Look in This Article
            </h3>
            <p className="text-gray-600 text-sm">
              Explore the exact hand-worked pieces featured or get them custom-made for your size.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {post.relatedProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group"
              >
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-brand-900 mb-1 group-hover:text-gold transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-gold font-bold text-base mb-4">
                      {product.price}
                    </p>
                  </div>
                  <Link 
                    href={product.link}
                    className="w-full text-center bg-brand-900 text-cream py-2.5 rounded-md font-bold text-sm uppercase tracking-wide hover:bg-gold hover:text-brand-900 transition-colors shadow-sm"
                  >
                    View & Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action Box */}
      <div className="mt-16 bg-brand-900 text-cream p-8 rounded-2xl text-center">
        <h3 className="font-serif text-2xl font-bold mb-2">Want a Custom Size or Color?</h3>
        <p className="text-brand-100 text-sm mb-6 max-w-lg mx-auto">
          We handcraft custom ethnic dresses tailored precisely to your measurements. Speak with our master tailors today.
        </p>
        <Link 
          href="/custom-design" 
          className="inline-block bg-gold text-brand-900 px-8 py-3 rounded-md font-bold hover:bg-cream transition-colors uppercase tracking-wide text-sm"
        >
          Book Free Consultation
        </Link>
      </div>
    </article>
  );
}