import { blogPosts } from '@/data/blogs';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

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
      <Link
        href="/blogs"
        className="text-sm font-bold text-gold hover:underline mb-6 inline-block"
      >
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

   <div className="relative w-full aspect-[3/2] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-8">
  <Image
    src={post.image}
    alt={post.title}
    fill
    priority
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 896px"
    className="object-contain object-center"
  />
</div>

      {/* Blog content and in-article product cards */}
      <div className="mb-16">
        {post.blocks.map((block, index) => {
          if (block.type === 'heading') {
            return (
              <h2
                key={`heading-${index}`}
                className="font-serif text-2xl md:text-3xl font-bold text-brand-900 mt-10 mb-4"
              >
                {block.text}
              </h2>
            );
          }

          if (block.type === 'paragraph') {
            return (
              <p
                key={`paragraph-${index}`}
                className="text-gray-700 font-sans leading-relaxed mb-5"
              >
                {block.text}
              </p>
            );
          }

          if (block.type === 'productGrid') {
            const products = post.relatedProducts.filter((product) =>
              block.productIds.includes(product.id)
            );

            if (products.length === 0) {
              return null;
            }

            return (
              <section
                key={`products-${index}`}
                className="my-10"
                aria-label="Shop Anarkali suit sets featured in this article"
              >
                <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-900 mb-5">
                  Shop Anarkali Suit Sets
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-shadow group"
                    >
                      <Link
                        href={product.link}
                        aria-label={`View ${product.name}`}
                        className="block"
                      >
                        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 448px"
                            className="object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </Link>

                      <div className="p-5 flex flex-col flex-grow justify-between">
                        <div>
                          <h4 className="font-serif text-lg font-bold text-brand-900 mb-2 group-hover:text-gold transition-colors">
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
                          View &amp; Buy Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}
      </div>

      {/* Additional related products */}
      {post.relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 pt-10 mt-12">
          <div className="text-center mb-8">
            <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-900 mb-2">
              Explore More Anarkali Suit Sets
            </h3>
            <p className="text-gray-600 text-sm">
              Explore our collection and choose a style that suits your occasion.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {post.relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-all group"
              >
                <Link href={product.link} aria-label={`View ${product.name}`}>
                  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 500px"
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>

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
                    View &amp; Buy Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="mt-16 bg-brand-900 text-cream p-8 rounded-2xl text-center">
        <h3 className="font-serif text-2xl font-bold mb-2">
          Want a Custom Size or Color?
        </h3>

        <p className="text-brand-100 text-sm mb-6 max-w-lg mx-auto">
          Explore custom outfit options tailored to your measurements. Contact
          us to discuss your preferred design, size, and color.
        </p>

        <Link
          href="/shop"
          className="inline-block bg-gold text-brand-900 px-8 py-3 rounded-md font-bold hover:bg-cream transition-colors uppercase tracking-wide text-sm"
        >
          Explore Custom Designs
        </Link>
      </section>
    </article>
  );
}