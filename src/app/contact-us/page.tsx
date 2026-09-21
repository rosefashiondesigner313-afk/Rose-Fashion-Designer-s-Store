
import type { Metadata } from "next";
import ContactUsClient from './ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us | Rose Fashion Designer – Custom Dress Studio, Govandi, Mumbai',
  description: 'Visit or contact our Mumbai studio for custom dress orders, consultations, and order support. Shop 07, Lallubhai Compound, Govandi East, Mumbai.',
// icons: {
//     icon: '/images/rose-favicon-01.png', // Yahan apne favicon ka path de do
//   },
};

export default function ContactUsPage() {
  return <ContactUsClient/>
}