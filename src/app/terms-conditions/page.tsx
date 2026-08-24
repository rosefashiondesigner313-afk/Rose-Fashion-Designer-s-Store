'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function TermsConditionsPage() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const content = {
    EN: {
      title: "Terms & Conditions",
      updated: "Last updated: August 2026",
      sec1Title: "1. General Overview",
      sec1Text: "Welcome to Rose Fashion Designer. By visiting our website and/or purchasing something from us, you engage in our Service and agree to be bound by the following terms and conditions. These Terms apply to all users of the site.",
      sec2Title: "2. Product Display & Representation",
      sec2Text: "We make every effort to display the colors, fabrics, and images of our products as accurately as possible. However, due to screen differences, studio lighting, and device settings, actual colors may vary slightly. We cannot guarantee that your computer monitor's display of any color will be 100% accurate.",
      sec3Title: "3. Pricing & Modifications",
      sec3Text: "Prices for our custom and premium dresses are subject to change without prior notice. We reserve the right at any time to modify or discontinue any product or service without notice.",
      sec4Title: "4. Billing & Account Information",
      sec4Text: "You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. We reserve the right to refuse any order you place with us.",
      sec5Title: "5. Product Care Responsibility",
      sec5Text: "Our premium dresses involve delicate hand-work, embroidery, and special fabrics. It is the customer's responsibility to follow proper care instructions (e.g., dry cleaning only). We are not liable for any damage to the fabric, color bleeding, or embellishment loss post-purchase due to improper washing.",
      footerHelp: "By continuing to use our site, you agree to these terms.",
      footerBtn: "Return to Shop"
    },
    HI: {
      title: "नियम और शर्तें (Terms & Conditions)",
      updated: "अंतिम अपडेट: अगस्त 2026",
      sec1Title: "1. सामान्य जानकारी",
      sec1Text: "रोज़ फैशन डिज़ाइनर में आपका स्वागत है। हमारी वेबसाइट पर आने और/या हमसे कुछ खरीदने पर, आप हमारी सेवाओं का उपयोग करते हैं और निम्नलिखित नियमों और शर्तों से बंधे होने के लिए सहमत होते हैं। ये शर्तें साइट के सभी उपयोगकर्ताओं पर लागू होती हैं।",
      sec2Title: "2. उत्पाद प्रदर्शन (Product Display)",
      sec2Text: "हम अपने उत्पादों के रंग, कपड़े और छवियों को यथासंभव सटीक रूप से प्रदर्शित करने का हर संभव प्रयास करते हैं। हालांकि, स्क्रीन के अंतर, स्टूडियो लाइटिंग और डिवाइस सेटिंग के कारण, असली रंग थोड़े भिन्न हो सकते हैं। हम यह गारंटी नहीं दे सकते कि आपके मोबाइल/कंप्यूटर स्क्रीन पर दिखने वाला रंग 100% सटीक होगा।",
      sec3Title: "3. मूल्य निर्धारण और बदलाव",
      sec3Text: "हमारी कस्टम और प्रीमियम ड्रेसेस की कीमतें बिना किसी पूर्व सूचना के बदली जा सकती हैं। हम किसी भी समय बिना नोटिस के किसी भी उत्पाद या सेवा को संशोधित या बंद करने का अधिकार सुरक्षित रखते हैं।",
      sec4Title: "4. बिलिंग और खाता जानकारी",
      sec4Text: "आप हमारे स्टोर पर की गई सभी खरीदारी के लिए वर्तमान, पूर्ण और सटीक खरीदारी और खाता जानकारी प्रदान करने के लिए सहमत हैं। हम आपके द्वारा दिए गए किसी भी ऑर्डर को अस्वीकार करने का अधिकार सुरक्षित रखते हैं।",
      sec5Title: "5. उत्पाद की देखभाल की जिम्मेदारी",
      sec5Text: "हमारे प्रीमियम कपड़ों में नाजुक हाथ का काम, कढ़ाई और विशेष फैब्रिक शामिल होते हैं। उचित देखभाल निर्देशों (जैसे, केवल ड्राई क्लीनिंग) का पालन करना ग्राहक की जिम्मेदारी है। गलत तरीके से धोने के कारण कपड़े को होने वाले नुकसान, रंग उड़ने या कढ़ाई खराब होने के लिए हम जिम्मेदार नहीं होंगे।",
      footerHelp: "हमारी साइट का उपयोग जारी रखकर, आप इन शर्तों से सहमत होते हैं।",
      footerBtn: "शॉप पर वापस जाएं"
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
          <section><h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec5Title}</h2><p className="text-gray-600">{current.sec5Text}</p></section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">{current.footerHelp}</p>
          <Link href="/shop" className="bg-brand-900 text-cream px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-800 transition-colors">{current.footerBtn}</Link>
        </div>
      </div>
    </div>
  );
}