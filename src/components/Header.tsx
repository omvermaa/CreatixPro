"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Menu, X, Gift, ArrowRight, ChevronRight, ChevronDown } from "lucide-react";

export default function Header({ categories = [] }: { categories: any[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          <div className="group relative px-4 py-2 flex items-center gap-1 cursor-pointer">
            <Link href="/products" className={`text-sm font-bold uppercase tracking-widest transition-all duration-300 ${linkColorClass}`}>
              Products
            </Link>
            <ChevronDown size={14} className={`${!isScrolled && isHome ? "text-white" : "text-gray-500"} group-hover:rotate-180 transition-transform duration-300`} />
            
            <div className="absolute top-full left-0 mt-0 w-64 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 z-50">
              {categories.map((cat: any) => (
                <div key={cat._id} className="group/sub relative">
                  <Link 
                    href={`/products?category=${cat.slug}`}
                    className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#B8941F] transition-colors border-b border-gray-50 last:border-0"
                  >
                    {cat.name}
                    {(cat.subcategories?.length > 0 || cat.products?.length > 0) && <ChevronRight size={14} className="text-gray-400" />}
                  </Link>

                  {/* Level 2 Flyout (Subcategories AND Direct Products) */}
                  {(cat.subcategories?.length > 0 || cat.products?.length > 0) && (
                    <div className="absolute top-0 left-full w-56 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 -translate-x-2 group-hover/sub:translate-x-0 z-50">
                      
                      {/* Subcategories */}
                      {cat.subcategories?.map((sub: any) => (
                        <div key={sub._id} className="group/prod relative">
                          <Link 
                            href={`/products?category=${cat.slug}&subcategory=${sub.slug}`}
                            className="flex items-center justify-between px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#B8941F] transition-colors border-b border-gray-50 last:border-0"
                          >
                            {sub.name}
                            <ChevronRight size={14} className="text-gray-400" />
                          </Link>
                          
                          {/* Level 3 Flyout (Subcategory Products) */}
                          {sub.products?.length > 0 && (
                            <div className="absolute top-0 left-full w-56 bg-white border border-gray-100 shadow-xl opacity-0 invisible group-hover/prod:opacity-100 group-hover/prod:visible transition-all duration-300 -translate-x-2 group-hover/prod:translate-x-0 z-50">
                              {sub.products.map((prod: any) => (
                                <Link 
                                  key={prod._id}
                                  href={`/products/${prod._id}`}
                                  className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#B8941F] transition-colors border-b border-gray-50 last:border-0 truncate"
                                >
                                  {prod.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Direct Products (No Subcategory) */}
                      {cat.products?.map((prod: any) => (
                        <Link 
                          key={prod._id}
                          href={`/products/${prod._id}`}
                          className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#B8941F] transition-colors border-b border-gray-50 last:border-0 truncate"
                        >
                          {prod.name}
                        </Link>
                      ))}

                    </div>
                  )}
                </div>
              ))}
              {categories.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500">No categories found</div>
              )}
            </div>
          </div>

          <Link
            href="/contact"
            className={`px-4 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${linkColorClass}`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#B8941F] to-[#9A7B15] text-white text-sm font-semibold uppercase tracking-wider hover:brightness-110 transition-all duration-300"
          >
            Get Quote
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <UserButton />
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
              
              <div className={`overflow-hidden transition-all duration-300 ${mobileProductsOpen ? "max-h-[1000px] mt-6 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="flex flex-col gap-6 pl-4 border-l-2 border-[#B8941F]/30 ml-2">
                  {categories.map((cat: any) => (
                    <div key={cat._id} className="flex flex-col gap-3">
                      <Link 
                        href={`/products?category=${cat.slug}`} 
                        onClick={() => setMobileOpen(false)} 
                        className="text-base font-semibold text-gray-800 hover:text-[#B8941F]"
                      >
                        {cat.name}
                      </Link>
                      
                      {cat.subcategories?.length > 0 && (
                        <div className="flex flex-col gap-4 pl-4 border-l border-gray-200 ml-2 mt-2">
                          {cat.subcategories.map((sub: any) => (
                            <div key={sub._id} className="flex flex-col gap-2">
                              <Link 
                                href={`/products?category=${cat.slug}&subcategory=${sub.slug}`} 
                                onClick={() => setMobileOpen(false)} 
                                className="text-sm font-medium text-gray-600 hover:text-[#B8941F]"
                              >
                                {sub.name}
                              </Link>
                              
                              {sub.products?.length > 0 && (
                                <div className="flex flex-col gap-3 pl-4 mt-2">
                                  {sub.products.map((prod: any) => (
                                    <Link 
                                      key={prod._id} 
                                      href={`/products/${prod._id}`} 
                                      onClick={() => setMobileOpen(false)} 
                                      className="text-base text-gray-500 hover:text-[#B8941F] truncate flex items-center gap-2"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#B8941F]/50 flex-shrink-0"></span>
                                      {prod.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {cat.products?.length > 0 && !cat.subcategories?.length && (
                        <div className="flex flex-col gap-3 pl-4 border-l border-gray-200 ml-2 mt-2">
                          {cat.products.map((prod: any) => (
                            <Link 
                              key={prod._id} 
                              href={`/products/${prod._id}`} 
                              onClick={() => setMobileOpen(false)} 
                              className="text-base text-gray-500 hover:text-[#B8941F] truncate flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#B8941F]/50 flex-shrink-0"></span>
                              {prod.name}
                            </Link>
                          ))}
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
