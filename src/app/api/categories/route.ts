import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import Subcategory from '@/lib/models/Subcategory';

export async function GET() {
  try {
    await connectDB();
    // Fetch categories
    const categories = await Category.find({}).lean();
    
    // Fetch subcategories
    const subcategories = await Subcategory.find({}).lean();
    
    // Map subcategories to their respective categories
    const categoriesWithSubcategories = categories.map((cat: any) => {
      return {
        ...cat,
        subcategories: subcategories.filter((sub: any) => sub.category.toString() === cat._id.toString())
      };
    });

    return NextResponse.json({ success: true, data: categoriesWithSubcategories }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
