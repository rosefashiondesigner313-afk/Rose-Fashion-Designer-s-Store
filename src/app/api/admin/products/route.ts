import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

// 🚀 Helper Function: Naam se URL-friendly slug banane ke liye
const generateSlug = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// 1. Saari Dresses fetch karna
export async function GET() {
  try {
    await connectToDatabase();
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

// 2. Nayi Dress Add karna (Slug auto-generate hoga)
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) {
      return NextResponse.json({ message: 'Access Denied' }, { status: 403 });
    }

    const body = await req.json();
    
    // Agar slug nahi diya hai ya khali hai, toh name se generate kar lo
    const productData = {
      ...body,
      slug: body.slug ? generateSlug(body.slug) : generateSlug(body.name)
    };

    const newProduct = await Product.create(productData);

    return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}

// 3. Dress ko Update (Edit) karna (Purane product ka bhi slug auto-update hoga)
export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const dbUser = await User.findOne({ email: session.user.email });
    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superadmin')) return NextResponse.json({ message: 'Access Denied' }, { status: 403 });

    const body = await req.json();
    const { _id, ...bodyData } = body; 
    
    // Agar naam update ho raha hai ya slug missing hai, toh naya slug bana lo
    const updateData = {
      ...bodyData,
      slug: bodyData.slug ? generateSlug(bodyData.slug) : generateSlug(bodyData.name)
    };

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

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    await connectToDatabase();
    await Product.findByIdAndDelete(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}