"use client";

import { Target, Eye, Heart, Award, Users, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const images = [
    "/images/about-gift.png",
    "/images/about-gift-2.png",
    "/images/about-gift-3.png"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative py-32 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#B8941F]/5 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm text-[#B8941F] uppercase tracking-[0.3em] font-black">About Us</span>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-6 mb-10 leading-tight uppercase tracking-tighter">
                We create <span className="gradient-text italic">meaningful</span> connections
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8 font-serif">
                Welcome to Creatix Pro, your premier partner for premium corporate gifting solutions. Based in Delhi NCR, we specialize in curating high-quality, bespoke gift hampers, office essentials, and luxury merchandise.
              </p>
              <p className="text-gray-500 leading-relaxed font-serif">
                Our mission is simple: to transform everyday business transactions into meaningful relationships through the art of thoughtful gifting. We believe a well-crafted gift is more than just an item — it&apos;s an experience.
              </p>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 font-serif">
                  <span className="font-sans uppercase font-bold text-xs text-[#B8941F] tracking-wider">GSTIN:</span> 09KYOPK2103N1ZV
                </p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="w-80 h-80 bg-white border border-[#B8941F]/20 p-3 animate-float shadow-2xl relative z-10 overflow-hidden">
                <div className="w-full h-full relative overflow-hidden">
                  {images.map((img, index) => (
                    <img 
                      key={img}
                      src={img} 
                      alt={`Premium Corporate Gifting ${index + 1}`} 
                      className={`absolute inset-0 w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000 ease-in-out ${
                        index === currentImageIndex ? "opacity-100 translate-x-0 z-10" : "opacity-0 translate-x-8 scale-105 z-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#B8941F]/10 border border-[#B8941F]/30 animate-float-slow z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "Our Mission", desc: "To transform everyday business transactions into meaningful relationships through the art of thoughtful, premium gifting." },
              { icon: Eye, title: "Our Vision", desc: "To be India's most trusted corporate gifting partner, known for impeccable quality, innovation, and seamless experiences." },
              { icon: Heart, title: "Our Values", desc: "Quality without compromise. Creativity in every detail. Reliability you can count on. Relationships that last a lifetime." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 gold-border-top shadow-lg border border-gray-100">
                <div className="w-14 h-14 bg-[#B8941F]/10 flex items-center justify-center mb-8">
                  <item.icon size={24} className="text-[#B8941F]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B8941F]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm text-[#B8941F] uppercase tracking-widest font-medium">Why Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Why choose <span className="gradient-text">Creatix Pro</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Premium Quality", desc: "Every product undergoes rigorous quality checks before it reaches you." },
              { icon: Zap, title: "Fast Turnaround", desc: "From concept to delivery in record time, without compromising on quality." },
              { icon: Users, title: "500+ Happy Clients", desc: "Trusted by leading corporations across India for their gifting needs." },
              { icon: Target, title: "Custom Branding", desc: "Seamless logo integration and personalized packaging for your brand." },
              { icon: Heart, title: "Dedicated Support", desc: "A personal account manager for every project from start to finish." },
              { icon: Eye, title: "Pan-India Delivery", desc: "Reliable logistics and distribution to any location across the country." },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 p-10 group shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-[#B8941F]/10 flex items-center justify-center mb-8 group-hover:bg-[#B8941F]/20 transition-colors duration-300">
                  <item.icon size={22} className="text-[#B8941F]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-serif">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
