"use client";

import { useState } from "react";
import { Send, CheckSquare, AlertTriangle, Zap } from "lucide-react";
import { addLead } from "@/lib/db";
import { cn } from "@/lib/utils";

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function ContactForm({ 
  title = "ACİL MÜDAHALE BAŞVURU FORMU", 
  subtitle = "TEKNİK EKİPLERİMİZ TALEBİNİZİ ANLIK OLARAK SİSTEME DAHİL EDECEKTİR.",
  className
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      service: formData.get("service") as string,
      message: formData.get("message") as string,
    };

    // Save to Supabase
    const result = await addLead(data);
    
    setLoading(false);
    if (result) {
      setSubmitted(true);
    } else {
      alert("Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.");
    }
  };

  if (submitted) {
    return (
      <div className={cn("bg-safety-charcoal p-12 rounded-none border-8 border-safety-yellow text-white text-center space-y-8 animate-safety-slide", className)}>
        <div className="flex justify-center">
          <div className="bg-safety-yellow p-6 text-safety-charcoal border-4 border-safety-charcoal shadow-[8px_8px_0px_rgba(253,224,71,0.2)]">
            <CheckSquare size={64} strokeWidth={3} />
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-black italic uppercase leading-none tracking-tighter">KAYIT ONAYLANDI</h3>
          <p className="text-white/60 font-bold uppercase leading-relaxed text-sm">
            TALEBİNİZ OPERASYON MERKEZİMİZE İLETİLDİ. <br/>
            <strong className="text-safety-yellow">UZMAN EKİPLERİMİZ TARAFINDAN GERİ DÖNÜŞ SAĞLANACAKTIR.</strong>
          </p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="text-safety-yellow font-black hover:underline uppercase text-xs tracking-widest"
        >
          YENİ DOSYA OLUŞTUR
        </button>
      </div>
    );
  }

  return (
    <div className={cn("bg-white p-10 rounded-none border-4 border-safety-charcoal shadow-[16px_16px_0px_rgba(18,18,18,1)] flex flex-col", className)}>
      <div className="mb-10 space-y-4 border-b-4 border-safety-charcoal pb-8">
        <div className="flex items-center gap-3 text-safety-charcoal">
          <AlertTriangle size={24} strokeWidth={2.5} />
          <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{title}</h3>
        </div>
        <p className="text-safety-charcoal/50 text-[11px] font-black uppercase leading-tight tracking-widest">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 flex-grow">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-safety-charcoal uppercase tracking-widest flex items-center gap-2">
             <Zap size={12} className="text-safety-yellow fill-safety-yellow" />
             AD SOYAD / KURUMSAL ÜNVAN
          </label>
          <input 
            required
            name="name"
            type="text" 
            placeholder="ÖR: BURSA LOJİSTİK MERKEZİ"
            className="w-full px-5 py-5 rounded-none border-2 border-safety-charcoal bg-safety-slate focus:bg-white focus:border-safety-yellow outline-none transition-all text-safety-charcoal font-black uppercase placeholder:text-safety-charcoal/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-safety-charcoal uppercase tracking-widest flex items-center gap-2">
             <Zap size={12} className="text-safety-yellow fill-safety-yellow" />
             İRTİBAT NUMARASI
          </label>
          <input 
            required
            name="phone"
            type="tel" 
            placeholder="05XX XXX XX XX"
            className="w-full px-5 py-5 rounded-none border-2 border-safety-charcoal bg-safety-slate focus:bg-white focus:border-safety-yellow outline-none transition-all text-safety-charcoal font-black uppercase placeholder:text-safety-charcoal/20"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-safety-charcoal uppercase tracking-widest flex items-center gap-2">
             <Zap size={12} className="text-safety-yellow fill-safety-yellow" />
             MÜDAHALE TİPİ
          </label>
          <select 
            name="service"
            className="w-full px-5 py-5 rounded-none border-2 border-safety-charcoal bg-safety-slate focus:bg-white focus:border-safety-yellow outline-none transition-all appearance-none text-safety-charcoal font-black uppercase"
          >
            <option value="">SEÇİM YAPINIZ</option>
            <option value="konut">BİREYSEL KONUT</option>
            <option value="isyeri">TİCARİ İŞYERİ</option>
            <option value="apartman">APARTMAN / SİTE</option>
            <option value="fabrika">ENDÜSTRİYEL TESİS</option>
            <option value="diger">DİĞER</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[11px] font-black text-safety-charcoal uppercase tracking-widest flex items-center gap-2">
             <Zap size={12} className="text-safety-yellow fill-safety-yellow" />
             DURUM ÖZETİ (OPSİYONEL)
          </label>
          <textarea 
            name="message"
            rows={2}
            placeholder="BELİRTİLER VEYA ÖZEL NOTLAR..."
            className="w-full px-5 py-5 rounded-none border-2 border-safety-charcoal bg-safety-slate focus:bg-white focus:border-safety-yellow outline-none transition-all text-safety-charcoal font-black uppercase placeholder:text-safety-charcoal/20 resize-none"
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-safety-charcoal hover:bg-black text-safety-yellow font-black py-6 rounded-none border-2 border-safety-charcoal shadow-[8px_8px_0px_rgba(18,18,18,0.2)] transition-all flex items-center justify-center gap-4 group disabled:opacity-70 uppercase tracking-widest italic"
        >
          {loading ? (
            <span className="flex items-center gap-3">
              <span className="h-5 w-5 border-2 border-safety-yellow/20 border-t-safety-yellow rounded-full animate-spin"></span>
              İŞLEM YAPILIYOR...
            </span>
          ) : (
            <>
              <span>BAŞVURUYU TAMAMLA</span>
              <Send size={24} strokeWidth={2.5} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </>
          )}
        </button>

        <p className="text-[10px] text-safety-charcoal/30 text-center font-black uppercase tracking-[0.2em] leading-tight">
          BU FORM ARACILIĞIYLA PAYLAŞILAN VERİLER RESMİ KAYITLARA DAHİL EDİLEREK T.C. KVKK KAPSAMINDA KORUNUR.
        </p>
      </form>
    </div>
  );
}
