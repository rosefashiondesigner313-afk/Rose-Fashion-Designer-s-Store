import { NextResponse } from 'next/server';
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