"use client";

import { useState, useEffect, useRef } from "react";
import { Star } from "lucide-react";

const reviews = [
  { 
    quote: "Creatix Pro completely transformed our employee welcome kits. The quality and the elegant branding were superb. Highly recommended for any serious organization.", 
    name: "Priya Sharma", 
    role: "HR Director, Tech Innovations Ltd.",
    rating: 5,
    time: "2 weeks ago",
    verified: true
  },
  { 
    quote: "We needed high-end custom gifts for an executive summit on very short notice. Creatix Pro delivered beyond our expectations with incredible attention to detail.", 
    name: "Rajesh Mehta", 
    role: "Events Manager, Global Finance Group",
    rating: 5,
    time: "1 month ago",
    verified: true
  },
  { 
    quote: "The quality of the hoodies we ordered was exceptional. The embroidery was clean and precise. Our team loves them!", 
    name: "Anita Desai", 
    role: "Marketing Head, Retail Corp.",
    rating: 5,
    time: "3 weeks ago",
    verified: true
  },
  { 
    quote: "Excellent service from start to finish. They helped us choose the right products and delivered on time. Will definitely order again.", 
    name: "Vikram Singh", 
    role: "CEO, StartUp Hub",
    rating: 4,
    time: "1 month ago",
    verified: true
  },
  { 
    quote: "The promotional items were a hit at our annual conference. The custom packaging made them look very premium.", 
    name: "Sneha Kapoor", 
    role: "Operations Manager, Logistics Pro",
    rating: 5,
    time: "2 months ago",
    verified: true
  },
  { 
    quote: "The custom branding on the gift sets was flawless. It really helped us make a great impression on our international clients.", 
    name: "Arjun Reddy", 
    role: "Director, Global Logistics",
    rating: 5,
    time: "1 week ago",
    verified: true
  },
  { 
    quote: "Fast delivery and excellent communication throughout the process. The products were of top-notch quality.", 
    name: "Megha Sharma", 
    role: "Event Coordinator, Creative Agency",
    rating: 5,
    time: "3 days ago",
    verified: true
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    if (isPaused || isDragging) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        const children = container.children;
        if (children.length === 0) return;

        const nextIndex = (currentIndex + 1) % reviews.length;
        setCurrentIndex(nextIndex);

        const targetChild = children[nextIndex] as HTMLElement;
        container.scrollTo({
          left: targetChild.offsetLeft - container.offsetLeft,
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, isDragging]);

  const handleScroll = () => {
    if (scrollRef.current && !isDragging) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const children = container.children;
      
      let closestIndex = 0;
      let minDistance = Math.abs(scrollLeft - ((children[0] as HTMLElement).offsetLeft - container.offsetLeft));

      for (let i = 1; i < children.length; i++) {
        const distance = Math.abs(scrollLeft - ((children[i] as HTMLElement).offsetLeft - container.offsetLeft));
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = i;
        }
      }
      
      // Clamp index to the number of dots (we removed the last 2 dots)
      const maxDotIndex = reviews.length - 3;
      const clampedIndex = Math.min(closestIndex, maxDotIndex);
      
      setCurrentIndex(clampedIndex);
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseLeave = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // scroll-fast
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-6">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className={`flex overflow-x-auto ${isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory"} scrollbar-hide gap-6 pb-8`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reviews.map((t, i) => (
          <div key={i} className="snap-center shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
            <div className="bg-white p-10 border border-gray-100 relative shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col justify-between min-h-[350px] h-full select-none">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} size={14} className={`${index < t.rating ? "fill-[#B8941F] text-[#B8941F]" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-sans">{t.time}</span>
                </div>
                <p className="text-gray-700 leading-relaxed mb-8 text-base font-serif italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-10 h-10 bg-[#B8941F]/10 flex items-center justify-center font-bold text-[#B8941F] font-sans shrink-0">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-gray-900 uppercase tracking-wider text-xs font-sans">{t.name}</p>
                    {t.verified && (
                      <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1 h-1 bg-green-600 rounded-full" /> Verified Client
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-widest font-sans mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {reviews.slice(0, reviews.length - 2).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (scrollRef.current) {
                const container = scrollRef.current;
                const targetChild = container.children[i] as HTMLElement;
                container.scrollTo({
                  left: targetChild.offsetLeft - container.offsetLeft,
                  behavior: "smooth",
                });
                setCurrentIndex(i);
              }
            }}
            className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-[#B8941F]" : "w-2 bg-gray-200"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
