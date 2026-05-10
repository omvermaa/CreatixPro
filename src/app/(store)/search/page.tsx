import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/SearchBar";
import { Search, ShoppingBag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || "";

  await connectDB();

  let products: any[] = [];
  if (query.trim()) {
    products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }).lean();
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0A0A0A] py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8941F]/10 blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#B8941F]/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 uppercase tracking-tighter">
            Search List <span className="text-[#B8941F] font-serif italic">- ({query || "All"})</span>
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar 
              className="w-full shadow-2xl" 
              inputClassName="h-14 text-lg border-none" 
              buttonClassName="px-8" 
              placeholder="Search products by name or description..."
            />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B8941F] transition-colors mb-6 group uppercase tracking-widest font-bold">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Home / <span className="text-[#B8941F]">Search</span>
        </Link>
      </div>

      {/* Results Section */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#B8941F]/10 flex items-center justify-center">
                <Search size={20} className="text-[#B8941F]" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900">Search Results</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Found {products.length} matching items
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#B8941F] uppercase tracking-widest">{products.length} Items</span>
          </div>

          {products.length > 0 ? (
            <ProductGrid items={products} />
          ) : (
            <div className="bg-white border border-gray-100 p-16 text-center shadow-sm">
              <div className="w-20 h-20 bg-gray-50 mx-auto flex items-center justify-center rounded-full mb-6">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-wider">No results found</h3>
              <p className="text-gray-500 font-serif mb-8 max-w-md mx-auto">
                We couldn&apos;t find any products matching &quot;{query}&quot;. Try adjusting your search terms or browse our categories.
              </p>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
