import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import { sendEmail } from '@/lib/mailer';

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

    // 🚀 Agar status 'Delivered' kiya gaya hai, toh User collection se email dhundh kar bhejo
    if (status.toLowerCase() === 'delivered') {
      try {
        let customerEmail = updatedOrder.shippingAddress?.email;

        // Agar order me email nahi hai, toh User collection se phone number match karke email nikal lo
        if (!customerEmail && updatedOrder.shippingAddress?.phone) {
          const cleanPhone = updatedOrder.shippingAddress.phone.trim().replace(/^\+91/, '');
          const matchedUser = await User.findOne({ 
            $or: [
              { phone: cleanPhone },
              { phone: `+91${cleanPhone}` },
              { phone: `+91 ${cleanPhone}` }
            ]
          });
          if (matchedUser) {
            customerEmail = matchedUser.email;
          }
        }

        if (customerEmail) {
          await sendEmail({
            to: customerEmail,
            subject: `Your Order ${updatedOrder.orderId} has been Delivered! 🎉`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px; background-color: #fff;">
                <h2 style="color: #4a0e17; text-align: center;">Rose Fashion Designer</h2>
                <p>Hello <b>${updatedOrder.shippingAddress?.fullName || 'Valued Customer'}</b>,</p>
                <p>Great news! Your order ID <b>${updatedOrder.orderId}</b> has been successfully delivered to your doorstep.</p>
                <p>We hope you love your custom hand-worked dress. Thank you for shopping with us!</p>
                <br/>
                <p>Warm regards,</p>
                <p><b>Team Rose Fashion</b></p>
              </div>
            `,
          });
          console.log(`✅ Delivery email successfully sent to: ${customerEmail}`);
        } else {
          console.log(`⚠️ Email not found for order ${updatedOrder.orderId}, skipping email.`);
        }
      } catch (emailError) {
        console.error("❌ Failed to send delivery email:", emailError);
      }
    }

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Admin Update Error:", error);
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
  }
}