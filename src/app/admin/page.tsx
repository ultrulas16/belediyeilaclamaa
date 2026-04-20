"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  TrendingUp,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getLeads, Lead } from "@/lib/db";

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      const data = await getLeads();
      setLeads(data);
      setLoading(false);
    };
    fetchLeads();
  }, []);

  const stats = [
    { label: "TOPLAM BAŞVURU", value: leads.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "BEKLEYEN KAYIT", value: leads.filter(l => l.status === "Yeni").length.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "TAMAMLANAN", value: leads.filter(l => l.status === "Tamamlandı").length.toString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "ACİL MÜDAHALE", value: leads.filter(l => l.status === "Acil").length.toString(), icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
  ];

  return (
    <div className="space-y-12">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white border-4 border-safety-charcoal p-8 shadow-[12px_12px_0px_rgba(18,18,18,1)] flex flex-col gap-6">
             <div className="flex items-center justify-between">
                <div className={cn("p-4 border-2 border-safety-charcoal", stat.bg)}>
                   <stat.icon size={32} className={stat.color} />
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-black italic text-sm">
                   <TrendingUp size={16} />
                   AKTİF
                </div>
             </div>
             <div className="space-y-1">
                <div className="text-[10px] font-black text-safety-charcoal/30 uppercase tracking-[0.3em] font-black">{stat.label}</div>
                <div className="text-4xl font-black text-safety-charcoal italic tracking-tighter">
                   {loading ? "..." : stat.value}
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Live Status Board */}
         <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b-4 border-safety-charcoal pb-4">
               <h3 className="text-2xl font-black uppercase italic tracking-tighter text-safety-charcoal">SON BAŞVURU AKIŞI</h3>
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                  <div className="h-3 w-3 bg-emerald-600 rounded-full animate-pulse"></div>
                  CANLI SİSTEM
               </div>
            </div>

            <div className="space-y-4">
               {loading ? (
                 <div className="p-20 text-center opacity-20">YÜKLENİYOR...</div>
               ) : leads.length === 0 ? (
                 <div className="p-20 text-center opacity-20 uppercase font-black tracking-widest">HENÜZ BAŞVURU BULUNMAMAKTADIR</div>
               ) : (
                 leads.slice(0, 5).map((item, i) => (
                   <div key={i} className="bg-white border-2 border-safety-charcoal p-6 flex items-center justify-between group hover:bg-safety-slate transition-all">
                      <div className="flex items-center gap-8">
                         <span className="text-sm font-black text-safety-charcoal/20">
                            {new Date(item.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
                         </span>
                         <div className="space-y-1 text-left">
                            <div className="font-black text-safety-charcoal uppercase italic text-sm group-hover:text-safety-yellow group-hover:bg-safety-charcoal px-1">{item.name}</div>
                            <div className="text-[10px] font-black text-safety-charcoal/40 uppercase tracking-widest">{item.service}</div>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="hidden md:block text-[10px] font-black text-safety-charcoal/30 uppercase tracking-widest italic">{item.location}</div>
                         <div className={cn(
                           "px-4 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-safety-charcoal",
                           item.status === "Yeni" || item.status === "Acil" ? "bg-red-500 text-white" : "bg-safety-slate text-safety-charcoal"
                         )}>
                           {item.status}
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </div>
         </div>

         {/* Sidebar Widgets */}
         <div className="space-y-12">
            <div className="bg-safety-charcoal p-10 text-white space-y-8 border-r-8 border-safety-yellow shadow-[24px_24px_0px_rgba(18,18,18,0.2)]">
               <Activity size={48} className="text-safety-yellow" />
               <div className="space-y-4">
                  <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">GERÇEK ZAMANLI <br/> VERİ TABANI</h4>
                  <p className="text-white/50 font-bold uppercase text-[11px] leading-relaxed">
                     SİSTEM ŞU ANDA BAŞARIYLA SUPABASE BULUT SUNUCULARINA BAĞLANDI. GELEN TÜM TALEPLER ANLIK OLARAK EKRANINIZA YANSIYACAKTIR.
                  </p>
               </div>
               <div className="pt-6 border-t border-white/10">
                  <div className="text-[10px] font-black text-safety-yellow uppercase tracking-widest">BAĞLANTI: AKTİF</div>
               </div>
            </div>

            <div className="bg-white border-4 border-safety-charcoal p-8 space-y-6">
               <div className="flex items-center gap-3 text-safety-charcoal font-black italic">
                  <Zap size={20} className="fill-safety-yellow" />
                  SİSTEM SAĞLIĞI
               </div>
               <div className="space-y-4">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black text-safety-charcoal/50 uppercase tracking-widest">
                        <span>SUPABASE LATENCY</span>
                        <span>DÜŞÜK</span>
                     </div>
                     <div className="h-2 bg-safety-slate border border-safety-charcoal">
                        <div className="h-full bg-emerald-500 w-[15%]"></div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black text-safety-charcoal/50 uppercase tracking-widest">
                        <span>GÜVENLİK DUVARI</span>
                        <span>AKTİF</span>
                     </div>
                     <div className="h-2 bg-safety-slate border border-safety-charcoal">
                        <div className="h-full bg-emerald-500 w-full"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
