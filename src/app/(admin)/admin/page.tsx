import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import Message from "@/lib/models/Message";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, FolderTree, MessageSquare, Plus, ArrowRight, Clock } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectDB();
  
  const [productCount, categoryCount, messageCount, recentProducts, recentMessages] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Message.countDocuments(),
    Product.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    Message.find({}).sort({ createdAt: -1 }).limit(5).lean()
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800 font-serif tracking-wide">Dashboard Overview</h1>
        <Link href="/admin/products/new">
          <Button className="bg-[#B8941F] text-white hover:bg-[#9A7B15] shadow-md flex items-center gap-2">
            <Plus size={16} /> Quick Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <Package size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Products</h3>
            <p className="text-3xl font-bold text-gray-900">{productCount}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 shrink-0">
            <FolderTree size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Categories</h3>
            <p className="text-3xl font-bold text-gray-900">{categoryCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 flex items-center gap-4 transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0">
            <MessageSquare size={24} />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Inquiries</h3>
            <p className="text-3xl font-bold text-gray-900">{messageCount}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Messages */}
        <div className="bg-white border border-gray-100 rounded-md shadow-sm flex flex-col">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Clock size={18} className="text-gray-400" /> Recent Inquiries</h2>
            <Link href="/admin/messages" className="text-sm text-[#B8941F] hover:underline font-medium flex items-center gap-1">View All <ArrowRight size={14} /></Link>
          </div>
          <div className="p-0 flex-1">
            {recentMessages.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No recent inquiries found.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {recentMessages.map((msg: any) => (
                  <li key={msg._id.toString()} className="p-5 hover:bg-gray-50 transition">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-semibold text-gray-900">{msg.name}</span>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-[#B8941F] mb-2">{msg.email}</p>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{msg.requirement}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="bg-white border border-gray-100 rounded-md shadow-sm flex flex-col">
          <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><Package size={18} className="text-gray-400" /> Recently Added Products</h2>
            <Link href="/admin/products" className="text-sm text-[#B8941F] hover:underline font-medium flex items-center gap-1">Manage All <ArrowRight size={14} /></Link>
          </div>
          <div className="p-0 flex-1">
            {recentProducts.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm">No products found.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {recentProducts.map((prod: any) => (
                  <li key={prod._id.toString()} className="p-5 hover:bg-gray-50 transition flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">{prod.name}</p>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Min Qty: {prod.minOrderQty || 'N/A'}</p>
                    </div>
                    <Link href={`/admin/products/${prod._id.toString()}/edit`}>
                      <Button variant="outline" size="sm" className="text-xs text-gray-600">Edit</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
