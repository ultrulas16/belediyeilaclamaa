"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShieldAlert, PhoneCall } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Alert Bar */}
      <div className="bg-safety-yellow py-2 border-b-2 border-safety-charcoal">
        <div className="container-custom flex justify-center lg:justify-between items-center overflow-hidden whitespace-nowrap">
          <div className="flex gap-8 animate-pulse text-[10px] font-black uppercase tracking-[0.3em] text-safety-charcoal">
            <span>● ACİL MÜDAHALE HATTI AKTİF</span>
            <span className="hidden lg:inline">● TSE 13227 STANDARTLARINDA HİZMET</span>
            <span className="hidden lg:inline">● 7/24 HALK SAĞLIĞI DESTEĞİ</span>
          </div>
          <div className="hidden lg:block text-[10px] font-black uppercase tracking-[0.2em] text-safety-charcoal">
             {siteConfig.phoneDisplay}
          </div>
        </div>
      </div>

      <div className={cn(
        "transition-all duration-300 border-b-4 border-safety-charcoal",
        isScrolled ? "bg-white py-3 shadow-2xl" : "bg-white py-8"
      )}>
        <div className="container-custom flex items-center justify-between">
          {/* Brand - Safety Bold Style */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="bg-safety-charcoal p-3 text-safety-yellow border-2 border-safety-charcoal shadow-[4px_4px_0px_rgba(18,18,18,0.2)]">
               <ShieldAlert size={32} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-3xl lg:text-4xl leading-none tracking-tighter text-safety-charcoal uppercase italic">
                BELEDİYE <br/> <span className="text-safety-yellow bg-safety-charcoal px-1 not-italic">İLAÇLAMA</span>
              </span>
            </div>
          </Link>

          {/* Navigation - Editorial Style */}
          <nav className="hidden lg:flex items-center gap-12">
            {[
              { name: "Müdahale Alanları", href: "/#hizmetlerimiz" },
              { name: "Operasyon Planı", href: "/#kurumsal" },
              { name: "Halk Masası", href: "/#iletisim" }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-xs font-black uppercase tracking-[0.2em] text-safety-charcoal hover:bg-safety-yellow px-2 py-1 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Urgent CTA */}
          <div className="hidden lg:flex items-center gap-2">
            <Link 
              href={`tel:${siteConfig.phone}`}
              className="btn-safety-primary flex items-center gap-3 !px-6 !py-3 !text-xs"
            >
              <PhoneCall size={16} />
              ACİL ÇAĞRI
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-3 bg-safety-charcoal text-safety-yellow"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Bold */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-safety-yellow z-40 flex flex-col p-8 pt-40 gap-10 overflow-y-auto">
          <button 
            className="absolute top-20 right-8 p-3 bg-safety-charcoal text-safety-yellow"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>
          
          <nav className="flex flex-col gap-8">
            {[
              { name: "Müdahale Alanları", href: "/#hizmetlerimiz" },
              { name: "Operasyon Planı", href: "/#kurumsal" },
              { name: "Halk Masası", href: "/#iletisim" }
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="text-5xl font-black text-safety-charcoal uppercase tracking-tighter italic border-b-4 border-safety-charcoal leading-none pb-2"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto space-y-4">
             <Link href={`tel:${siteConfig.phone}`} className="btn-safety-primary w-full text-xl py-8">
                ACİL ÇAĞRI YAP
             </Link>
             <div className="text-center font-black uppercase text-xs tracking-widest text-safety-charcoal">
                7/24 OPERASYONEL DESTEK
             </div>
          </div>
        </div>
      )}
    </header>
  );
}
