import connectDB from "@/lib/db";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";
import { createCategory, deleteCategory, createSubcategory, deleteSubcategory } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
  await connectDB();
  const categories = await Category.find({}).sort({ createdAt: -1 });
  const subcategories = await Subcategory.find({}).sort({ createdAt: -1 }).populate('category');

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Categories Column */}
      <div className="bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-6">Manage Categories</h2>
        
        <form action={async (formData) => {
          "use server";
          await createCategory(formData);
        }} className="mb-6 flex gap-2">
          <Input name="name" placeholder="New Category Name" required className="flex-1" />
          <Button type="submit" className="bg-primary text-white hover:bg-primary/90">Add</Button>
        </form>

        <div className="space-y-3">
          {categories.map((cat: any) => (
            <div key={cat._id.toString()} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-sm">
              <span className="font-medium text-gray-800">{cat.name}</span>
              <form action={async () => {
                "use server";
                await deleteCategory(cat._id.toString());
              }}>
                <Button type="submit" variant="destructive" size="sm">Delete</Button>
              </form>
            </div>
          ))}
          {categories.length === 0 && <p className="text-gray-500 text-sm">No categories found.</p>}
        </div>
      </div>

      {/* Subcategories Column */}
      <div className="bg-white p-6 border border-gray-200">
        <h2 className="text-xl font-bold mb-6">Manage Subcategories</h2>
        
        <form action={async (formData) => {
          "use server";
          await createSubcategory(formData);
        }} className="mb-6 flex flex-col gap-3">
          <select name="categoryId" required className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm">
            <option value="">Select Parent Category</option>
            {categories.map((cat: any) => (
              <option key={cat._id.toString()} value={cat._id.toString()}>{cat.name}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <Input name="name" placeholder="New Subcategory Name" required className="flex-1" />
            <Button type="submit" className="bg-primary text-white hover:bg-primary/90">Add</Button>
          </div>
        </form>

        <div className="space-y-3">
          {subcategories.map((sub: any) => (
            <div key={sub._id.toString()} className="flex flex-col p-3 bg-gray-50 border border-gray-100 rounded-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-gray-800">{sub.name}</span>
                <form action={async () => {
                  "use server";
                  await deleteSubcategory(sub._id.toString());
                }}>
                  <Button type="submit" variant="destructive" size="sm">Delete</Button>
                </form>
              </div>
              <span className="text-xs text-gray-500">Parent: {sub.category?.name || 'Unknown'}</span>
            </div>
          ))}
          {subcategories.length === 0 && <p className="text-gray-500 text-sm">No subcategories found.</p>}
        </div>
      </div>
    </div>
  );
}
