import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/lib/models/Message';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    console.log('Received contact form:', body);
    
    const newMessage = await Message.create(body);

    return NextResponse.json({ success: true, message: 'Message sent successfully', data: newMessage }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
