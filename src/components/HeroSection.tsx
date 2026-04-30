"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function HeroSection() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  
  const videos = [
    "/vid1.mp4",
    "/vid2.mp4",
    "/vid3.mp4",
    "/vid4.mp4"
  ];

  const handleVideoEnd = () => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
      setIsFading(false);
    }, 800); // Transition duration
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black -mt-20">
      {/* Video Background */}
      <video 
        src={videos[currentVideoIndex]}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isFading ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Dim Overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full mt-10">
        
        {/* Content */}
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-white text-balance uppercase tracking-tight">
            Gifts that
            <span className="text-[#B8941F] block italic">leave a mark.</span>
          </h1>
          {/* <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed font-serif">
            We help brands strengthen relationships through thoughtfully curated, bespoke corporate gifts tailored for every occasion.
          </p> */}
          
          {/* Key Details */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 border border-white/10 backdrop-blur-sm">
              <CheckCircle size={16} className="text-[#B8941F]" />
              <span className="text-xs text-gray-100 uppercase tracking-widest font-bold">Custom Logo Engraving</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 border border-white/10 backdrop-blur-sm">
              <CheckCircle size={16} className="text-[#B8941F]" />
              <span className="text-xs text-gray-100 uppercase tracking-widest font-bold">Premium Packaging</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 px-4 py-2 border border-white/10 backdrop-blur-sm">
              <CheckCircle size={16} className="text-[#B8941F]" />
              <span className="text-xs text-gray-100 uppercase tracking-widest font-bold">Pan-India Delivery</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products"
              className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#B8941F] text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300">
              Explore Collections
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Request a Quote
            </Link>
          </div>
        </div>

      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float z-10">
        <span className="text-xs text-white/50 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
