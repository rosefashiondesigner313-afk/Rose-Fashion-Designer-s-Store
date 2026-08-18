import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Please login to place an order' }, { status: 401 });
    }

    const body = await req.json();
    const { items, totalAmount, shippingAddress, paymentMethod } = body;

    await connectToDatabase();

    // User ka asli Database ID nikalna
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Ek unique Order ID generate karna (e.g., ROSE-847291)
    const uniqueOrderId = 'ROSE-' + Math.floor(100000 + Math.random() * 900000);

    // Database me naya order create karna
    const newOrder = await Order.create({
      orderId: uniqueOrderId,
      user: dbUser._id,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery',
      status: 'Order Placed',
    });

    return NextResponse.json({ success: true, orderId: newOrder.orderId }, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json({ message: 'Failed to create order' }, { status: 500 });
  }
}   