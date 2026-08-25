'use client'; // State use karne ke liye ise client component banana hoga

import { useState } from 'react';
import Link from 'next/link';
// import { Languages } from 'lucide-react'; // Agar use nahi ho raha toh hata sakte hain

export default function RefundPolicyPage() {
  // Bhasha select karne ke liye state ('EN' ya 'HI')
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  // English aur Hindi dono ka data
  const content = {
    EN: {
      title: "Refund & Replacement Policy",
      updated: "Last updated: August 2026",
      sec1Title: "1. Return Policy (Strict No-Return)",
      sec1Text: "At Rose Fashion Designer, we craft premium, custom-made, and hand-worked dresses with the utmost care. Because of the exclusive nature of our products, we maintain a strict No Return policy. Once a product is sold and delivered, it cannot be returned under any circumstances.",
      sec2Title: "2. 2-Day Replacement Policy",
      sec2Text1: "Customer satisfaction is very important to us. We offer a 2-day replacement policy strictly under the following conditions:",
      sec2List1: "The product received has a genuine manufacturing defect.",
      sec2List2: "The wrong item was dispatched from our end.",
      sec2Text2: "You must notify us within 2 days of receiving the package by sending a personal message or email. After 2 days, no replacement requests will be entertained.",
      sec3Title: "3. Warranty & Guarantee Disclaimer",
      sec3Text: "In the fashion industry, regular wear and tear are expected. Therefore, we provide no warranty and no guarantee on the fabric quality or the color of the dresses post-purchase. We recommend following proper care instructions for premium hand-worked garments.",
      sec4Title: "4. Fitting & Measurement Issues",
      sec4Text: "Since our dresses are premium and hand-worked, minor measurement variations may occasionally occur. If you face any fitting or measurement issues, please send us a personal message on WhatsApp or Email. Our team will connect with you to understand the issue and help resolve the fitting problem to the best of our abilities.",
      sec5Title: "5. Delivery Charges",
      sec5Text: "Please note that in any scenario (including replacements), the original delivery and shipping charges are strictly non-refundable and will be deducted from any adjusted amount.",
      
      // Naya Order Cancellation Section (English)
      sec6Title: "6. Order Cancellation Policy",
      sec6Text: "We process our custom-made orders quickly to ensure timely delivery. Please read our cancellation rules carefully:",
      sec6List1: "Orders can only be cancelled within 24 hours of placement.",
      sec6List2: "Once the order enters the manufacturing process or is dispatched, it cannot be cancelled.",
      sec6List3: "To request a cancellation, please contact us immediately via WhatsApp or Email.",
      
      footerHelp: "Need help with an order?",
      footerSub: "Reach out to us within 2 days of delivery.",
      footerBtn: "Contact Support"
    },
    HI: {
      title: "रिफंड और रिप्लेसमेंट पॉलिसी (वापसी के नियम)",
      updated: "अंतिम अपडेट: अगस्त 2026",
      sec1Title: "1. रिटर्न पॉलिसी (कोई वापसी नहीं)",
      sec1Text: "रोज़ फैशन डिज़ाइनर में, हम बहुत देखभाल के साथ प्रीमियम और कस्टम ड्रेसेस बनाते हैं। हमारे कपड़ों की विशेष प्रकृति के कारण, हम 'नो-रिटर्न' (वापसी नहीं) पॉलिसी का सख्ती से पालन करते हैं। एक बार उत्पाद बिकने और डिलीवर होने के बाद, इसे किसी भी परिस्थिति में वापस नहीं किया जा सकता है।",
      sec2Title: "2. 2-दिन की रिप्लेसमेंट (बदलाव) पॉलिसी",
      sec2Text1: "ग्राहक की संतुष्टि हमारे लिए बहुत महत्वपूर्ण है। हम केवल निम्नलिखित शर्तों के तहत 2-दिन की रिप्लेसमेंट पॉलिसी देते हैं:",
      sec2List1: "प्राप्त उत्पाद में कोई असली निर्माण दोष (Manufacturing defect) हो।",
      sec2List2: "हमारी तरफ से गलत आइटम भेजा गया हो।",
      sec2Text2: "पैकेज मिलने के 2 दिनों के अंदर आपको हमें मैसेज या ईमेल के जरिए सूचित करना होगा। 2 दिनों के बाद, किसी भी रिप्लेसमेंट अनुरोध पर विचार नहीं किया जाएगा।",
      sec3Title: "3. वारंटी और गारंटी अस्वीकरण (Disclaimer)",
      sec3Text: "फैशन इंडस्ट्री में, कपड़ों का सामान्य रूप से घिसना या पुराना होना आम बात है। इसलिए, हम खरीदारी के बाद कपड़े की क्वालिटी या रंग पर कोई वारंटी और कोई गारंटी नहीं देते हैं। हम प्रीमियम हैंड-वर्क वाले कपड़ों की सही देखभाल करने की सलाह देते हैं।",
      sec4Title: "4. फिटिंग और नाप (Measurement) की समस्या",
      sec4Text: "चूंकि हमारी ड्रेसेस प्रीमियम और हाथ के काम वाली होती हैं, इसलिए कभी-कभी नाप में मामूली अंतर आ सकता है। यदि आपको फिटिंग या नाप से जुड़ी कोई समस्या आती है, तो कृपया हमें WhatsApp या ईमेल पर मैसेज करें। हमारी टीम आपसे संपर्क करेगी और फिटिंग की समस्या को ठीक करने में पूरी मदद करेगी।",
      sec5Title: "5. डिलीवरी चार्ज",
      sec5Text: "कृपया ध्यान दें कि किसी भी स्थिति में (रिप्लेसमेंट सहित), मूल डिलीवरी और शिपिंग शुल्क (Delivery Charges) वापस नहीं किए जाएंगे और उन्हें काटा जाएगा।",
      
      // Naya Order Cancellation Section (Hindi)
      sec6Title: "6. ऑर्डर कैंसलेशन (रद्दीकरण) पॉलिसी",
      sec6Text: "समय पर डिलीवरी सुनिश्चित करने के लिए हम कस्टम-मेड ऑर्डर्स पर तेजी से काम करते हैं। कृपया हमारे कैंसलेशन नियम ध्यान से पढ़ें:",
      sec6List1: "ऑर्डर प्लेस करने के 24 घंटे के भीतर ही इसे कैंसिल किया जा सकता है।",
      sec6List2: "एक बार ऑर्डर बनने की प्रक्रिया में जाने या डिस्पैच (भेजे जाने) के बाद, इसे कैंसिल नहीं किया जा सकता।",
      sec6List3: "कैंसलेशन का अनुरोध करने के लिए, कृपया हमें तुरंत WhatsApp या ईमेल के माध्यम से संपर्क करें।",
      
      footerHelp: "ऑर्डर के संबंध में मदद चाहिए?",
      footerSub: "डिलीवरी के 2 दिनों के भीतर हमसे संपर्क करें।",
      footerBtn: "सपोर्ट टीम से बात करें"
    }
  };

  const current = content[lang];

  return (
    <div className="bg-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 relative">
        
        {/* 🚀 LANGUAGE TOGGLE BUTTON */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center bg-gray-50 rounded-full p-1 border border-gray-200">
          <button 
            onClick={() => setLang('EN')} 
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === 'EN' ? 'bg-brand-900 text-cream' : 'text-gray-500 hover:text-brand-900'}`}
          >
            English
          </button>
          <button 
            onClick={() => setLang('HI')} 
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${lang === 'HI' ? 'bg-brand-900 text-cream' : 'text-gray-500 hover:text-brand-900'}`}
          >
            हिंदी
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-10 border-b border-gray-100 pb-8 mt-12 md:mt-0">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-900 mb-4 pr-0 md:pr-32">
            {current.title}
          </h1>
          <p className="text-gray-500 font-sans text-sm">
            {current.updated}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 font-sans text-charcoal leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec1Title}</h2>
            <p className="text-gray-600">{current.sec1Text}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec2Title}</h2>
            <p className="text-gray-600 mb-2">{current.sec2Text1}</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>{current.sec2List1}</li>
              <li>{current.sec2List2}</li>
            </ul>
            <p className="text-gray-600 mt-2">{current.sec2Text2}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec3Title}</h2>
            <p className="text-gray-600">{current.sec3Text}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec4Title}</h2>
            <p className="text-gray-600">{current.sec4Text}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec5Title}</h2>
            <p className="text-gray-600">{current.sec5Text}</p>
          </section>

          {/* 🚀 Naya Order Cancellation Section Render Yahan Hoga */}
          <section>
            <h2 className="text-xl font-bold text-brand-900 mb-3">{current.sec6Title}</h2>
            <p className="text-gray-600 mb-2">{current.sec6Text}</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-1">
              <li>{current.sec6List1}</li>
              <li>{current.sec6List2}</li>
              <li>{current.sec6List3}</li>
            </ul>
          </section>

        </div>

        {/* Footer Prompt */}
        <div className="mt-12 pt-8 border-t border-gray-100 bg-brand-50 p-6 rounded-xl text-center">
          <p className="text-brand-900 font-bold mb-2">{current.footerHelp}</p>
          <p className="text-sm text-gray-600 mb-4">{current.footerSub}</p>
          <Link href="/contact-us" className="inline-block bg-brand-900 text-cream px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-800 transition-colors">
            {current.footerBtn}
          </Link>
        </div>

      </div>
    </div>
  );
}