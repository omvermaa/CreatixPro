import Link from "next/link";
import { Users, Layers, Truck, CheckCircle, Palette, Star, Package, ArrowRight } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import connectDB from "@/lib/db";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export default async function HomePage() {
  await connectDB();
  const rawCategories = await Category.find({}).lean();
  
  // Fetch an image for each category (prioritize cat.imageUrl, fallback to first product)
  const categoriesWithImages = await Promise.all(
    rawCategories.map(async (cat: any) => {
      let imageUrl = cat.imageUrl || null;

      if (!imageUrl) {
        const product = await Product.findOne({ category: cat._id }).select('imageUrl').lean();
        imageUrl = product?.imageUrl || null;
      }

      return {
        ...cat,
        _id: cat._id.toString(),
        imageUrl,
      };
    })
  );

  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <HeroSection />

      {/* ========== CATEGORIES SHOWCASE ========== */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8941F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm text-[#B8941F] uppercase tracking-[0.3em] font-black">Explore Catalog</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 uppercase tracking-tighter">
              Product <span className="gradient-text italic">Categories</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoriesWithImages.slice(0, 6).map((cat: any) => (
              <Link href={`/products/${cat.slug}`} key={cat._id} className="group relative block overflow-hidden bg-gray-50 border border-gray-100 aspect-[4/3] shadow-sm hover:shadow-2xl transition-all duration-500">
                {cat.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={cat.imageUrl} alt={cat.name} className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <Package size={48} className="text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tighter mb-2">{cat.name}</h3>
                  <div className="flex items-center gap-2 text-[#B8941F] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Explore Collection <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Happy Clients" },
            { value: "10K+", label: "Gifts Delivered" },
            { value: "50+", label: "Gift Categories" },
            { value: "5+", label: "Years Experience" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========== PROCESS SECTION ========== */}
      <section className="bg-[#FAFAFA] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-xs text-[#B8941F] uppercase tracking-[0.5em] font-bold">Methodology</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 uppercase tracking-tight font-serif">
              Our <span className="italic font-normal">Process</span>
            </h2>
            <div className="w-12 h-px bg-[#B8941F] mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {[
              { icon: Users, num: "01", title: "Requirement Discussion", desc: "We understand your brand, goals, and the occasion to craft the perfect gifting strategy." },
              { icon: Layers, num: "02", title: "Product Selection", desc: "Curating the perfect items from our premium catalog of 50+ curated gift categories." },
              { icon: Palette, num: "03", title: "Customization", desc: "Applying your brand identity seamlessly through engraving, printing, and packaging." },
              { icon: CheckCircle, num: "04", title: "Sample Review", desc: "Ensuring every detail meets your exact standards before bulk production." },
              { icon: Package, num: "05", title: "Production", desc: "Bulk manufacturing with rigid quality checks at every stage." },
              { icon: Truck, num: "06", title: "Delivery", desc: "On-time pan-India distribution with tracking and white-glove service." },
            ].map((step, i) => (
              <div key={i} className="relative bg-white p-12 group hover:bg-gray-50 active:bg-gray-50 transition-colors duration-500 flex flex-col justify-between min-h-[300px]">
                <div className="absolute top-8 right-8 text-8xl font-serif text-gray-50 group-hover:text-gray-100 group-active:text-gray-100 transition-colors duration-500 font-bold">
                  {step.num}
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 border border-[#B8941F]/30 flex items-center justify-center mb-10 group-hover:border-[#B8941F] group-active:border-[#B8941F] transition-colors duration-500">
                    <step.icon size={18} className="text-[#B8941F]" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-wider">{step.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-serif">{step.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8941F] group-hover:w-full group-active:w-full transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8941F]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs text-[#B8941F] uppercase tracking-[0.5em] font-bold">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 uppercase tracking-tight font-serif">
              What our <span className="italic font-normal">clients</span> say
            </h2>
            <div className="w-12 h-px bg-[#B8941F] mx-auto mt-6" />
          </div>
          
          <TestimonialsCarousel />
        </div>
      </section>
    </div>
  );
}
