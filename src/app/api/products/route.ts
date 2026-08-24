import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

// Ye public API hai, isko koi bhi bina login ke access kar sakta hai (Shop page ke liye)
export async function GET() {
  try {
    await connectToDatabase();
    // Saari dresses nikalenge, nayi dresses sabse pehle dikhengi
    const products = await Product.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}