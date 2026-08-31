import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

// 1. Saare orders fetch karna (Read)
export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized Access' }, { status: 401 });
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) {
      return NextResponse.json({ message: 'Access Denied: You do not have permission' }, { status: 403 });
    }

    const orders = await Order.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Admin Fetch Error:", error);
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}

// 2. Order ka status update karna (Update)
export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) {
      return NextResponse.json({ message: 'Access Denied: You do not have permission' }, { status: 403 });
    }

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ success: false, message: 'Order ID and Status are required' }, { status: 400 });
    }

    // 🚀 MASTER FIX: Flexible query jo orderId ya _id dono se match kar legi
    const updatedOrder = await Order.findOneAndUpdate(
      { 
        $or: [
          { orderId: orderId }, 
          { _id: orderId.match(/^[0-9a-fA-F]{24}$/) ? orderId : null }
        ] 
      },
      { $set: { status: status } },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: 'Order not found in database' }, { status: 404 });
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Admin Update Error:", error);
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
  }
}