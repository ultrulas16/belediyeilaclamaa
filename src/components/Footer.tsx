import Link from "next/link";
import { ShieldAlert, PhoneCall, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="relative bg-safety-charcoal text-white pt-24 pb-12 border-t-8 border-safety-yellow overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-safety-yellow -skew-x-12 translate-x-1/2 opacity-5 pointer-events-none"></div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Authority */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="bg-safety-yellow p-3 text-safety-charcoal border-2 border-safety-charcoal shadow-[4px_4px_0px_rgba(253,224,71,0.3)]">
                <ShieldAlert size={32} strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl leading-none tracking-tighter uppercase italic">
                  BELEDİYE <br/> <span className="text-safety-yellow px-1 not-italic">İLAÇLAMA</span>
                </span>
              </div>
            </Link>
            <p className="text-white/50 text-sm font-bold uppercase leading-relaxed tracking-tight">
              T.C. SAĞLIK BAKANLIĞI VE TSE-13227 KALİTE STANDARTLARINDA, 
              BİLİMSEL TABANLI OPERASYONEL MÜDAHALE MERKEZİ.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <Link key={i} href="#" className="p-3 bg-white/5 border border-white/10 hover:bg-safety-yellow hover:text-safety-charcoal transition-all">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase italic border-l-4 border-safety-yellow pl-4">HIZLI ERİŞİM</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-[0.2em] text-white/40">
              <li><Link href="/" className="hover:text-safety-yellow flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> ANA SAYFA</Link></li>
              <li><Link href="#hizmetlerimiz" className="hover:text-safety-yellow flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> MÜDAHALE ALANLARI</Link></li>
              <li><Link href="#kurumsal" className="hover:text-safety-yellow flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> OPERASYON PLANI</Link></li>
              <li><Link href="#iletisim" className="hover:text-safety-yellow flex items-center gap-2 group"><ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /> ACİL BAŞVURU</Link></li>
            </ul>
          </div>

          {/* Critical Services */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase italic border-l-4 border-safety-yellow pl-4">DOSYA TÜRLERİ</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-[0.2em] text-white/40">
              <li className="hover:text-white cursor-default">● HAMAMBÖCEĞİ ÜNİTESİ</li>
              <li className="hover:text-white cursor-default">● KEMİRGEN KONTROLÜ</li>
              <li className="hover:text-white cursor-default">● PİRE & PARAZİT HATTI</li>
              <li className="hover:text-white cursor-default">● SİTE & KAMU ALANLARI</li>
            </ul>
          </div>

          {/* Contact Center */}
          <div className="space-y-8">
            <h4 className="text-xl font-black uppercase italic border-l-4 border-safety-yellow pl-4">İLETİŞİM MERKEZİ</h4>
            <ul className="space-y-6">
              <li className="flex gap-4 items-start">
                <PhoneCall size={24} className="text-safety-yellow" />
                <div>
                   <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">MÜDAHALE HATTI</div>
                   <div className="text-xl font-black italic">{siteConfig.phoneDisplay}</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <Mail size={24} className="text-safety-yellow" />
                <div>
                   <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">DOSYA GÖNDERİMİ</div>
                   <div className="text-sm font-bold uppercase">{siteConfig.email}</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <MapPin size={24} className="text-safety-yellow" />
                <div>
                   <div className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">OPERASYON MERKEZİ</div>
                   <div className="text-sm font-bold uppercase">{siteConfig.address}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t-2 border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
            © 2026 BELEDİYE İLAÇLAMA MERKEZİ. PRO-AFET YÖNETİM SİSTEMİ.
          </div>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
            <Link href="#" className="hover:text-safety-yellow underline underline-offset-4">GİZLİLİK PROTOKOLÜ</Link>
            <Link href="#" className="hover:text-safety-yellow underline underline-offset-4">KVKK TAAHHÜTNAMESİ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
