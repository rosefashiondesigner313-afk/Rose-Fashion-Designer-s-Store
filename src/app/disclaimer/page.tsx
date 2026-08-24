'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DisclaimerPage() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const content = {
    EN: {
      title: "Legal Disclaimer",
      updated: "Please read this disclaimer carefully before making a purchase.",
      sec1Title: "1. Color and Appearance Disclaimer",
      sec1Text: "We make every effort to photograph our dresses under standard lighting to show accurate colors. However, due to variations in mobile screens and monitor settings, the colors you see may differ slightly from the actual product. A slight difference in color shade is not considered a defect.",
      sec2Title: "2. Hand-Work & Embroidery Disclaimer",
      sec2Text: "Many of our premium dresses feature intricate hand-embroidery. By nature, handcrafted items are imperfect, and slight variations in the pattern or occasional loose threads are characteristics of hand-worked garments, not manufacturing faults.",
      sec3Title: "3. Fabric & Color Guarantee",
      sec3Text: "As explicitly stated in our policies, we provide no warranty or guarantee on the fabric or color of the garments. We are not responsible for color bleeding, shrinkage, or fabric damage that occurs after the product has been washed by the customer.",
      sec4Title: "4. Sizing and Fit",
      sec4Text: "While we customize based on provided measurements, minor alterations may sometimes be required locally to achieve a perfect fit. We are not liable for the costs of any local alterations done by the customer.",
      footerHelp: "For any doubts, please contact us before ordering.",
      footerBtn: "Contact Us"
    },
    HI: {
      title: "कानूनी अस्वीकरण (Disclaimer)",
      updated: "खरीदारी करने से पहले कृपया इसे ध्यान से पढ़ें।",
      sec1Title: "1. रंग और रूप का अस्वीकरण",
      sec1Text: "हम सटीक रंग दिखाने के लिए अपनी ड्रेसेस की तस्वीरें अच्छी लाइटिंग में खींचने का हर संभव प्रयास करते हैं। हालांकि, मोबाइल स्क्रीन और मॉनिटर सेटिंग्स में अंतर के कारण, आपको जो रंग दिखाई देता है, वह असली उत्पाद से थोड़ा अलग हो सकता है। रंग में मामूली अंतर को 'खराबी (Defect)' नहीं माना जाएगा।",
      sec2Title: "2. हाथ का काम और कढ़ाई",
      sec2Text: "हमारी कई प्रीमियम ड्रेसेस में जटिल हाथ की कढ़ाई (Hand-work) होती है। हाथ से बनी चीजें पूरी तरह से मशीन जैसी परफ़ेक्ट नहीं होती हैं। पैटर्न में मामूली बदलाव या कभी-कभार ढीले धागे होना हाथ से बने कपड़ों की विशेषता है, यह कोई खराबी नहीं है।",
      sec3Title: "3. फैब्रिक और रंग की गारंटी",
      sec3Text: "जैसा कि हमारी पॉलिसी में स्पष्ट रूप से बताया गया है, हम फैब्रिक (कपड़े) या कपड़ों के रंग पर कोई वारंटी या गारंटी नहीं देते हैं। ग्राहक द्वारा कपड़े को धोने के बाद रंग उड़ने, सिकुड़ने या कपड़े को होने वाले नुकसान के लिए हम जिम्मेदार नहीं हैं।",
      sec4Title: "4. नाप और फिटिंग",
      sec4Text: "यद्यपि हम आपके द्वारा दिए गए नाप के आधार पर कपड़े बनाते हैं, लेकिन कभी-कभी एकदम सटीक फिटिंग पाने के लिए आपको अपने लोकल टेलर से मामूली अल्टरेशन (बदलाव) करवाने की आवश्यकता हो सकती है। ग्राहक द्वारा किए गए किसी भी स्थानीय अल्टरेशन के खर्च के लिए हम जिम्मेदार नहीं होंगे।",
      footerHelp: "किसी भी संदेह के लिए, कृपया ऑर्डर करने से पहले हमसे संपर्क करें।",
      footerBtn: "संपर्क करें"
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
          <Link href="/contact-us" className="bg-brand-900 text-cream px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-800 transition-colors">{current.footerBtn}</Link>
        </div>
      </div>
    </div>
  );
}