"use server";

import connectDB from "@/lib/db";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  try {
    await connectDB();
    const name = formData.get("name") as string;
    
    if (!name) throw new Error("Name is required");

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await Category.create({ name, slug });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    await connectDB();
    await Category.findByIdAndDelete(id);
    // Also delete associated subcategories
    await Subcategory.deleteMany({ category: id });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createSubcategory(formData: FormData) {
  try {
    await connectDB();
    const name = formData.get("name") as string;
    const categoryId = formData.get("categoryId") as string;

    if (!name || !categoryId) throw new Error("Name and Category are required");

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await Subcategory.create({ name, slug, category: categoryId });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSubcategory(id: string) {
  try {
    await connectDB();
    await Subcategory.findByIdAndDelete(id);
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
