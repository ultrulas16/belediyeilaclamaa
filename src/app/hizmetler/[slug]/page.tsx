import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  ShieldAlert, 
  Activity, 
  CheckSquare, 
  Clock, 
  ArrowLeft,
  Zap,
  Microscope,
  AlertTriangle,
  History
} from "lucide-react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) return { title: "Hizmet Bulunamadı" };

  return {
    title: `${service.title} | Bursa & İstanbul Geneli Hizmet`,
    description: `${service.title} konusunda uzman, TSE belgeli ekiplerimizle 7/24 hizmetinizdeyiz. Kesin çözüm ve resmi garanti için bize ulaşın.`,
    keywords: [service.title, `${service.title} bursa`, `${service.title} istanbul`, "profesyonel ilaçlama", "belediye ilaçlama"],
    openGraph: {
      title: `${service.title} - Belediye İlaçlama`,
      description: service.shortDescription,
      type: "article",
    }
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Dynamic Breadcrumb - Safety Style */}
      <div className="pt-48 pb-6 border-b-2 border-safety-charcoal">
        <div className="container-custom">
          <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-safety-charcoal/40">
            <Link href="/" className="hover:text-safety-charcoal transition-colors">ANA SAYFA</Link>
            <ChevronRight size={14} />
            <Link href="/#hizmetlerimiz" className="hover:text-safety-charcoal transition-colors">MÜDAHALE ALANLARIMIZ</Link>
            <ChevronRight size={14} />
            <span className="text-safety-charcoal bg-safety-yellow px-2">{service.title}</span>
          </div>
        </div>
      </div>

      {/* Service Hero - Option B */}
      <section className="py-20 lg:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12 animate-safety-slide">
              <div className="flex items-center gap-8">
                <div className="p-6 bg-safety-charcoal text-safety-yellow border-2 border-safety-charcoal shadow-[8px_8px_0px_rgba(18,18,18,0.2)]">
                  <Icon size={48} strokeWidth={2.5} />
                </div>
                <div className="space-y-2">
                   <div className="safety-badge">{service.interventionType}</div>
                   <h1 className="text-4xl lg:text-7xl font-black text-safety-charcoal tracking-tighter leading-none uppercase italic">
                     {service.title}
                   </h1>
                </div>
              </div>

              <p className="text-2xl lg:text-3xl text-safety-charcoal/80 font-black uppercase leading-tight border-l-8 border-safety-charcoal pl-8">
                {service.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="safety-card p-8 !shadow-[8px_8px_0px_rgba(18,18,18,1)]">
                  <div className="text-[11px] font-black text-safety-charcoal/40 uppercase tracking-widest mb-2">RİSK ANALİZİ</div>
                  <div className={cn(
                    "text-2xl font-black uppercase tracking-tighter italic",
                    service.riskLevel === "Kritik" ? "text-red-600" : "text-safety-charcoal"
                  )}>
                    {service.riskLevel} Seviye
                  </div>
                </div>
                <div className="safety-card p-8 !shadow-[8px_8px_0px_rgba(18,18,18,1)]">
                  <div className="text-[11px] font-black text-safety-charcoal/40 uppercase tracking-widest mb-2">STANDART SÜRE</div>
                  <div className="text-2xl font-black text-safety-charcoal uppercase tracking-tighter italic">MAX 60 DK</div>
                </div>
              </div>

              <div className="space-y-8 pt-12 border-t-4 border-safety-charcoal">
                <h4 className="text-xs font-black text-safety-charcoal uppercase tracking-[0.4em]">OPERASYONEL AVANTAJLAR</h4>
                <div className="grid grid-cols-1 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-safety-slate border-2 border-safety-charcoal text-sm font-black text-safety-charcoal uppercase tracking-tight italic">
                      <CheckSquare size={20} className="text-safety-charcoal" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-48">
              <ContactForm 
                title={`${service.title} DOSYASI`} 
                subtitle="Acil müdahale kaydı oluşturmak için teknik verileri iletin."
                className="!rounded-none border-4 border-safety-charcoal !shadow-[20px_20px_0px_rgba(18,18,18,1)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safety Protocol - Option B Style */}
      <section className="py-24 lg:py-40 bg-safety-charcoal text-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12 text-left">
             <div className="space-y-6">
                <History className="text-safety-yellow" size={64} />
                <h2 className="text-4xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none">
                  MÜDAHALE <br/> <span className="text-safety-charcoal bg-white px-4 not-italic">PROTOKOLÜ</span>
                </h2>
             </div>
             <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.5em] lg:max-w-xs">
                OPERASYONEL MÜKEMMELLİYET VE KESİN SONUÇ STRATEJİSİ
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { 
                step: "01", 
                title: "ALAN ANALİZİ", 
                desc: "Milimetrik doğrulukla haşere odağı ve yayılım riski tespiti yapılır." 
              },
              { 
                step: "02", 
                title: "FORMÜLASYON", 
                desc: "Popülasyon direncini kırmaya yönelik özel biyosidal karışım hazırlanır." 
              },
              { 
                step: "03", 
                title: "UYGULAMA", 
                desc: "Hedef odaklı, sıfır atık ve maksimum etki prensibiyle müdahale edilir." 
              },
              { 
                step: "04", 
                title: "TASDİK", 
                desc: "Operasyon sonrası alanın temizliği onaylanır ve dijital rapor sunulur." 
              }
            ].map((item, i) => (
              <div key={i} className="border-l-8 border-safety-yellow pl-10 space-y-6 group">
                <div className="text-6xl font-black text-white/10 group-hover:text-safety-yellow transition-colors italic leading-none">{item.step}</div>
                <div className="space-y-3">
                  <h4 className="text-2xl font-black text-white uppercase italic">{item.title}</h4>
                  <p className="text-white/50 font-bold uppercase leading-relaxed text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety/Legal Section - Bold */}
      <section className="py-24 bg-safety-yellow border-b-8 border-safety-charcoal">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="p-12 bg-safety-charcoal text-white space-y-8 shadow-[16px_16px_0px_rgba(18,18,18,0.2)]">
            <AlertTriangle size={48} className="text-safety-yellow" />
            <h3 className="text-3xl font-black uppercase italic tracking-tighter">YASAL GÜVENCE</h3>
            <p className="text-white/70 font-bold uppercase leading-relaxed">
              TÜM ÜRÜNLERİMİZ <strong>DÜNYA SAĞLIK ÖRGÜTÜ (WHO)</strong> VE <strong>SAĞLIK BAKANLIĞI</strong> 
              TARAFINDAN ONAYLANMIŞTIR. USULÜNE UYGUN OLMAYAN UYGULAMALARDAN KAÇININ, 
              RESMİ YETKİLİ EKİPLERİ TERCİH EDİN.
            </p>
          </div>

          <div className="space-y-10">
            <h3 className="text-5xl font-black text-safety-charcoal uppercase tracking-tighter leading-none italic">DENETİMLİ <br/> OPERASYON</h3>
            <div className="space-y-6">
              {[
                "BIYOSIDAL ÜRÜN TAKIP SISTEMI ENTEGRASYONU",
                "HACCP GIDA GÜVENLIĞI UYUMU",
                "TSE 13227 HIZMET YETERLILIK BELGESI",
                "ZIRAAT MÜHENDISI KONTROLÜ"
              ].map((cert, i) => (
                <div key={i} className="flex items-center gap-4 font-black text-safety-charcoal uppercase tracking-tight italic">
                  <div className="h-2 w-10 bg-safety-charcoal"></div>
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA - Impactful */}
      <section className="py-24 lg:py-40">
        <div className="container-custom text-center space-y-12">
          <h2 className="text-5xl lg:text-9xl font-black text-safety-charcoal uppercase tracking-tighter leading-none italic">
             VAKİT LÜKSÜNÜZ <br/> <span className="bg-safety-charcoal text-white px-6">YOK.</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <Link href={`tel:${siteConfig.phone}`} className="btn-safety-primary !text-2xl py-8">
               ACİL EKİP ÇAĞIR
             </Link>
             <Link href="/" className="btn-safety-yellow !text-2xl py-8">
               ANA SAYFA
             </Link>
          </div>
        </div>
      </section>

      <WhatsAppFAB />
      <Footer />
    </main>
  );
}
