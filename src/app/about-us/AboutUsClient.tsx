'use client'; 

import { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Jab apni local images use karein, toh isko uncomment kar lijiyega

export default function AboutUsPage() {
  const [lang, setLang] = useState<'EN' | 'HI'>('EN');

  const content = {
    EN: {
      title: "About Rose Fashion Designer",
      subtitle: "Crafting Elegance, Stitch by Stitch",
      
      // 👩‍🎨 Owner Profile Data (English)
      ownerTitle: "Meet Our Founder",
      ownerName: "Jane Doe (Edit Name Here)", // Yahan Owner ka asli naam likhein
      ownerRole: "Lead Fashion Designer & Founder",
      ownerExp: "With over 10 years of rich experience in the fashion and garment industry, our founder has mastered the art of creating bespoke, hand-worked masterpieces. Starting from a small boutique, her vision and dedication to premium craftsmanship have shaped Rose Fashion Designer into a trusted name for elegant, custom-fit dresses. Every design reflects a deep understanding of fabrics, patterns, and client desires.",
      
      sec1Title: "Our Story",
      sec1Text: "Welcome to Rose Fashion Designer, where passion meets craftsmanship. We started with a simple vision: to create premium, custom-made dresses that make every individual feel extraordinary. Our journey is driven by a deep love for fine fabrics, intricate designs, and the art of tailoring.",
      sec2Title: "Our Craftsmanship",
      sec2Text: "What sets us apart is our dedication to hand-worked detailing. We don't just make clothes; we craft art. Every dress that leaves our studio is meticulously handcrafted by skilled artisans who pay attention to the smallest details, ensuring that you receive a masterpiece that is uniquely yours.",
      sec3Title: "Why Choose Us?",
      sec3List1: "Premium Quality: We use only the finest fabrics and materials.",
      sec3List2: "Custom Fit: Tailored specifically to your measurements for a flawless look.",
      sec3List3: "Exclusive Designs: Unique patterns and hand-worked embellishments you won't find anywhere else.",
      sec4Title: "Our Vision",
      sec4Text: "To redefine bespoke fashion by blending traditional artistry with modern elegance, delivering a luxurious experience to every customer who wears a Rose Fashion Designer creation.",
      footerHelp: "Want to customize your dream dress?",
      footerSub: "Get in touch with our design team today.",
      footerBtn: "Contact Us"
    },
    HI: {
      title: "रोज़ फैशन डिज़ाइनर के बारे में",
      subtitle: "हर टांके में सुंदरता और कला",
      
      // 👩‍🎨 Owner Profile Data (Hindi)
      ownerTitle: "हमारे संस्थापक से मिलें",
      ownerName: "जेन डो (यहाँ नाम बदलें)", // Yahan Owner ka asli naam likhein
      ownerRole: "लीड फैशन डिज़ाइनर और संस्थापक",
      ownerExp: "फैशन और परिधान उद्योग (garment industry) में 10 से अधिक वर्षों के समृद्ध अनुभव के साथ, हमारे संस्थापक ने हाथ से बने बेहतरीन कपड़ों की कला में महारत हासिल की है। एक छोटे से बुटीक से शुरुआत करके, उनके विज़न और प्रीमियम कारीगरी के प्रति समर्पण ने रोज़ फैशन डिज़ाइनर को कस्टम-फिट ड्रेसेस के लिए एक भरोसेमंद नाम बना दिया है। हर डिज़ाइन में फैब्रिक, पैटर्न और ग्राहकों की पसंद की गहरी समझ झलकती है।",
      
      sec1Title: "हमारी कहानी",
      sec1Text: "रोज़ फैशन डिज़ाइनर में आपका स्वागत है, जहाँ जुनून और कारीगरी का मिलन होता है। हमने एक सरल दृष्टिकोण के साथ शुरुआत की थी: प्रीमियम, कस्टम-मेड ड्रेसेस बनाना जो हर किसी को खास महसूस कराएं। हमारा यह सफर बेहतरीन कपड़ों, जटिल डिज़ाइनों और सिलाई की कला के प्रति हमारे गहरे प्यार से प्रेरित है।",
      sec2Title: "हमारी कारीगरी",
      sec2Text: "जो बात हमें सबसे अलग बनाती है, वह है हाथ के काम (Hand-work) के प्रति हमारा समर्पण। हम सिर्फ कपड़े नहीं बनाते; हम कला उकेरते हैं। हमारे स्टूडियो से निकलने वाली हर ड्रेस कुशल कारीगरों द्वारा बहुत बारीकी से तैयार की जाती है, ताकि आपको एक ऐसा मास्टरपीस मिले जो सिर्फ और सिर्फ आपके लिए बना हो।",
      sec3Title: "हमें क्यों चुनें?",
      sec3List1: "प्रीमियम क्वालिटी: हम केवल बेहतरीन फैब्रिक और सामग्री का उपयोग करते हैं।",
      sec3List2: "कस्टम फिट: आपके नाप के अनुसार विशेष रूप से तैयार किया गया शानदार लुक।",
      sec3List3: "एक्सक्लूसिव डिज़ाइन: अद्वितीय पैटर्न और हाथ का काम जो आपको कहीं और नहीं मिलेगा।",
      sec4Title: "हमारा विज़न",
      sec4Text: "पारंपरिक कला को आधुनिक लालित्य (Modern elegance) के साथ मिलाकर फैशन को फिर से परिभाषित करना, और रोज़ फैशन डिज़ाइनर पहनने वाले हर ग्राहक को एक लक्ज़री अनुभव प्रदान करना।",
      footerHelp: "क्या आप अपनी सपनों की ड्रेस कस्टमाइज़ करना चाहते हैं?",
      footerSub: "आज ही हमारी डिज़ाइन टीम से संपर्क करें।",
      footerBtn: "हमसे संपर्क करें"
    }
  };

  const current = content[lang];

  return (
    <div className="bg-cream min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100 relative">
        
        {/* 🚀 LANGUAGE TOGGLE BUTTON */}
        <div className="absolute top-6 right-6 md:top-10 md:right-10 flex items-center bg-gray-50 rounded-full p-1 border border-gray-200 z-10">
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
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-900 mb-4 pr-0 md:pr-32">
            {current.title}
          </h1>
          <p className="text-gray-500 font-sans text-lg italic">
            {current.subtitle}
          </p>
        </div>

        {/* 📸 SHOP IMAGES GALLERY (Top Section) */}
        {/* NOTE: Yahan dummy images hain. Jab aapke paas real images aa jayein, 
            toh apni images ko 'public' folder me daal kar src="/shop1.jpg" kar dijiyega */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80" 
              alt="Boutique Display" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80" 
              alt="Handwork Process" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-sm group">
            <img 
              src="https://images.unsplash.com/photo-1573612664822-c5ee5f458bc0?w=600&q=80" 
              alt="Premium Fabric" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div> */}

        {/* 👩‍🎨 OWNER PROFILE SECTION */}
        {/* Is section me Owner ki detail aur photo hai */}
        {/* <div className="bg-brand-50 p-6 md:p-8 rounded-2xl border border-brand-100 mb-16 flex flex-col md:flex-row gap-8 items-center md:items-start"> */}
           
           {/* Owner ki Photo */}
           {/* <div className="relative w-40 h-40 md:w-48 md:h-48 flex-shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" 
                alt="Owner Profile" 
                className="w-full h-full object-cover"
              />
           </div> */}
           
           {/* Owner ki Details (Text) */}
           {/* <div className="text-center md:text-left">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">{current.ownerTitle}</h2>
              <h3 className="font-serif text-3xl font-bold text-brand-900 mb-1">{current.ownerName}</h3>
              <p className="text-brand-700 font-semibold text-lg mb-4">{current.ownerRole}</p>
              <p className="text-gray-600 leading-relaxed font-sans">{current.ownerExp}</p>
           </div>
        </div> */}

        {/* Content (Story & Vision) */}
        <div className="space-y-10 font-sans text-charcoal leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">{current.sec1Title}</h2>
            <p className="text-gray-600">{current.sec1Text}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">{current.sec2Title}</h2>
            <p className="text-gray-600">{current.sec2Text}</p>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-brand-900 mb-4">{current.sec3Title}</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>{current.sec3List1}</li>
              <li>{current.sec3List2}</li>
              <li>{current.sec3List3}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-brand-900 mb-4">{current.sec4Title}</h2>
            <p className="text-gray-600">{current.sec4Text}</p>
          </section>

        </div>

        {/* Footer Prompt */}
        <div className="mt-16 pt-8 border-t border-gray-100 bg-brand-50 p-6 rounded-xl text-center">
          <p className="text-brand-900 font-bold mb-2">{current.footerHelp}</p>
          <p className="text-sm text-gray-600 mb-6">{current.footerSub}</p>
          <Link href="/contact-us" className="inline-block bg-brand-900 text-cream px-8 py-3 rounded-full text-sm font-bold hover:bg-brand-800 transition-colors">
            {current.footerBtn}
          </Link>
        </div>

      </div>
    </div>
  );
}