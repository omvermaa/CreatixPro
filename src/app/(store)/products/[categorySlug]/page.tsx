import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import connectDB from "@/lib/db";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";
import Product from "@/lib/models/Product";
import SubcategoryGrid from "@/components/SubcategoryGrid";

export const dynamic = 'force-dynamic';

export default async function CategoryPage({ params }: { params: Promise<{ categorySlug: string }> }) {
  const { categorySlug } = await params;
  
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
  if (!category) {
    notFound();
  }

  const subcategories = await Subcategory.find({ category: category._id }).lean();
  const products = await Product.find({ category: category._id }).lean();

  // For each subcategory, find a representative image from its products
  const subcategoryData = subcategories.map((sub: any) => {
    const subProducts = products.filter((p: any) => p.subcategory?.toString() === sub._id.toString());
    const representativeImage = subProducts.length > 0 ? subProducts[0].imageUrl : null;
    
    return {
      _id: sub._id.toString(),
      name: sub.name,
      slug: sub.slug,
      description: sub.description || '',
      productCount: subProducts.length,
      imageUrl: representativeImage,
    };
  }).filter((sub: any) => sub.productCount > 0);

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* Hero Section with Banner */}
      <section className="relative h-[180px] md:h-[220px] w-full flex items-center justify-center overflow-hidden">
        {bannerUrl ? (
          <Image 
            src={bannerUrl}
            alt={`${category.name} Banner`}
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
            <h1 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider">{category.name}</h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B8941F] transition-colors mb-6 group uppercase tracking-widest font-bold">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Home / Products / <span className="text-[#B8941F]">{category.name}</span>
        </Link>
      </div>

      {/* Subcategories Grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-gray-400">Browse Categories</h2>
            <span className="text-xs font-bold text-[#B8941F] uppercase tracking-widest">{subcategoryData.length} Categories Found</span>
          </div>

          <SubcategoryGrid 
            items={subcategoryData}
            categorySlug={categorySlug}
          />
        </div>
      </section>
    </div>
  );
}
