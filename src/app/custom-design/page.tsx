import type { Metadata } from "next";
import CustomDesignClient from './CustomDesignClient';

export const metadata: Metadata = {
  title: 'Custom Tailored Dresses Online | Book a Free Design Consultation – Rose Fashion Designer',
  description: 'Get a dress made to your exact measurements. Share your idea, choose fabric, and our master tailors craft it. Free consultation, delivered pan-India.',
// icons: {
//     icon: '/images/rose-favicon-01.png', // Yahan apne favicon ka path de do
//   },
};

export default function CustomDesignPage() {
  return<CustomDesignClient/>
}