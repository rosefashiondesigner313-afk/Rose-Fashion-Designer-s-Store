import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // Ensure connectDB import path matches your project
import User from '@/models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'No account found with this email' }, { status: 404 });
    }

    // 1. Generate Secure Random Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // 2. Hash token for extra DB security (Optional, or store directly)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = new Date(Date.now() + 15 * 60 * 1000); // 15 Min Valid
    await user.save();

    // 3. Reset URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    // 4. Send Email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Rose Fashion Designer" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Link - Rose Fashion Designer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #4a0e17; text-align: center;">Rose Fashion Designer</h2>
          <p>Hello <b>${user.name}</b>,</p>
          <p>Aapne apna password reset karne ke liye request kiya tha. Niche diye gaye button par click karke naya password set karein:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #4a0e17; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
          </div>
          <p style="font-size: 12px; color: #777;">Yeh link 15 minutes tak valid hai. Agar aapne yeh request nahi ki thi, toh is email ko ignore karein.</p>
        </div>
      `,
    });

    return NextResponse.json({ message: 'Password reset link sent to your email.' });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Server error' }, { status: 500 });
  }
}