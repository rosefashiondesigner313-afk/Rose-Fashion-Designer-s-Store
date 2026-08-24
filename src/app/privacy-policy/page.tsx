'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const content = {
    EN: {
      title: "Privacy Policy",
      updated: "Last updated: August 2026",
      sec1Title: "1. Information We Collect",
      sec1Text: "When you purchase something from our store, we collect the personal information you give us such as your name, delivery address, phone number, and email address. This information is strictly used to fulfill your order.",
      sec2Title: "2. Payment Security",
      sec2Text: "We use secure, industry-standard payment gateways to process online transactions. We do not store your credit card, debit card, or UPI details on our servers. All transaction data is securely encrypted.",
      sec3Title: "3. Third-Party Services",
      sec3Text: "In general, the third-party providers used by us (such as courier partners) will only collect and use your information to the extent necessary to perform the services they provide to us (i.e., delivering your dress).",
      sec4Title: "4. Data Protection & Disclosure",
      sec4Text: "We highly value your privacy. We will never sell, rent, or trade your personal information to outside marketing agencies. We may disclose your personal information only if required by law.",
      footerHelp: "Your data is safe with us.",
      footerBtn: "Continue Shopping"
    },
    HI: {
      title: "गोपनीयता नीति (Privacy Policy)",
      updated: "अंतिम अपडेट: अगस्त 2026",
      sec1Title: "1. हम कौन सी जानकारी इकट्ठा करते हैं",
      sec1Text: "जब आप हमारे स्टोर से कुछ खरीदते हैं, तो हम आपका नाम, डिलीवरी का पता, फोन नंबर और ईमेल पता जैसी व्यक्तिगत जानकारी लेते हैं। इस जानकारी का उपयोग केवल आपका ऑर्डर पूरा करने के लिए किया जाता है।",
      sec2Title: "2. भुगतान सुरक्षा (Payment Security)",
      sec2Text: "हम ऑनलाइन लेनदेन (Transaction) के लिए सुरक्षित पेमेंट गेटवे का उपयोग करते हैं। हम आपके क्रेडिट कार्ड, डेबिट कार्ड या UPI की जानकारी अपने सर्वर पर सेव नहीं करते हैं। सभी भुगतान डेटा पूरी तरह से सुरक्षित और एन्क्रिप्टेड है।",
      sec3Title: "3. थर्ड-पार्टी सेवाएं",
      sec3Text: "सामान्य तौर पर, हमारे द्वारा उपयोग किए जाने वाले थर्ड-पार्टी प्रदाता (जैसे कूरियर डिलीवरी वाले) आपकी जानकारी का उपयोग केवल आप तक आपका पार्सल/ड्रेस सुरक्षित पहुंचाने के लिए करते हैं।",
      sec4Title: "4. डेटा सुरक्षा और खुलासा",
      sec4Text: "हम आपकी गोपनीयता का बहुत सम्मान करते हैं। हम कभी भी आपकी व्यक्तिगत जानकारी किसी बाहरी मार्केटिंग एजेंसी को नहीं बेचेंगे। हम आपकी व्यक्तिगत जानकारी का खुलासा केवल तभी कर सकते हैं जब कानून द्वारा ऐसा करना आवश्यक हो।",
      footerHelp: "आपका डेटा हमारे साथ 100% सुरक्षित है।",
      footerBtn: "शॉपिंग जारी रखें"
    }
  };

  const current = content[lang];

  return (
    <div className="bg-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 relative">
        
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
          <button onClick={() => setLang('EN')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === 'EN' ? 'bg-brand-900 text-cream' : 'text-gray-500 hover:text-brand-900'}`}>English</button>
          <button onClick={() => setLang('HI')} className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === 'HI' ? 'bg-brand-900 text-cream' : 'text-gray-500 hover:text-brand-900'}`}>हिंदी</button>
        </div>

        <div className="text-center mb-10 border-b border-gray-100 pb-8 mt-12 md:mt-0">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-4 pr-0 md:pr-32">{current.title}</h1>
          <p className="text-gray-500 font-sans text-sm">{current.updated}</p>
        </div>

        <div className="space-y-8 font-sans text-charcoal leading-relaxed">
          <section><h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec1Title}</h2><p className="text-gray-600">{current.sec1Text}</p></section>
          <section><h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec2Title}</h2><p className="text-gray-600">{current.sec2Text}</p></section>
          <section><h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec3Title}</h2><p className="text-gray-600">{current.sec3Text}</p></section>
          <section><h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec4Title}</h2><p className="text-gray-600">{current.sec4Text}</p></section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">{current.footerHelp}</p>
          <Link href="/shop" className="bg-brand-900 text-cream px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-800 transition-colors">{current.footerBtn}</Link>
        </div>
      </div>
    </div>
  );
}