import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

// Database se data lana (Fetch)
export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email }).select('-password');
    
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
  }
}

// Database me data save karna (Update)
export async function PUT(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { phone, address } = await req.json();
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { phone, address } },
      { new: true }
    ).select('-password');

    return NextResponse.json({ message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }
}