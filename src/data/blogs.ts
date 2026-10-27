export interface RelatedProduct {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string; // e.g., '/products/heavy-embroidered-anarkali' ya shop url
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  readTime: string;
  relatedProducts: RelatedProduct[]; // 👈 Yeh naya field add kiya
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-style-anarkali-suits-for-weddings',
    title: 'How to Style Heavy Hand-Worked Anarkali Suits for Weddings',
    excerpt: 'Discover expert styling tips on pairing your designer Anarkali with traditional jewellery and footwear for the upcoming wedding season.',
    content: `
      <p>Wedding season is all about making a statement with elegance and grace. A heavy hand-worked Anarkali suit is a timeless choice that never goes out of style...</p>
      <h3>1. Choose the Right Accessories</h3>
      <p>When your outfit features intricate zardozi or thread handwork, keep your accessories balanced. Opt for statement jhumkas or a kundan choker rather than layering everything.</p>
    `,
    date: 'Sep 28, 2026',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    readTime: '4 min read',
    relatedProducts: [
      {
        id: '1',
        name: 'Royal Maroon Hand-Worked Anarkali',
        price: '₹14,999',
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=500',
        link: '/products/royal-maroon-anarkali', // Apne shop/product ka link yahan de dein
      },
      {
        id: '2',
        name: 'Blush Pink Zardozi Bridal Suit',
        price: '₹18,500',
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=500',
        link: '/products/blush-pink-zardozi-suit',
      }
    ]
  },
  // Baaki blogs...
];