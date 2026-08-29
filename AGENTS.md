<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

Ye ekdum sahi faisla hai! Jab hum itna bada aur complex system banate hain, toh aage chalkar rules bhool jana bahut aam baat है. Ek proper **System Architecture Document** hona har professional project ki pehchaan hai.

Aap is poore message ko copy karke apne paas kisi Word document ya Notepad me save kar lijiye. Ye aapka **"Master Guide"** hai.

---

# 👑 Rose Fashion Designer - System Logic & Role Guide

## 1. System Roles (Kaun kya ban sakta hai?)

Database (`User.ts` model) me humne 3 tarah ke roles define kiye hain:

* `user` (Normal Customer)
* `admin` (Aapka Staff ya Shop Manager)
* `superadmin` (Sirf Aap - The Owner/CEO)

---

## 2. User (Customer) Access & Logic

*Jo koi bhi website par naya account banata hai, wo default "user" banta hai.*

* **Shopping & Cart:** User dresses ko cart me add kar sakta hai. Cart data browser (LocalStorage) me save rehta hai taaki refresh karne par items gayab na hon.
* **Smart Checkout:** Order place karte waqt form me user ka saved address automatically fill ho jata hai (Auto-fill magic). Order success hote hi cart automatically khali (clear) ho jata hai.
* **My Account Dashboard:**
* User apni Profile aur Address update kar sakta hai.
* "My Orders" me apne saare orders aur unka live status dekh sakta hai.


* **Cancellation Logic (Rule):**
* User direct order cancel **nahi** kar sakta.
* User sirf **"Request Cancellation"** par click kar sakta hai.
* Ye button sirf tabhi dikhega jab order naya ho (`Order Placed`) ya ban raha ho (`Processing`). Shipped hone ke baad user cancel request nahi bhej sakta.



---

## 3. Admin (Shop Staff) Access & Logic

*Aap jisko database se `role: "admin"` denge, wo staff member hoga.*

* **Dashboard Access:** Admin `/admin` page open kar sakta hai jahan sabhi customers ke orders dikhte hain.
* **Analytics Visibility:** Admin ko Dashboard par Total Revenue, Pending Payment, Processing Orders aur Cancelled orders ka data dikhega.
* **Order Status Updates (The Forward-Only Pipeline):**
* Admin order ko aage badha sakta hai: `Order Placed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`.
* **Rule 1 (No Reverse):** Admin ek baar order ko `Shipped` kar de, toh wo dropdown se usko wapas `Processing` ya `Order Placed` nahi kar sakta (Purane options disable ho jate hain).
* **Rule 2 (Cancellation):** Agar customer ne Cancel Request bheji hai, toh Admin us order ko `Cancelled` mark kar sakta hai.


* **The Ultimate Security Lock 🔒:**
* Jaise hi Admin kisi order ko `Delivered` ya `Cancelled` mark karta hai, wo Dropdown hamesha ke liye **Lock (Disable)** ho jata hai.
* Admin ke screen par likha aata hai: *"🔒 Locked by System. Contact Super Admin."* Ab Admin is order me koi chhed-chhad nahi kar sakta.



---

## 4. Super Admin (Owner / CEO) Access & Logic

*Ye sirf aur sirf AAP hain (`role: "superadmin"`).*

* **Absolute Power (God Mode):** Aapke paas Admin wali saari powers hain, plus aap par koi restrictions ya locks laagu nahi hote.
* **Bypassing the Lock:** Jo orders `Delivered` ya `Cancelled` hone ke baad Admin ke liye lock ho gaye hain, **Super Admin ke liye wo hamesha khule (Unlocked) rehenge.** Aap unhe jab chahein change kar sakte hain.
* **Bypassing Forward-Only Rule:** Agar kisi staff member ne galti se naye order ko `Shipped` mark kar diya hai, toh Admin use wapas theek nahi kar sakta. Lekin aap (Super Admin) use wapas `Processing` ya `Order Placed` stage par bhej sakte hain.

---

## 5. Background Technical Magic (Smart Features)

* **Window Focus Auto-Refresh:** Agar aap ek tab me User bankar order dekh rahe hain, aur dusre tab me Admin bankar uska status change karte hain... toh jaise hi aap User wale tab par wapas aayenge, status bina page refresh kiye apne aap update ho jayega.
* **Smart Analytics Calculation:**
* **Net Revenue:** Sirf unhi orders ka paisa jodta hai jo successfully `Delivered` ho chuke hain.
* **Pending Payment:** Un orders ka paisa jodta hai jo abhi raste me hain ya ban rahe hain (`Order Placed`, `Processing`, `Shipped`).


* **Secure API Check:** Admin panel ka data aur status change karne ki permission API direct Database se check karti hai. Koi bhi normal user URL hack karke `/admin` type karke ghusne ki koshish karega toh use bahar phek diya jayega.

---

*(Is guide ko aap apne computer me save kar lijiye, ye future me kisi aur developer ko aapka system samjhane me bhi bahut kaam aayega!)*



Razor pay payment SETUP

Step:1.  write this in your .env.local file
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_SECRET_KEY=your_razorpay_secret_here

STEP:2. and install: npm install razorpay

step: 3. create: src/app/api/razorpay/route.ts

step:4. import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_SECRET_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    const options = {
      amount: Math.round(amount * 100), // Amount paise me convert hoga (e.g., ₹500 = 50000)
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
  }
}

STEP:5
src/app/checkout/page.tsx

Checkout Page par Script Load Karke Payment Trigger Karna
Apne checkout/payment page par Razorpay ka checkout script load karna padta hai. Tum apne src/app/checkout/page.tsx (ya jahan tumhara QR code / payment button hai) me ye function add kar sakte ho:

const handleRazorpayPayment = async (totalAmount: number) => {
  // 1. Load Razorpay Script Dynamically
  const res = await new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  if (!res) {
    alert('Razorpay SDK failed to load. Check your internet connection.');
    return;
  }

  // 2. Create Order from Backend API
  const data = await fetch('/api/razorpay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: totalAmount }),
  }).then((t) => t.json());

  if (!data.success) {
    alert('Server error. Please try again.');
    return;
  }

  // 3. Open Razorpay Checkout Modal
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: data.order.amount,
    currency: data.order.currency,
    name: 'Rose Fashion Designer',
    description: 'Purchase Custom Hand-worked Dress',
    order_id: data.order.id,
    handler: function (response: any) {
      alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
      // Yahan par aap order success database me save karne ka function call kar sakte hain
    },
    prefill: {
      name: 'Customer Name',
      email: 'customer@example.com',
      contact: '9999999999',
    },
    theme: {
      color: '#4A0E17', // Aapke brand ka wine/maroon color
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.open();
};









<!-- END:nextjs-agent-rules -->
