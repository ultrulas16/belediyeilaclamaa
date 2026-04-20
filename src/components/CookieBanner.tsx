"use client";

import React, { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent_accepted");
    if (!consent) {
      // Delay appearance slightly for effect
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] p-6 lg:p-10 pointer-events-none">
      <div className="container-custom flex justify-center">
        <div className="bg-safety-yellow border-4 border-safety-charcoal p-8 lg:p-12 shadow-[16px_16px_0px_rgba(18,18,18,1)] flex flex-col lg:flex-row items-center gap-8 lg:gap-16 pointer-events-auto max-w-5xl animate-safety-slide">
          <div className="bg-safety-charcoal p-4 text-safety-yellow flex-shrink-0">
            <Cookie size={40} strokeWidth={2.5} />
          </div>
          
          <div className="space-y-3 flex-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <ShieldCheck size={18} className="text-safety-charcoal" />
              <h3 className="text-xl font-black italic uppercase tracking-tighter text-safety-charcoal">ÇEREZ VE VERİ POLİTİKASI</h3>
            </div>
            <p className="text-xs font-bold uppercase tracking-tight text-safety-charcoal/70 leading-relaxed">
              Size daha iyi hizmet sunabilmek, web sitesi trafiğini analiz etmek ve deneyiminizi kişiselleştirmek için teknik çerezler kullanıyoruz. Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş sayılırsınız.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <button 
              onClick={handleAccept}
              className="bg-safety-charcoal text-safety-yellow px-10 py-4 font-black uppercase text-sm tracking-widest hover:bg-black transition-all border-2 border-safety-charcoal active:translate-x-1 active:translate-y-1 active:shadow-none italic"
            >
              KABUL EDİYORUM
            </button>
            <button 
              onClick={() => setIsVisible(false)}
              className="bg-transparent text-safety-charcoal px-10 py-4 font-black uppercase text-sm tracking-widest hover:bg-safety-charcoal/5 transition-all border-2 border-safety-charcoal italic"
            >
              DAHA SONRA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
