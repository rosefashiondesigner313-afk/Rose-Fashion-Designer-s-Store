import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
  title: 'About Rose Fashion Designer | Handcrafted Custom Dress Studio',
  description: 'Learn the story behind Rose Fashion Designer — a Mumbai-based studio crafting premium hand-worked and custom-tailored dresses since 2016.',
// icons: {
//     icon: '/images/rose-favicon-01.png', // Yahan apne favicon ka path de do
//   },
};

export default function AboutUsPage() {
  return <AboutUsClient />;
  
}