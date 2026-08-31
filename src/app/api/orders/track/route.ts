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

    // 🚀 Strict Security: Order ID AND Phone number dono match hone chahiye
    const order = await Order.findOne({ 
      orderId: orderId.trim(),
      'shippingAddress.phone': phone.trim()
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