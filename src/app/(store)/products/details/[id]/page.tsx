import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Subcategory from "@/lib/models/Subcategory";
import QuoteModal from "@/components/QuoteModal";
import { ArrowLeft, ArrowRight, CheckCircle, Package, Grid, Heart } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ image?: string }>
}) {
  const { id } = await params;
  const { image: queryImage } = await searchParams;
  await connectDB();

  let product;
  try { 
    product = await Product.findById(id)
      .populate('category')
      .populate('subcategory'); 
  } catch { 
    product = null; 
  }
  
  if (!product) { 
    notFound(); 
  }

  // Fetch "You may also like" - other random products in the same category
  const relatedProducts = await Product.find({
    category: product.category._id,
    _id: { $ne: product._id }
  })
    .limit(4)
    .lean();

  const mainImageUrl = queryImage || product.imageUrl || "/placeholder-image.jpg";

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link 
          href={product.subcategory ? `/products/${product.category.slug}/${product.subcategory.slug}` : `/products/${product.category.slug}`} 
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B8941F] transition-colors duration-300 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to {product.subcategory?.name || product.category?.name || 'Products'}
        </Link>
      </div>

      <section className="py-12 pb-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Main Product Image */}
            <div className="relative aspect-square bg-white border border-gray-100 overflow-hidden shadow-2xl group p-4">
              <Image 
                src={mainImageUrl} 
                alt={product.name} 
                fill 
                className="object-contain group-hover:scale-105 transition-transform duration-1000 p-8" 
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-[#0A0A0A] text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                  Premium Selection
                </span>
              </div>
            </div>

            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-6">
                <span className="inline-block px-4 py-1.5 bg-[#B8941F]/10 text-[#8A6F10] text-xs uppercase tracking-[0.3em] font-black">
                  {product.category?.name || "Uncategorized"}
                </span>
                {product.subcategory && (
                  <span className="text-gray-300 text-xs uppercase tracking-[0.3em] font-black">/ {product.subcategory.name}</span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tighter leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-serif italic border-l-4 border-[#B8941F] pl-6 py-2">{product.description}</p>

              <div className="bg-white border border-gray-100 p-8 mb-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8941F]/5 -translate-y-1/2 translate-x-1/2 blur-2xl" />
                <h3 className="font-bold text-xs text-gray-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2 relative z-10">
                  <Package size={14} className="text-[#B8941F]" /> Specifications
                </h3>
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center py-4 border-b border-gray-50 text-xs uppercase tracking-widest font-bold">
                    <span className="text-gray-400">Min. Order Qty</span>
                    <span className="text-gray-900">{product.minOrderQty} units</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-50 text-xs uppercase tracking-widest font-bold">
                    <span className="text-gray-400">Custom Branding</span>
                    <span className="text-gray-900">Premium Printing Available</span>
                  </div>
                  {product.customizationOptions && product.customizationOptions.length > 0 && (
                    <div className="pt-6">
                      <span className="text-xs text-gray-400 uppercase tracking-widest font-bold block mb-4">Branding Portfolio</span>
                      <div className="flex flex-wrap gap-2">
                        {product.customizationOptions.map((opt: string, i: number) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-100 bg-gray-50 text-xs font-bold text-gray-700 uppercase tracking-widest">
                            <CheckCircle size={12} className="text-[#B8941F]" /> {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <QuoteModal productName={product.name} />
            </div>
          </div>
        </div>
      </section>

      {/* View our product range (Gallery) */}
      {product.galleryImages && product.galleryImages.length > 0 && (
        <section className="py-32 bg-white px-6 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-gray-200" />
                <span className="text-xs text-[#B8941F] font-black uppercase tracking-[0.4em]">Portfolio</span>
                <div className="h-[1px] w-12 bg-gray-200" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tighter mb-8">View our <span className="gradient-text italic">product range</span></h2>
              <p className="text-gray-500 max-w-2xl mx-auto font-serif">Explore the various styles and customization options available for this selection.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {product.galleryImages.map((img: string, idx: number) => (
                <Link 
                  key={idx} 
                  href={`/products/details/${product._id.toString()}?image=${encodeURIComponent(img)}`}
                  className="group bg-white border border-gray-100 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-50">
                    <Image 
                      src={img} 
                      alt={`${product.name} Variant ${idx + 1}`} 
                      fill 
                      className="object-contain group-hover:scale-105 transition-transform duration-700 p-6" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] border-2 border-white px-6 py-2">View Variant</span>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-50 text-center">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-tight group-hover:text-[#B8941F] transition-colors line-clamp-1">
                      Variant {idx + 1}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* You may also like */}
      {relatedProducts.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <Heart size={16} className="text-[#B8941F]" />
                  <span className="text-xs text-[#B8941F] font-black uppercase tracking-[0.4em]">Recommendations</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase tracking-tighter">You may <span className="gradient-text italic">also like</span></h2>
              </div>
              <Link href={`/products/${product.category.slug}`} className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-[#B8941F] transition-colors border-b-2 border-gray-100 pb-1 flex items-center gap-2">
                View Entire Collection <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((rel: any) => (
                <Link href={`/products/details/${rel._id.toString()}`} key={rel._id.toString()}
                  className="group bg-white border border-gray-100 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
                  <div className="aspect-[4/5] relative overflow-hidden bg-gray-50">
                    <Image 
                      src={rel.imageUrl} 
                      alt={rel.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] border-2 border-white px-6 py-2">View Details</span>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-50">
                    <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight group-hover:text-[#B8941F] transition-colors line-clamp-1">
                      {rel.name}
                    </h3>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Min: {rel.minOrderQty} units</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
