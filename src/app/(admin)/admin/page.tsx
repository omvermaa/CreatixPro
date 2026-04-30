import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();
  const productCount = await Product.countDocuments();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-sm shadow-sm border border-gray-200 decoration-primary border-l-4">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{productCount}</p>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/admin/products/new">
          <Button className="bg-primary text-white hover:bg-primary/90">
            + Quick Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
}
