import Link from "next/link";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Gift, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import connectDB from "@/lib/db";
import Category from "@/lib/models/Category";
import Subcategory from "@/lib/models/Subcategory";
import Product from "@/lib/models/Product";

export const dynamic = 'force-dynamic';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  await connectDB();
  const categories = await Category.find({}).lean();
  const subcategories = await Subcategory.find({}).lean();
  const products = await Product.find({}).lean();
  
  const categoriesWithSubcategoriesAndProducts = categories.map((cat: any) => ({
    _id: cat._id.toString(),
    name: cat.name,
    slug: cat.slug,
    subcategories: subcategories
      .filter((sub: any) => sub.category.toString() === cat._id.toString())
      .map((sub: any) => ({ 
        _id: sub._id.toString(), 
        name: sub.name,
        slug: sub.slug,
        category: sub.category.toString(),
        products: products
          .filter((prod: any) => prod.subcategory && prod.subcategory.toString() === sub._id.toString())
          .map((prod: any) => ({ 
            _id: prod._id.toString(), 
            name: prod.name,
            imageUrl: prod.imageUrl 
          }))
      })),
    products: products
      .filter((prod: any) => prod.category.toString() === cat._id.toString() && !prod.subcategory)
      .map((prod: any) => ({ 
        _id: prod._id.toString(), 
        name: prod.name,
        imageUrl: prod.imageUrl 
      }))
  }));

  // Create a lite version for the Header to prevent OOM
  const headerCategories = categoriesWithSubcategoriesAndProducts.map(cat => ({
    _id: cat._id,
    name: cat.name,
    slug: cat.slug,
    subcategories: cat.subcategories.map(sub => ({
      _id: sub._id,
      name: sub.name,
      slug: sub.slug
    }))
  }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header categories={headerCategories} />

      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="relative overflow-hidden border border-[#B8941F]/30 bg-white/[0.02] p-12">
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 uppercase tracking-tight">Ready to elevate your gifting?</h3>
              <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">Let&apos;s create unforgettable gift experiences that strengthen your business relationships.</p>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#B8941F] to-[#9A7B15] text-white font-bold uppercase tracking-widest hover:brightness-110 transition-all duration-300">
                Start a Project <ArrowRight size={18} />
              </Link>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#B8941F]/5 rounded-none blur-3xl -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#B8941F] to-[#9A7B15] flex items-center justify-center">
                <Gift size={20} className="text-white" />
              </div>
              <span className="text-lg font-bold uppercase">CREATIX<span className="text-[#B8941F]">PRO</span></span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">Premium corporate gifting solutions that transform business relationships into lasting bonds.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-gray-500 hover:text-[#B8941F] transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <span>Corporate Gifting</span><span>Festive Hampers</span><span>Welcome Kits</span><span>Custom Merchandise</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <span>creatixpro1@gmail.com</span><span>+91-8287884439</span><span>Delhi NCR, India</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-600" suppressHydrationWarning>&copy; {new Date().getFullYear()} Creatix Pro. All rights reserved.</p>
            <p className="text-xs text-gray-600">Crafted with precision in Delhi NCR</p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
