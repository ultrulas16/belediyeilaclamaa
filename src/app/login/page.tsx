"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Lock, ArrowRight, Zap } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await loginAction(password);
      if (result.success) {
        router.push("/admin");
      } else {
        setError(result.error || "Giriş başarısız.");
      }
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-safety-charcoal flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-safety-yellow -skew-x-12 translate-x-1/2 opacity-5 pointer-events-none"></div>
      
      <div className="max-w-md w-full space-y-10 bg-white p-12 rounded-none border-8 border-safety-yellow shadow-[32px_32px_0px_rgba(18,18,18,0.5)] relative z-10 animate-safety-slide">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-safety-charcoal text-safety-yellow border-4 border-safety-yellow flex items-center justify-center mx-auto shadow-[8px_8px_0px_rgba(18,18,18,0.2)]">
             <ShieldAlert size={48} strokeWidth={2.5} />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-safety-charcoal tracking-tighter italic uppercase leading-none">
              SİSTEM <br/> <span className="bg-safety-charcoal text-white px-2 not-italic">GİRİŞİ</span>
            </h1>
            <p className="text-secondary-label text-[11px] font-black uppercase tracking-widest text-safety-charcoal/40">
              YETKİLİ PERSONEL KİMLİK DOĞRULAMA
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-2">
             <label className="text-[11px] font-black text-safety-charcoal uppercase tracking-[0.2em] flex items-center gap-2">
               <Zap size={12} className="text-safety-yellow fill-safety-yellow" />
               SİSTEM ŞİFRESİ
             </label>
             <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-safety-charcoal" size={20} />
                <input 
                  required
                  type="password"
                  placeholder="KORUMALI ALAN ŞİFRESİ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-5 rounded-none bg-safety-slate border-2 border-safety-charcoal outline-none focus:bg-white focus:border-safety-yellow transition-all font-black text-safety-charcoal uppercase"
                />
             </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 border-2 border-red-200 p-4 rounded-none text-[11px] font-black uppercase tracking-tight flex items-center gap-3 italic">
               <ShieldAlert size={20} />
               {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-safety-charcoal hover:bg-black text-safety-yellow font-black py-6 rounded-none border-2 border-safety-charcoal shadow-[8px_8px_0px_rgba(18,18,18,0.1)] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 italic uppercase tracking-widest"
          >
            <span>{loading ? "DOĞRULANIYOR..." : "SİSTEME GİRİŞ YAP"}</span>
            {!loading && <ArrowRight size={24} strokeWidth={2.5} className="group-hover:translate-x-2 transition-transform" />}
          </button>
        </form>

        <p className="text-center text-[9px] text-safety-charcoal/30 uppercase tracking-[0.3em] font-black leading-tight border-t border-safety-charcoal/10 pt-8">
          TÜM ERİŞİM KAYITLARI IP ADRESİ İLE BİRLİKTE GÜVENLİK PROTOKOLÜNE İŞLENMEKTEDİR
        </p>
      </div>
    </div>
  );
}
