import Image from "next/image";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Activity, 
  CheckSquare, 
  AlertTriangle,
  History,
  Zap,
  Microscope,
  Phone
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { services, regions } from "@/lib/services";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppFAB from "@/components/WhatsAppFAB";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Option B: Safety Bold Hero */}
      <section className="relative pt-48 lg:pt-64 pb-24 lg:pb-40 border-b-8 border-safety-charcoal overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
              src="/images/hero-safety.png" 
              alt="Emergency Response Team" 
              fill 
              className="object-cover grayscale brightness-[0.3]"
              priority
           />
           <div className="absolute inset-0 bg-gradient-to-r from-safety-charcoal via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl space-y-12">
            <div className="flex flex-col gap-4 animate-safety-slide">
              <div className="safety-badge self-start">RESMİ MÜDAHALE DURUMU: AKTİF</div>
              <h1 className="section-title text-white">
                PROFESYONEL <br/>
                <span className="text-safety-yellow italic">BELEDİYE İLAÇLAMA</span> <br/>
                <span className="bg-safety-yellow text-safety-charcoal px-4 not-italic">KONTROL MERKEZİ.</span>
              </h1>
            </div>

            <p className="text-2xl lg:text-3xl text-white/70 font-black italic leading-tight max-w-2xl border-l-8 border-safety-yellow pl-8 animate-safety-slide [animation-delay:200ms]">
              24 saat içinde profesyonel müdahale. T.C. Sağlık Bakanlığı ve TSE standartlarında, 
              garantili haşere temizliği.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-8 animate-safety-slide [animation-delay:400ms]">
              <Link href="#iletisim" className="btn-safety-yellow text-xl">
                ACİL BAŞVURU YAP
              </Link>
              <Link href={`tel:${siteConfig.phone}`} className="btn-safety-primary !bg-white !text-safety-charcoal text-xl">
                BİLGİ HATTI: {siteConfig.phoneDisplay}
              </Link>
            </div>
          </div>
        </div>
        
        {/* Diagonal Background Accent */}
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-safety-yellow -skew-x-[20deg] translate-x-1/2 opacity-10 pointer-events-none"></div>
      </section>

      {/* Authority Grid - Safety Style */}
      <section className="bg-safety-charcoal py-24 border-b-8 border-safety-yellow">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldAlert, label: "TSE KALİTE", value: "13227 ONAYLI" },
              { icon: History, label: "MÜDAHALE", value: "24 SAATTE" },
              { icon: Activity, label: "BAŞARI ORANI", value: "%100 GARANTİ" },
              { icon: Microscope, label: "PROTOTİP", value: "BİLİMSEL ANALİZ" }
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6 group">
                <div className="text-safety-yellow group-hover:scale-125 transition-transform duration-500">
                   <stat.icon size={48} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest leading-none">{stat.label}</div>
                  <div className="text-xl font-black text-white italic uppercase tracking-tighter">{stat.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Sharp Grid */}
      <section id="hizmetlerimiz" className="py-24 lg:py-32 bg-safety-slate">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
            <div className="space-y-6">
              <div className="text-safety-charcoal font-black text-sm uppercase tracking-[0.5em]">7/24 MÜDAHALE BİRİMLERİ</div>
              <h2 className="section-title italic">PROFESYONEL <br/> <span className="text-white bg-safety-charcoal px-4 not-italic">HAŞERE KONTROLÜ</span></h2>
            </div>
            <div className="max-w-md border-l-4 border-safety-charcoal pl-8 py-4">
              <p className="text-lg font-black text-safety-charcoal/60 uppercase leading-snug">
                Biyosidal ürün takip sistemi ile anlık izlenebilir, 
                uzman mühendis kadrosu ile profesyonel sonuçlar.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {services.map((service) => (
              <Link 
                key={service.slug}
                href={`/hizmetler/${service.slug}`}
                className="safety-card group p-10 flex flex-col h-full bg-white"
              >
                <div className="mb-8 p-4 bg-safety-charcoal text-safety-yellow inline-block self-start group-hover:bg-safety-yellow group-hover:text-safety-charcoal transition-colors">
                  <service.icon size={32} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-black text-safety-charcoal mb-6 uppercase tracking-tighter leading-none italic group-hover:bg-safety-yellow transition-colors inline-block min-h-[3rem]">
                  {service.title}
                </h3>
                <p className="text-safety-charcoal/60 font-bold text-sm leading-relaxed mb-10 flex-grow uppercase">
                  {service.shortDescription}
                </p>
                <div className="mt-auto pt-6 border-t-2 border-safety-charcoal flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest">DOSYA NO: {service.id.toUpperCase()}</span>
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Section - Bold Impact */}
      <section id="kurumsal" className="py-24 lg:py-40 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <AlertTriangle size={64} className="text-safety-charcoal" />
                <h3 className="text-4xl lg:text-7xl font-black text-safety-charcoal uppercase leading-[0.85] tracking-tighter italic break-words">STANDARTDIŞINA <br/> <span className="text-white bg-safety-charcoal px-4 not-italic">İZİN VERMİYORUZ</span></h3>
                <p className="text-2xl text-safety-charcoal/70 font-black tracking-tight leading-tight uppercase">
                  Geleneksel yöntemleri terk ettik. Bilimsel veriler ışığında, 
                  vektörlerin yaşam döngüsünü kalıcı olarak sonlandırıyoruz.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  { t: "KEŞİF", d: "Alanda en ince ayrıntısına kadar biyolojik risk analizi." },
                  { t: "TESPİT", d: "Haşere türüne özel, direnç kırmayı hedefleyen formülasyon." },
                  { t: "İMHÂ", d: "En yüksek düzeyde operasyonel müdahale ve temizlik." }
                ].map((step, i) => (
                  <div key={i} className="flex gap-8 items-center group">
                    <div className="text-5xl font-black text-safety-charcoal/10 group-hover:text-safety-yellow transition-colors italic leading-none">0{i+1}</div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-black text-safety-charcoal uppercase tracking-tighter italic">{step.t}</h4>
                      <p className="text-sm font-bold text-safety-charcoal/50 uppercase">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-12 bg-safety-charcoal border-8 border-safety-yellow shadow-[24px_24px_0px_rgba(18,18,18,1)]">
              <div className="space-y-10 text-white">
                <h4 className="text-4xl font-black uppercase tracking-tighter italic">HALK SAĞLIĞI <br/> GÜVENLİK HATTI</h4>
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-safety-yellow font-black uppercase text-sm tracking-widest">
                      <Zap size={20} />
                      KRİTİK DURUM ANALİZİ
                   </div>
                   <p className="text-white/60 font-bold uppercase leading-relaxed">
                     Anlık istilalarda veya riskli durumlarda doğrudan uzman mühendis 
                     onaylı müdahale merkezimize başvurun.
                   </p>
                </div>
                <Link href={`tel:${siteConfig.phone}`} className="btn-safety-yellow w-full text-3xl italic">
                  {siteConfig.phoneDisplay}
                </Link>
                <div className="text-center font-black uppercase text-[10px] tracking-[0.3em] text-white/30">
                  7 GÜN 24 SAAT KESİNTİSİZ OPERASYON
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section - Option B Style */}
      <section id="iletisim" className="py-24 lg:py-40 bg-safety-yellow border-y-8 border-safety-charcoal">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
               <h2 className="section-title !text-safety-charcoal">
                 ACİL <br/> <span className="bg-safety-charcoal text-white px-4">DESTEK</span> <br/> TALEBİ
               </h2>
               <div className="space-y-8 border-t-4 border-safety-charcoal pt-12">
                 <div className="flex gap-6 items-start">
                    <CheckSquare size={32} className="text-safety-charcoal mt-1" />
                    <div>
                      <h4 className="text-xl font-black text-safety-charcoal uppercase italic">KAYIT NUMARASI</h4>
                      <p className="text-safety-charcoal/70 font-bold uppercase">Form iletildiği an adınıza kayıt açılır ve SMS ile bilgilendirme yapılır.</p>
                    </div>
                 </div>
                 <div className="flex gap-6 items-start">
                    <CheckSquare size={32} className="text-safety-charcoal mt-1" />
                    <div>
                      <h4 className="text-xl font-black text-safety-charcoal uppercase italic">ÖNCELİKLİ MÜDAHALE</h4>
                      <p className="text-safety-charcoal/70 font-bold uppercase">Kamu sağlığı önceliğine göre bölgenizdeki en yakın ekibimiz yönlendirilir.</p>
                    </div>
                 </div>
               </div>
            </div>

            <div className="lg:-mt-20">
               <ContactForm className="!rounded-none border-4 border-safety-charcoal shadow-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Industrial District List */}
      <section className="py-12 bg-safety-charcoal">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
             {regions.map(region => (
               <span key={region} className="text-[11px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-safety-yellow cursor-default transition-colors italic">
                 {region} MÜDAHALE BİRİMİ
               </span>
             ))}
          </div>
        </div>
      </section>

      <WhatsAppFAB />
      <Footer />
    </main>
  );
}
