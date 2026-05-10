"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); setError(""); setSuccess(false);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to send message.");

      try {
        const web3formsData = {
          ...data,
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "dc26db96-ff71-4d42-8688-dc9395cd1349",
          subject: `New Inquiry from ${data.name}`,
          from_name: "Creatix Pro Website"
        };
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(web3formsData)
        });
      } catch (err) {
        console.error("Web3Forms error (Client):", err);
      }

      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) { setError(err.message); } finally { setLoading(false); }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <section className="relative py-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#B8941F]/5 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm text-[#B8941F] uppercase tracking-[0.3em] font-black">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-6 mb-8 uppercase tracking-tighter">Start a <span className="gradient-text italic">Conversation</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">Ready to elevate your corporate gifting? Request a quote, ask a question, or simply say hello.</p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {[
              { icon: Phone, label: "Phone", value: "+91-8287884439", href: "tel:+918287884439" },
              { icon: Mail, label: "Email", value: "creatixpro1@gmail.com", href: "mailto:creatixpro1@gmail.com" },
              { icon: MapPin, label: "Location", value: "Delhi NCR, India", href: null },
            ].map((item, i) => (
              <div key={i} className="bg-white border border-gray-100 p-8 flex items-start gap-6 shadow-lg group">
                <div className="w-12 h-12 bg-[#B8941F]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#B8941F]/20 transition-colors duration-300">
                  <item.icon size={20} className="text-[#B8941F]" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-300 uppercase tracking-widest font-black mb-2">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-lg font-bold text-gray-900 hover:text-[#B8941F] transition-colors">{item.value}</a>
                  ) : (
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="bg-[#B8941F]/5 border border-[#B8941F]/20 p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4 uppercase tracking-tight">Prefer Direct Chat?</h3>
              <p className="text-sm text-gray-500 mb-8 font-serif">Connect with our specialists instantly for personalized consultations.</p>
              <a href="https://wa.me/918287884439" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white text-xs font-bold uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300">
                Chat on WhatsApp <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-100 p-10 md:p-12 shadow-2xl">
              <h3 className="text-3xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">Send a Message</h3>
              <p className="text-gray-500 mb-10 font-serif">Fill out the formal inquiry form below and we&apos;ll get back to you within 24 hours.</p>

              {success && <div className="mb-8 p-4 bg-green-50 text-green-700 border border-green-200 text-sm font-bold uppercase tracking-wider">✓ Inquiry submitted successfully.</div>}
              {error && <div className="mb-8 p-4 bg-red-50 text-red-700 border border-red-200 text-sm font-bold uppercase tracking-wider">{error}</div>}

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-14 rounded-none outline-none ring-0 font-serif" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Company Name</label>
                    <Input name="company" required placeholder="Acme Corp" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-14 rounded-none outline-none ring-0 font-serif" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Professional Email</label>
                    <Input type="email" name="email" required placeholder="john@company.com" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-14 rounded-none outline-none ring-0 font-serif" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Contact Number</label>
                    <Input type="number" name="phone" required placeholder="+91 99999 99999" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-14 rounded-none outline-none ring-0 font-serif" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Requirements Overview</label>
                  <Textarea name="requirement" required placeholder="Describe your corporate gifting needs in detail..." rows={5}
                    className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] rounded-none outline-none ring-0 font-serif resize-none p-5" />
                </div>
                <button type="submit" disabled={loading}
                  className="group w-full flex items-center justify-center gap-4 px-8 py-5 bg-[#0A0A0A] text-white font-bold uppercase tracking-[0.3em] hover:brightness-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Processing..." : <><span>Submit Inquiry</span><Send size={18} className="group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
