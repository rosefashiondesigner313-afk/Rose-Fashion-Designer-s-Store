
import { Metadata } from 'next';
import WhyUsClient from './WhyUsClient';
export const metadata: Metadata = {
  title: 'Why Choose Rose Fashion Designer | Custom Fit, Premium Fabric, Handcrafted Quality',
  description: 'Discover why customers trust us for custom dresses: premium fabrics, exact-fit tailoring, and hand-worked detailing on every order.',
// icons: {
//     icon: '/images/rose-favicon-01.png', // Yahan apne favicon ka path de do
//   },
};

export default function WhyUsPage() {
  return <WhyUsClient/>
}