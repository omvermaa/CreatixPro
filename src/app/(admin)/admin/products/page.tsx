import Link from "next/link";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { Button } from "@/components/ui/button";
import ProductActions from "./ProductActions";
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  await connectDB();
  const products = await Product.find({}).populate('category').sort({ createdAt: -1 });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <Link href="/admin/products/new">
          <Button className="bg-[#0A0A0A] text-white hover:bg-[#0A0A0A]/90">+ Add Product</Button>
        </Link>
      </div>

      <div className="bg-white border text-left border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm text-gray-600">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold text-left">Product</th>
              <th className="px-6 py-4 font-semibold text-left">Category</th>
              <th className="px-6 py-4 font-semibold text-left">Min. Qty</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No products found.</td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product._id.toString()} className="border-b border-gray-100 opacity-90 hover:opacity-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                  <td className="px-6 py-4">{product.category?.name || "Uncategorized"}</td>
                  <td className="px-6 py-4">{product.minOrderQty}</td>
                  <td className="px-6 py-4 text-right">
                    <ProductActions id={product._id.toString()} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
