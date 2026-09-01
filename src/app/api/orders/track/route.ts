import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('orderId');
    const phone = searchParams.get('phone');

    if (!orderId || !phone) {
      return NextResponse.json({ 
        success: false, 
        message: 'Order ID and Phone Number are both required to track.' 
      }, { status: 400 });
    }

    await connectToDatabase();

    const cleanPhone = phone.trim().replace(/^\+91/, '');

    // Flexible query jo +91 ke sath ya bina dono ko match karegi
    const order = await Order.findOne({ 
      orderId: orderId.trim(),
      $or: [
        { 'shippingAddress.phone': cleanPhone },
        { 'shippingAddress.phone': `+91${cleanPhone}` },
        { 'shippingAddress.phone': `+91 ${cleanPhone}` }
      ]
    });

    if (!order) {
      return NextResponse.json({ 
        success: false, 
        message: 'No order found matching this Order ID and Phone Number.' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error('Track order error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}