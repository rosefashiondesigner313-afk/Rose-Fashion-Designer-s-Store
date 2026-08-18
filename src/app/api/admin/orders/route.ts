import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

// 1. Saare orders fetch karna (Read)
export async function GET() {
  try {
    const session = await getServerSession();
    
    // Check agar user login hi nahi hai
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized Access' }, { status: 401 });
    }

    await connectToDatabase();

    // 🚨 MASTER FIX: Allow BOTH admin and superadmin
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) {
      return NextResponse.json({ message: 'Access Denied: You do not have permission' }, { status: 403 });
    }

    // Agar admin ya superadmin hai, toh orders bhej do
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

    // 🚨 MASTER FIX: Allow BOTH admin and superadmin to update
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) {
      return NextResponse.json({ message: 'Access Denied: You do not have permission' }, { status: 403 });
    }

    const { orderId, status } = await req.json();

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
  }
}