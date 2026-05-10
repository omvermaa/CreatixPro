"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface SubcategoryGridProps {
  items: any[];
  categorySlug: string;
}

export default function SubcategoryGrid({ items, categorySlug }: SubcategoryGridProps) {
  const [visibleCount, setVisibleCount] = useState(12);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + 12, items.length));
            setIsLoading(false);
          }, 600);
        }
      },
      { threshold: 0.1, rootMargin: "200px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [visibleCount, items.length, isLoading]);

  const visibleItems = items.slice(0, visibleCount);

  return (
    <>
      <div className="pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleItems.map((sub: any) => (
          <Link href={`/products/${categorySlug}/${sub.slug}`} key={sub._id}
            className="group bg-white border border-gray-100 flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
            <div className="aspect-square relative overflow-hidden bg-gray-50">
              {sub.imageUrl ? (
                <Image 
                  src={sub.imageUrl} 
                  alt={sub.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-700" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <span className="text-4xl text-gray-200">📦</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ArrowRight size={18} className="text-[#B8941F]" />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-50 flex-1 flex flex-col">
              <h3 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight group-hover:text-[#B8941F] transition-colors line-clamp-1">
                {sub.name}
              </h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{sub.productCount} Options</span>
                <span className="text-[10px] text-[#B8941F] font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">Explore</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {visibleCount < items.length && (
        <div ref={loaderRef} className="flex justify-center py-16">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
              <div className="absolute inset-0 border-2 border-transparent border-t-[#B8941F] rounded-full animate-spin" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-[0.2em] font-bold">Loading more...</span>
          </div>
        </div>
      )}
    </>
  );
}
