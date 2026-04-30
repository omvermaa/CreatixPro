import Link from "next/link";
import { Users, Layers, Truck, CheckCircle, Palette, Star, Package } from "lucide-react";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ========== HERO SECTION ========== */}
      <HeroSection />

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
      <section className="bg-[#FAFAFA] py-24 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm text-[#B8941F] uppercase tracking-[0.3em] font-black">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 uppercase tracking-tighter">
              Our <span className="gradient-text italic">Process</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, num: "01", title: "Requirement Discussion", desc: "We understand your brand, goals, and the occasion to craft the perfect gifting strategy." },
              { icon: Layers, num: "02", title: "Product Selection", desc: "Curating the perfect items from our premium catalog of 50+ curated gift categories." },
              { icon: Palette, num: "03", title: "Customization", desc: "Applying your brand identity seamlessly through engraving, printing, and packaging." },
              { icon: CheckCircle, num: "04", title: "Sample Review", desc: "Ensuring every detail meets your exact standards before bulk production." },
              { icon: Package, num: "05", title: "Production", desc: "Bulk manufacturing with rigid quality checks at every stage." },
              { icon: Truck, num: "06", title: "Delivery", desc: "On-time pan-India distribution with tracking and white-glove service." },
            ].map((step, i) => (
              <div key={i} className="glass-card border-none bg-white p-10 group shadow-lg">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-14 h-14 bg-[#B8941F]/10 flex items-center justify-center group-hover:bg-[#B8941F]/20 transition-colors duration-300">
                    <step.icon size={24} className="text-[#B8941F]" />
                  </div>
                  <span className="text-6xl font-black text-gray-100 group-hover:text-[#B8941F]/30 transition-colors duration-300 tracking-tighter">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tight">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-serif">{step.desc}</p>
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
            <span className="text-sm text-[#B8941F] uppercase tracking-widest font-medium">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              What our <span className="gradient-text">clients</span> say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {[
              { quote: "Creatix Pro completely transformed our employee welcome kits. The quality and the elegant branding were superb. Highly recommended for any serious organization.", name: "Priya Sharma", role: "HR Director, Tech Innovations Ltd." },
              { quote: "We needed high-end custom gifts for an executive summit on very short notice. Creatix Pro delivered beyond our expectations with incredible attention to detail.", name: "Rajesh Mehta", role: "Events Manager, Global Finance Group" },
            ].map((t, i) => (
              <div key={i} className="bg-white p-12 border border-gray-100 relative shadow-xl">
                <Star size={40} className="text-[#B8941F]/10 absolute top-8 right-8" />
                <p className="text-gray-700 leading-relaxed mb-10 text-xl font-serif italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
                  <div className="w-12 h-12 bg-[#B8941F]/10 flex items-center justify-center font-bold text-[#B8941F]">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 uppercase tracking-wider text-sm">{t.name}</p>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
