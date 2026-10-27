import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blogs';

export const metadata = {
  title: 'Fashion Blogs & Styling Tips – Rose Fashion Designer',
  description: 'Explore the latest ethnic fashion trends, styling guides, and craftsmanship stories from our Mumbai design studio.',
};

export default function BlogListingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-900 mb-4">
          Our Journal & Style Stories
        </h1>
        <p className="text-gray-600">
          Insights on ethnic fashion, wedding styling tips, and the craftsmanship of custom-made dresses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article 
            key={post.slug} 
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col hover:shadow-xl transition-shadow"
          >
            <div className="relative h-56 w-full">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="font-serif text-xl font-bold text-brand-900 mb-3 hover:text-gold transition-colors">
                <Link href={`/blogs/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-auto">
                <Link 
                  href={`/blogs/${post.slug}`}
                  className="inline-block font-bold text-brand-900 border-b-2 border-gold pb-1 text-sm hover:text-gold transition-colors"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}