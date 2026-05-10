"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface QuoteModalProps {
  productName: string;
}

export default function QuoteModal({ productName }: QuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const userRequirement = formData.get("requirement") as string;
    const phone = formData.get("phone") as string;

    // Validate 10 digit phone
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit contact number.");
      setLoading(false);
      return;
    }

    const data = {
      name: formData.get("name"),
      phone: phone,
      company: formData.get("company"),
      email: formData.get("email"),
      requirement: `Requesting Quote for: ${productName}\n\nDetails: ${userRequirement}`,
    };

    try {
      // 1. Submit to internal database
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send request.");

      // 2. Submit to Web3Forms directly from the browser to bypass Cloudflare
      try {
        const web3formsData = {
          ...data,
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "dc26db96-ff71-4d42-8688-dc9395cd1349",
          subject: `New Quote Request for ${productName}`,
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
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="group w-full inline-flex items-center justify-center gap-3 px-8 py-5 bg-[#0A0A0A] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-all duration-300 text-sm shadow-2xl"
      >
        Request Quote For This Item
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {mounted && isOpen ? createPortal(
        <div className="fixed inset-0 z-[999999] flex items-start justify-center p-4 pt-10 md:pt-24 overflow-y-auto">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !loading && setIsOpen(false)}
          />
          <div className="relative bg-white border border-gray-100 shadow-2xl w-full max-w-lg p-8 md:p-10 z-10 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsOpen(false)}
              disabled={loading}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-bold text-gray-900 mb-2 uppercase tracking-tighter">Request Quote</h3>
            <p className="text-sm text-gray-500 mb-8 font-serif">
              For: <strong className="text-[#B8941F]">{productName}</strong>
            </p>

            {success ? (
              <div className="p-6 bg-green-50 text-green-700 border border-green-200 text-sm font-bold uppercase tracking-wider text-center">
                ✓ Quote request submitted successfully.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && <div className="p-3 bg-red-50 text-red-700 border border-red-200 text-xs font-bold uppercase tracking-wider">{error}</div>}
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Full Name</label>
                    <Input name="name" required placeholder="John Doe" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-12 rounded-none outline-none ring-0 font-serif" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Company Name</label>
                    <Input name="company" required placeholder="Acme Corp" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-12 rounded-none outline-none ring-0 font-serif" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Professional Email</label>
                    <Input type="email" name="email" required placeholder="john@company.com" className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-12 rounded-none outline-none ring-0 font-serif" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Contact Number</label>
                    <Input type="tel" name="phone" required placeholder="10-digit mobile number" maxLength={10} minLength={10} className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] h-12 rounded-none outline-none ring-0 font-serif" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] text-gray-400 uppercase tracking-widest font-black">Requirement Details</label>
                  <Textarea name="requirement" required placeholder="E.g., Require 500 units with custom logo printing..." rows={4}
                    className="bg-[#FAFAFA] border-gray-100 text-gray-900 placeholder:text-gray-400 focus:border-[#B8941F] rounded-none outline-none ring-0 font-serif resize-none p-4" />
                </div>
                
                <button type="submit" disabled={loading}
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-[#0A0A0A] text-white font-bold uppercase tracking-[0.2em] hover:bg-[#1a1a1a] transition-all duration-300 text-sm shadow-xl disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Processing..." : <><span>Submit Request</span><Send size={16} className="group-hover:translate-x-1 transition-transform" /></>}
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      ) : null}
    </>
  );
}
