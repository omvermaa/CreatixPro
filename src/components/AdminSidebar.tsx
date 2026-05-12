"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Manage Products" },
    { href: "/admin/categories", label: "Manage Categories" },
    { href: "/admin/messages", label: "Manage Messages" },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="md:hidden fixed top-3 left-4 z-50 p-2 bg-[#0A0A0A] text-white rounded-md shadow-md" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0A0A0A] text-white flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-gray-800 md:pt-6 pt-16">
          <Link href="/admin" className="text-xl font-bold font-serif tracking-widest text-white" onClick={() => setIsOpen(false)}>
            CREATIX ADMIN
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== "/admin");
            return (
              <Link 
                key={link.href}
                href={link.href} 
                className={`block px-4 py-2.5 rounded-sm transition ${isActive ? "bg-[#B8941F] text-white font-semibold" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
          
          <div className="pt-8 mt-8 border-t border-gray-800">
            <Link 
              href="/" 
              className="block px-4 py-2 rounded-sm text-gray-400 hover:bg-gray-800 hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              View Live Site
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}
