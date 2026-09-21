import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import FloatingContact from '@/components/layout/FloatingContact';
import Providers from '@/components/Providers';

// Configure our luxury brand fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

// Update SEO metadata for Rose Fashion Designer
export const metadata: Metadata = {
  title: 'Buy Designer Anarkali Dresses Online | Custom Hand-Worked Anarkali Suits – Rose Fashion Designer',
  description: 'Shop premium hand-worked Anarkali dresses online, or get one custom-tailored to your measurements. Pan-India delivery from our Mumbai studio.',
// icons: {
//     icon: '/images/rose-favicon-01.png', // Yahan apne favicon ka path de do
//   },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      {/* Apply our brand background (cream) and text color (charcoal) */}
      <body className="min-h-full flex flex-col font-sans bg-cream text-charcoal">
        <Providers>
        <CartProvider> {/* <-- WRAP THIS */}
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer/>
        <FloatingContact />
        </CartProvider> {/* <-- WRAP THIS */}
        </Providers>
      </body>
    </html>
  );
}