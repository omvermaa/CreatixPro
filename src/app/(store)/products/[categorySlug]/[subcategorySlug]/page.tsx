import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import connectDB from "@/lib/db";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";
import Product from "@/lib/models/Product";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = 'force-dynamic';

export default async function SubcategoryPage({ 
  params 
}: { 
  params: Promise<{ categorySlug: string, subcategorySlug: string }> 
}) {
  const { categorySlug, subcategorySlug } = await params;
  
  const slugToFolder: Record<string, string> = {
    'corporate-gifts': 'Corporate Gifts',
    'hoodies': 'Hoodies',
    'printing-services': 'Printing Services',
    'rainwear': 'Rainwear',
    'sweatshirt': 'Sweatshirts',
    't-shirts': 'T-Shirts',
    'uniforms': 'Uniforms',
  };
  const bannerUrl = slugToFolder[categorySlug] ? `/purplepalette.in/${encodeURIComponent(slugToFolder[categorySlug])}/banner.jpg` : null;
  await connectDB();

  const category = await Category.findOne({ slug: categorySlug }).lean();
  const subcategory = await Subcategory.findOne({ slug: subcategorySlug, category: category?._id }).lean();
  
  if (!category || !subcategory) {
    notFound();
  }

  const products = await Product.find({ subcategory: subcategory._id }).lean();

  if (products && products.length > 0) {
    redirect(`/products/details/${products[0]._id.toString()}`);
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section with Banner */}
      <section className="relative h-[180px] md:h-[220px] w-full flex items-center justify-center overflow-hidden">
        {bannerUrl ? (
          <Image 
            src={bannerUrl}
            alt={`${subcategory.name} Banner`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center justify-center">
          <div className="bg-black/70 px-8 py-4 backdrop-blur-sm">
            <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">{subcategory.name}</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href={`/products/${categorySlug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B8941F] transition-colors mb-6 group uppercase tracking-widest font-bold">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Home / Products / {category.name} / <span className="text-[#B8941F]">{subcategory.name}</span>
        </Link>
      </div>

      {/* Products Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#B8941F]/10 flex items-center justify-center">
                <ShoppingBag size={20} className="text-[#B8941F]" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-900">Available Products</h2>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Ready for custom branding</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#B8941F] uppercase tracking-widest">{products.length} Items</span>
          </div>

          <ProductGrid 
            items={products}
          />
        </div>
      </section>
    </div>
  );
}
