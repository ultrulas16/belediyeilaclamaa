"use client";

import React, { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar, 
  User, 
  Phone, 
  Briefcase, 
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Zap,
  Trash2,
  RefreshCw
} from "lucide-react";
import { getLeads, updateLeadStatus, deleteLead, Lead } from "@/lib/db";
import { cn } from "@/lib/utils";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Hepsi");

  const fetchLeads = async () => {
    setLoading(true);
    const data = await getLeads();
    setLeads(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusUpdate = async (id: string, status: Lead['status']) => {
    const success = await updateLeadStatus(id, status);
    if (success) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      const success = await deleteLead(id);
      if (success) {
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(search.toLowerCase()) || 
                          l.phone.includes(search);
    const matchesStatus = statusFilter === "Hepsi" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Yeni": return "bg-red-500 text-white border-red-700";
      case "Beklemede": return "bg-amber-500 text-white border-amber-700";
      case "Arayacak": return "bg-blue-500 text-white border-blue-700";
      case "Tamamlandı": return "bg-emerald-500 text-white border-emerald-700";
      case "Acil": return "bg-black text-safety-yellow border-safety-charcoal";
      default: return "bg-slate-200 text-slate-800 border-slate-300";
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-white border-4 border-safety-charcoal p-8 shadow-[12px_12px_0px_rgba(18,18,18,1)]">
        <div className="flex items-center gap-6 w-full lg:w-auto">
           <div className="relative flex-grow lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-safety-charcoal/20" size={20} />
              <input 
                 type="text"
                 placeholder="İSİM VEYA TELEFON ARA..."
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-12 pr-4 py-4 rounded-none bg-safety-slate border-2 border-safety-charcoal outline-none focus:bg-white focus:border-safety-yellow transition-all font-black text-xs uppercase"
              />
           </div>
           <div className="flex items-center gap-2">
              <Filter size={18} className="text-safety-charcoal/40" />
              <select 
                 value={statusFilter}
                 onChange={(e) => setStatusFilter(e.target.value)}
                 className="bg-white border-2 border-safety-charcoal px-4 py-4 text-xs font-black uppercase italic outline-none transition-all hover:bg-safety-slate"
              >
                 <option>Hepsi</option>
                 <option>Yeni</option>
                 <option>Beklemede</option>
                 <option>Arayacak</option>
                 <option>Tamamlandı</option>
                 <option>Acil</option>
              </select>
           </div>
        </div>

        <button 
           onClick={fetchLeads}
           disabled={loading}
           className="btn-safety-primary !px-8 !py-4 !text-xs w-full lg:w-auto"
        >
           <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
           VERİLERİ YENİLE
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white border-4 border-safety-charcoal overflow-x-auto shadow-[12px_12px_0px_rgba(18,18,18,0.1)]">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-safety-charcoal text-white uppercase text-[10px] font-black tracking-[0.3em] italic">
              <th className="p-8 border-r border-white/10">BAŞVURU TARİHİ</th>
              <th className="p-8 border-r border-white/10">İLETİŞİM BİLGİSİ</th>
              <th className="p-8 border-r border-white/10">HİZMET TÜRE</th>
              <th className="p-8 border-r border-white/10">DURUM</th>
              <th className="p-8">İŞLEMLER</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-safety-charcoal">
            {loading ? (
              <tr>
                <td colSpan={5} className="p-20 text-center">
                   <div className="flex flex-col items-center gap-4">
                      <Zap size={48} className="text-safety-yellow animate-bounce fill-safety-yellow" />
                      <span className="text-xs font-black uppercase tracking-[0.4em] text-safety-charcoal/20">Yükleniyor...</span>
                   </div>
                </td>
              </tr>
            ) : filteredLeads.length === 0 ? (
               <tr>
                <td colSpan={5} className="p-20 text-center">
                   <div className="flex flex-col items-center gap-4 opacity-20">
                      <Users size={64} />
                      <span className="text-xs font-black uppercase tracking-[0.4em]">Bulunamadı</span>
                   </div>
                </td>
              </tr>
            ) : filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-safety-slate transition-colors group">
                <td className="p-8 border-r-2 border-safety-charcoal">
                   <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-safety-charcoal/20" />
                      <span className="text-xs font-black text-safety-charcoal uppercase italic">
                         {new Date(lead.date).toLocaleDateString('tr-TR')} <br/>
                         <span className="text-safety-charcoal/40 not-italic uppercase tracking-widest">{new Date(lead.date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                   </div>
                </td>
                <td className="p-8 border-r-2 border-safety-charcoal">
                   <div className="space-y-2">
                      <div className="font-black text-safety-charcoal uppercase italic group-hover:text-safety-yellow group-hover:bg-safety-charcoal px-1 inline-block">{lead.name}</div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-safety-charcoal/50">
                         <Phone size={14} className="text-safety-charcoal/20" />
                         {lead.phone}
                      </div>
                   </div>
                </td>
                <td className="p-8 border-r-2 border-safety-charcoal">
                   <div className="space-y-2">
                      <div className="text-xs font-black text-safety-charcoal italic uppercase">{lead.service}</div>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-safety-charcoal/50 uppercase tracking-tighter">
                         <MapPin size={14} className="text-safety-charcoal/20" />
                         {lead.location}
                      </div>
                   </div>
                </td>
                <td className="p-8 border-r-2 border-safety-charcoal">
                   <select 
                      value={lead.status}
                      onChange={(e) => handleStatusUpdate(lead.id, e.target.value as any)}
                      className={cn(
                        "w-full px-4 py-2 text-[10px] font-black uppercase tracking-widest border-2 outline-none cursor-pointer italic",
                        getStatusColor(lead.status)
                      )}
                   >
                      <option value="Yeni">YENİ</option>
                      <option value="Beklemede">BEKLEMEDE</option>
                      <option value="Arayacak">ARAYACAK</option>
                      <option value="Tamamlandı">TAMAMLANDI</option>
                      <option value="Acil">ACİL</option>
                   </select>
                </td>
                <td className="p-8">
                   <div className="flex items-center gap-4">
                      <button 
                         onClick={() => handleDelete(lead.id)}
                         className="p-3 bg-red-50 text-red-600 border-2 border-red-200 hover:bg-red-600 hover:text-white transition-all uppercase text-[10px] font-black"
                         title="KAYDI SİL"
                      >
                         <Trash2 size={18} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
