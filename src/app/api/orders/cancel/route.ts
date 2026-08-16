import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';

export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { orderId } = await req.json();
    await connectToDatabase();

    // Order ko update karo aur status change karo
    const updatedOrder = await Order.findOneAndUpdate(
      { orderId: orderId },
      { status: 'Cancellation Requested' },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Cancellation request sent to admin.' });
  } catch (error) {
    console.error('Cancel request error:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}