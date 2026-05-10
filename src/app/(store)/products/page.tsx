import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  await connectDB();
  
  const categories = await Category.find({}).lean();
  const products = await Product.find({}).lean();
  const subcategories = await Subcategory.find({}).lean();

  // Build category data with product counts and representative images
  const categoryData = categories.map((cat: any) => {
    const catProducts = products.filter((p: any) => p.category.toString() === cat._id.toString());
    const catSubcategories = subcategories.filter((s: any) => s.category.toString() === cat._id.toString());
    const representativeImage = catProducts.length > 0 ? catProducts[0].imageUrl : null;
    
    return {
      _id: cat._id.toString(),
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      productCount: catProducts.length,
      subcategoryCount: catSubcategories.length,
      imageUrl: representativeImage,
    };
  }).filter((cat: any) => cat.productCount > 0);

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
          {categoryData.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100">
              <div className="w-20 h-20 bg-gray-50 flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📦</span>
              </div>
              <p className="text-gray-400 text-lg font-serif">No products available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.map((category: any) => (
                <Link href={`/products/${category.slug}`} key={category._id}
                  className="group bg-white border border-gray-100 flex flex-col shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                    {category.imageUrl ? (
                      <Image src={decodeURIComponent(category.imageUrl)} alt={category.name} fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                        <span className="text-5xl">📦</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <span className="text-white font-bold text-xs uppercase tracking-[0.2em] border-2 border-white px-6 py-2 inline-block">
                        Explore Collection
                      </span>
                    </div>
                  </div>
                  <div className="p-8 border-t border-gray-50 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#B8941F] transition-colors duration-300 uppercase tracking-tight">
                      {category.name}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-serif flex-1">{category.description}</p>
                    <div className="flex justify-between items-center border-t border-gray-50 pt-6">
                      <div className="flex gap-4">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{category.productCount} Products</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{category.subcategoryCount} Types</p>
                      </div>
                      <ArrowRight size={14} className="text-[#B8941F] group-hover:translate-x-1 transition-transform" />
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
