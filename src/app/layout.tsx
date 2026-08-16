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
  title: "Rose Fashion Designer | Premium Hand-Worked Dresses",
  description: "Shop premium hand-worked women's dresses, Anarkali suits, and custom designer wear at Rose Fashion Designer.",
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