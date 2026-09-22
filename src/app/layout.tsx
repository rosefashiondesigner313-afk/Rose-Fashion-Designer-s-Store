import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script"; // 🚀 GTM ke liye Next.js ka Script import kiya
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
//    icon: '/images/rose-favicon-01.png', // Yahan apne favicon ka path de do
//  },
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
      <head>
        {/* 🚀 Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NTF99ZZP');
            `,
          }}
        />
      </head>
      {/* Apply our brand background (cream) and text color (charcoal) */}
      <body className="min-h-full flex flex-col font-sans bg-cream text-charcoal">
        {/* 🚀 Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NTF99ZZP"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

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