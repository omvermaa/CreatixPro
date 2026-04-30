import { Gift, PartyPopper, Briefcase, CalendarCheck, Shirt, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    { icon: Gift, title: "Corporate Gifting", description: "Strengthen client and partner relationships with high-quality, customized gifts that embody your company's prestige and thoughtful appreciation.", features: ["Executive Gift Sets", "Client Appreciation Boxes", "Partnership Milestones"] },
    { icon: PartyPopper, title: "Festive Gifting", description: "Celebrate occasions with curated hampers designed to bring joy and foster a sense of belonging among your extended corporate family.", features: ["Diwali Hampers", "Christmas Collections", "New Year Specials"] },
    { icon: Briefcase, title: "Employee Welcome Kits", description: "Make new hires feel instantly valued with comprehensive onboarding kits featuring branded office essentials and lifestyle products.", features: ["Branded Merchandise", "Tech Accessories", "Desk Essentials"] },
    { icon: CalendarCheck, title: "Event Gifting", description: "Leave a lasting impression on seminar and conference attendees with unique memorable takeaways that carry your brand's message.", features: ["Conference Swag", "Summit Exclusives", "Workshop Kits"] },
    { icon: Shirt, title: "Custom Merchandise", description: "Develop a cohesive brand identity with our extensive range of high-quality apparel, bags, and tech accessories customized to your specifications.", features: ["Branded Apparel", "Custom Bags", "Tech Gadgets"] }
  ];

  return (
    <div className="bg-white">
      <section className="relative py-32 overflow-hidden bg-[#FAFAFA]">
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
        <div className="absolute top-20 left-20 w-80 h-80 bg-[#B8941F]/5 blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <span className="text-sm text-[#B8941F] uppercase tracking-[0.3em] font-black">What We Offer</span>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mt-6 mb-8 uppercase tracking-tighter">Our <span className="gradient-text italic">Services</span></h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">End-to-end premium gifting solutions tailored for every corporate occasion, from festivals to onboarding.</p>
        </div>
      </section>

      <section className="relative py-12 pb-32 bg-white">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-100 p-10 group flex flex-col shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 bg-[#B8941F]/10 flex items-center justify-center mb-8 group-hover:bg-[#B8941F]/20 transition-colors duration-300">
                  <service.icon size={28} className="text-[#B8941F]" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-tight">{service.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-8 flex-1 font-serif">{service.description}</p>
                <div className="space-y-3 mb-10 border-t border-gray-50 pt-8">
                  {service.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-3 text-xs text-gray-500 uppercase tracking-widest font-bold">
                      <div className="w-1.5 h-1.5 bg-[#B8941F]" />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-[#B8941F] font-bold uppercase tracking-widest hover:gap-3 transition-all duration-300">
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
