import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

// 1. Saari Dresses fetch karna (Admin panel me list dikhane ke liye)
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 }); // Nayi dress sabse upar
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

// 2. Nayi Dress Add karna
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    // Security: Check agar user admin ya superadmin hai
    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) {
      return NextResponse.json({ message: 'Access Denied' }, { status: 403 });
    }

    // Data frontend se aayega
    const body = await req.json();
    
    // Naya product database me save karo
    const newProduct = await Product.create(body);

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}

// 3. Dress ko Update (Edit) karna
export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) return NextResponse.json({ message: 'Access Denied' }, { status: 403 });

    const body = await req.json();
    const { _id, ...updateData } = body; // _id alag karo, baaki data update ke liye
    
    await connectToDatabase();
    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    
    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}

// 4. Dress ko Delete karna
export async function DELETE(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) return NextResponse.json({ message: 'Access Denied' }, { status: 403 });

    // URL se ID nikalna (eg: /api/admin/products?id=123)
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}