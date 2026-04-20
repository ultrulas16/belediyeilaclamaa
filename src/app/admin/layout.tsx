"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  ShieldAlert, 
  Menu, 
  X, 
  Zap,
  Activity,
  Bell,
  MessageCircle
} from "lucide-react";
import { logoutAction } from "../login/actions";
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/login");
  };

  const menuItems = [
    { name: "PANEL ÖZETİ", href: "/admin", icon: LayoutDashboard },
    { name: "BAŞVURU YÖNETİMİ", href: "/admin/leads", icon: Users },
    { name: "CANLI DESTEK", href: "/admin/chat", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-safety-slate flex">
      {/* Sidebar - Safety Bold */}
      <aside 
        className={cn(
          "bg-safety-charcoal text-white transition-all duration-300 border-r-8 border-safety-yellow sticky top-0 h-screen z-50 overflow-hidden",
          isSidebarOpen ? "w-80" : "w-24"
        )}
      >
        <div className="p-8 flex items-center gap-4 border-b border-white/10 mb-10 overflow-hidden">
          <div className="bg-safety-yellow p-2 text-safety-charcoal flex-shrink-0">
             <ShieldAlert size={28} strokeWidth={2.5} />
          </div>
          {isSidebarOpen && (
            <span className="font-extrabold text-xl italic tracking-tighter whitespace-nowrap">
              ADMİN <span className="text-safety-yellow not-italic">KONTROL</span>
            </span>
          )}
        </div>

        <nav className="px-4 space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-5 p-5 transition-all group overflow-hidden",
                pathname === item.href 
                  ? "bg-safety-yellow text-safety-charcoal font-black translate-x-3" 
                  : "text-white/40 hover:text-white"
              )}
            >
              <item.icon size={28} strokeWidth={pathname === item.href ? 3 : 2} className="flex-shrink-0" />
              {isSidebarOpen && <span className="text-xs uppercase tracking-[0.3em] font-black italic">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-10 left-0 w-full px-4 space-y-4">
          <button
             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
             className="w-full flex items-center gap-5 p-5 text-white/20 hover:text-white transition-colors overflow-hidden"
          >
             {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
             {isSidebarOpen && <span className="text-[10px] font-black uppercase tracking-widest italic">PANELİ DARALT</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-5 p-5 text-red-500 hover:bg-red-500 hover:text-white transition-all group overflow-hidden"
          >
            <LogOut size={28} strokeWidth={3} className="flex-shrink-0" />
            {isSidebarOpen && <span className="text-xs uppercase tracking-[0.3em] font-black italic">OTURUMU KAPAT</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-40 bg-white border-b-8 border-safety-charcoal p-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex flex-col">
              <div className="flex items-center gap-3 text-safety-charcoal/20 uppercase font-black text-[10px] tracking-[0.4em] mb-2">
                 <Activity size={16} />
                 Sistem İzleme Durumu: Aktif
              </div>
              <h2 className="text-4xl font-black text-safety-charcoal italic uppercase tracking-tighter leading-none">
                 {menuItems.find(i => i.href === pathname)?.name || "ADMİN PANELİ"}
              </h2>
           </div>

           <div className="flex items-center gap-8">
              <div className="hidden md:flex flex-col text-right">
                 <span className="text-[10px] font-black text-safety-charcoal/30 uppercase tracking-widest leading-none mb-1">OPERASYON MERKEZİ</span>
                 <span className="text-sm font-black text-safety-charcoal">BURSA GENEL MÜDÜRLÜK</span>
              </div>
              <div className="h-16 w-16 bg-safety-slate border-4 border-safety-charcoal flex items-center justify-center text-safety-charcoal relative">
                 <Bell size={28} />
                 <div className="absolute top-0 right-0 h-4 w-4 bg-red-500 border-2 border-white translate-x-1/2 -translate-y-1/2"></div>
              </div>
           </div>
        </header>

        <main className="p-8 lg:p-12 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
