import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';
import Category from '@/lib/models/Category';

export async function GET() {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) throw new Error('DB not connected');
    const result = await db.collection('categories').updateOne(
      { name: "CORPORATE GIFTS" },
      { $set: { imageUrl: "/purplepalette.in/Corporate%20Gifts/main.jpeg" } }
    );
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
