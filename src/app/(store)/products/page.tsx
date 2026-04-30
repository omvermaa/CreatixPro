import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";

export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string, subcategory?: string }> }) {
  const resolvedParams = await searchParams;
  await connectDB();
  
  let query: any = {};
  
  if (resolvedParams.category) {
    const categoryDoc = await Category.findOne({ slug: resolvedParams.category });
    if (categoryDoc) query.category = categoryDoc._id;
  }
  
  if (resolvedParams.subcategory) {
    const subcategoryDoc = await Subcategory.findOne({ slug: resolvedParams.subcategory });
    if (subcategoryDoc) query.subcategory = subcategoryDoc._id;
  }

  const products = await Product.find(query).populate('category').sort({ createdAt: -1 });

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-80 h-80 bg-[#B8941F]/5 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm text-[#B8941F] uppercase tracking-[0.3em] font-black">Our Catalog</span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-6 mb-8 uppercase tracking-tighter">Premium <span className="gradient-text italic">Collections</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">Explore our curated range of corporate gifts, hampers, and merchandise designed to impress.</p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📦</span>
              </div>
              <p className="text-gray-400 text-lg font-serif">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <Link href={`/products/${product._id.toString()}`} key={product._id.toString()}
                  className="group bg-white border border-gray-100 flex flex-col shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square relative overflow-hidden bg-gray-50 p-2">
                    <Image src={product.imageUrl || "/placeholder-image.jpg"} alt={product.name} fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-xs uppercase tracking-[0.2em] border-2 border-white px-6 py-2">View Portfolio</span>
                    </div>
                  </div>
                  <div className="p-8 border-t border-gray-50">
                    <span className="inline-block px-3 py-1 bg-[#B8941F]/10 text-[#8A6F10] text-[10px] uppercase tracking-[0.2em] font-black mb-4">
                      {product.category?.name || "Uncategorized"}
                    </span>
                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-[#B8941F] transition-colors duration-300 uppercase tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-serif">{product.description}</p>
                    <div className="flex justify-between items-center border-t border-gray-50 pt-6">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Min: {product.minOrderQty} units</p>
                      <ArrowRight size={14} className="text-[#B8941F]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
