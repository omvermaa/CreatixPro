"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, Gift, ArrowRight, ChevronRight, ChevronDown, LayoutDashboard } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Header({ categories = [] }: { categories: any[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 20);

      // Show if scrolling up, hide if scrolling down (after 100px threshold)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  const headerBgClass = isScrolled || !isHome || mobileOpen ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent border-transparent";
  const textColorClass = !isScrolled && isHome && !mobileOpen ? "text-white" : "text-gray-900";
  const linkColorClass = !isScrolled && isHome && !mobileOpen ? "text-white hover:text-gray-200" : "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-500 ${
      isVisible || mobileOpen ? "translate-y-0" : "-translate-y-full"
    } ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#B8941F] to-[#9A7B15] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <Gift size={20} className="text-white" />
          </div>
          <span className={`text-xl font-bold tracking-wide uppercase transition-colors duration-300 ${textColorClass}`}>
            CREATIX<span className="text-[#B8941F]">PRO</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 relative">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${linkColorClass}`}
            >
              {link.label}
            </Link>
          ))}

          {/* Products Dropdown */}
          <div 
            className="group relative px-4 py-2 flex items-center gap-1 cursor-pointer"
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link href="/products" className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 ${linkColorClass}`}>
              Products
            </Link>
            <ChevronDown size={14} className={`${!isScrolled && isHome ? "text-white" : "text-gray-500"} group-hover:rotate-180 transition-transform duration-300`} />
            
            <div className="absolute top-full left-0 mt-0 w-[600px] bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-50 flex max-h-[calc(100vh-120px)] overflow-hidden">
              
              {/* Categories Column */}
              <div className="w-[45%] border-r border-gray-100 overflow-y-auto custom-scrollbar py-2 bg-white shrink-0">
                {categories.map((cat: any) => {
                  const isActive = hoveredCategory ? hoveredCategory === cat._id : categories[0]?._id === cat._id;
                  return (
                    <div 
                      key={cat._id} 
                      className="relative"
                      onMouseEnter={() => setHoveredCategory(cat._id)}
                    >
                      <Link 
                        href={`/products/${cat.slug}`}
                        className={`flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors border-b border-gray-50 last:border-0 ${
                          isActive ? "bg-gray-50 text-[#B8941F]" : "text-gray-700 hover:bg-gray-50 hover:text-[#B8941F]"
                        }`}
                      >
                        {cat.name}
                        {(cat.subcategories?.length > 0) && (
                          <ChevronRight size={14} className={`transition-colors ${isActive ? "text-[#B8941F]" : "text-gray-300"}`} />
                        )}
                      </Link>
                    </div>
                  );
                })}
                {categories.length === 0 && (
                  <div className="px-5 py-3.5 text-sm text-gray-500">No categories found</div>
                )}
              </div>

              {/* Subcategories Column */}
              <div className="w-[55%] overflow-y-auto custom-scrollbar py-4 bg-gray-50/50 shrink-0">
                {(() => {
                  const activeCat = categories.find((c: any) => c._id === hoveredCategory) || categories[0];
                  
                  if (!activeCat || !activeCat.subcategories || activeCat.subcategories.length === 0) {
                    return (
                      <div className="px-6 py-2 text-sm text-gray-500 italic">
                        No subcategories available.
                      </div>
                    );
                  }

                  return (
                    <div className="flex flex-col">
                      <div className="px-6 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 border-b border-gray-200/50 pb-3">
                        {activeCat.name}
                      </div>
                      <div className="flex flex-col gap-1 px-2 mt-2">
                        {activeCat.subcategories.map((sub: any) => (
                          <Link 
                            key={sub._id}
                            href={`/products/${activeCat.slug}/${sub.slug}`}
                            className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-[#B8941F] hover:bg-white rounded-md transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>
          </div>

          <Link
            href="/contact"
            className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${linkColorClass}`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <SearchBar className="w-48 xl:w-64" />
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#B8941F] to-[#9A7B15] text-white text-sm font-semibold uppercase tracking-wider hover:brightness-110 transition-all duration-300 whitespace-nowrap"
          >
            Get Quote
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          {isMounted && (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Admin Panel"
                  labelIcon={<LayoutDashboard size={16} />}
                  href="/admin"
                />
              </UserButton.MenuItems>
            </UserButton>
          )}
        </div>

        <button className={`md:hidden p-2 transition-all duration-500 ${!isScrolled && isHome && !mobileOpen ? "text-white" : "text-gray-700"} ${mobileOpen ? "rotate-90" : "rotate-0"}`} onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="relative w-6 h-6">
            <div className={`absolute inset-0 transition-all duration-500 transform ${mobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}`}>
              <X size={24} />
            </div>
            <div className={`absolute inset-0 transition-all duration-500 transform ${mobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}`}>
              <Menu size={24} />
            </div>
          </div>
        </button>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full h-[calc(100dvh-80px)] bg-white shadow-2xl overflow-y-auto flex flex-col border-t border-gray-100 transition-all duration-500 ease-in-out ${
        mobileOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
      }`}>
        <nav className="flex flex-col px-8 py-8 gap-6 flex-1 transition-all duration-700 delay-100">
            <div className="mb-2">
              <SearchBar className="w-full" inputClassName="h-12 text-base" buttonClassName="px-5" />
            </div>
            {navLinks.slice(0, 3).map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setMobileOpen(false)}
                className="text-lg font-medium uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-4 hover:text-[#B8941F] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Categories Accordion */}
            <div className="flex flex-col border-b border-gray-100 pb-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              >
                <span className="text-lg font-medium uppercase tracking-widest text-gray-900 hover:text-[#B8941F] transition-colors">Products</span>
                <ChevronDown 
                  size={24} 
                  className={`text-gray-900 transition-transform duration-300 ${mobileProductsOpen ? "rotate-180" : ""}`} 
                />
              </div>
              
              <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? "max-h-[3000px] mt-6 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col gap-6 pl-4 border-l-2 border-[#B8941F]/30 ml-2">
                  {categories.map((cat: any) => (
                    <div key={cat._id} className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <Link 
                          href={`/products/${cat.slug}`} 
                          onClick={() => setMobileOpen(false)} 
                          className="text-base font-semibold text-gray-800 hover:text-[#B8941F] flex-1"
                        >
                          {cat.name}
                        </Link>
                        {cat.subcategories?.length > 0 && (
                          <div 
                            className="p-2 cursor-pointer text-gray-500 hover:text-[#B8941F]"
                            onClick={() => setOpenCategory(openCategory === cat._id ? null : cat._id)}
                          >
                            <ChevronDown size={18} className={`transition-transform duration-300 ${openCategory === cat._id ? "rotate-180" : ""}`} />
                          </div>
                        )}
                      </div>
                      
                      {cat.subcategories?.length > 0 && (
                        <div className={`overflow-hidden transition-all duration-300 ${openCategory === cat._id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                          <div className="flex flex-col gap-4 pl-4 border-l border-gray-200 ml-2 mt-2">
                            {cat.subcategories.map((sub: any) => (
                              <div key={sub._id} className="flex flex-col gap-2">
                                <Link 
                                  href={`/products/${cat.slug}/${sub.slug}`} 
                                  onClick={() => setMobileOpen(false)} 
                                  className="text-sm font-medium text-gray-600 hover:text-[#B8941F]"
                                >
                                  {sub.name}
                                </Link>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {categories.length === 0 && (
                     <div className="text-gray-500 italic">No categories found</div>
                  )}
                </div>
              </div>
            </div>

            <Link 
              href="/contact" 
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium uppercase tracking-widest text-gray-900 border-b border-gray-100 pb-4 hover:text-[#B8941F] transition-colors"
            >
              Contact
            </Link>
          </nav>
          
          <div className="p-8 bg-gray-50 mt-auto border-t border-gray-100 pb-12">
             <Link 
               href="/contact" 
               onClick={() => setMobileOpen(false)}
               className="flex items-center justify-center gap-3 w-full py-5 bg-gradient-to-r from-[#B8941F] to-[#9A7B15] text-white text-lg font-bold uppercase tracking-wider hover:brightness-110 transition-all duration-300"
             >
               Get Quote
               <ArrowRight size={20} />
             </Link>
          </div>
        </div>
    </header>
  );
}
