import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    // 1. Database se connect karein
    await connectToDatabase();

    // 2. Check karein ki kya test user pehle se hai
    const existingUser = await User.findOne({ email: 'test@rosefashion.com' });

    if (!existingUser) {
      // 3. Agar nahi hai, toh ek naya dummy user create karein
      await User.create({
        name: 'Test Customer',
        email: 'test@rosefashion.com',
        password: 'dummy_password_123', // Asli app me hum ise encrypt karenge
        phone: '9967745932',
      });
      
      return NextResponse.json({ 
        success: true, 
        message: '🎉 Database connected successfully & Test User created!' 
      });
    }

    return NextResponse.json({ 
      success: true, 
      message: '✅ Database connected & Test User already exists.' 
    });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { success: false, error: 'Database connection failed!' }, 
      { status: 500 }
    );
  }
}