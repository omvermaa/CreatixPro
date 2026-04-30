import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import Category from "@/lib/models/Category";
import { ArrowLeft, ArrowRight, CheckCircle, Package } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  await connectDB();

  let product;
  try { product = await Product.findById(resolvedParams.id).populate('category'); } catch { product = null; }
  if (!product) { notFound(); }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#B8941F] transition-colors duration-300">
          <ArrowLeft size={14} /> Back to Products
        </Link>
      </div>

      <section className="py-12 pb-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="relative aspect-square bg-white border border-gray-100 overflow-hidden shadow-2xl">
              <Image src={product.imageUrl || "/placeholder-image.jpg"} alt={product.name} fill className="object-cover" />
            </div>

            <div className="lg:sticky lg:top-28">
              <span className="inline-block px-4 py-1.5 bg-[#B8941F]/10 text-[#8A6F10] text-xs uppercase tracking-[0.3em] font-black mb-6">
                {product.category?.name || "Uncategorized"}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 uppercase tracking-tighter leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-serif italic border-l-4 border-[#B8941F] pl-6 py-2">{product.description}</p>

              <div className="bg-white border border-gray-100 p-8 mb-8 shadow-xl">
                <h3 className="font-bold text-[10px] text-gray-300 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                  <Package size={14} className="text-[#B8941F]" /> Specifications
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-4 border-b border-gray-50 text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-gray-400">Min. Order Qty</span>
                    <span className="text-gray-900">{product.minOrderQty} units</span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-50 text-[10px] uppercase tracking-widest font-bold">
                    <span className="text-gray-400">Custom Branding</span>
                    <span className="text-gray-900">Premium Engraving Available</span>
                  </div>
                  {product.customizationOptions && product.customizationOptions.length > 0 && (
                    <div className="pt-6">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold block mb-4">Customization Portfolio</span>
                      <div className="flex flex-wrap gap-2">
                        {product.customizationOptions.map((opt: string, i: number) => (
                          <span key={i} className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-100 bg-gray-50 text-[10px] font-bold text-gray-700 uppercase tracking-widest">
                            <CheckCircle size={10} className="text-[#B8941F]" /> {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Link href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#0A0A0A] text-white font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 text-sm">
                Request Quote For This Item
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
