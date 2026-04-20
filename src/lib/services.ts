import { 
  Bug, 
  Zap, 
  Shield, 
  Home, 
  Building2, 
  Warehouse, 
  Activity, 
  ShieldCheck,
  Ghost,
  Rat,
  Microscope,
  Stethoscope
} from "lucide-react";

export const services = [
  {
    id: "hamambocegi",
    title: "Hamamböceği İlaçlama",
    slug: "hamambocegi-ilaclama",
    shortDescription: "Ev ve iş yerlerinizdeki hamamböceği sorununa karşı kesin ve garantili jel uygulama çözümleri.",
    description: "Hamamböcekleri taşıdıkları patojenlerle halk sağlığını doğrudan tehdit eden vektör canlılardır. Belediye ekiplerimiz, kokusuz, leke bırakmayan ve insan sağlığına dost jel yem teknikleriyle bu sorunu kaynağında kurutur.",
    icon: Bug,
    features: ["Bakanlık Onaylı Jel Uygulama", "Kokusuz ve Leke Bırakmaz", "3 Ay Koruma Garantisi"],
    riskLevel: "Yüksek",
    interventionType: "Biyolojik & Kimyasal Kontrol"
  },
  {
    id: "fare",
    title: "Fare ve Kemirgen Kontrolü",
    slug: "fare-ilaclama",
    shortDescription: "Yaşam alanlarınızı istila eden fare ve kemirgenlere karşı profesyonel istasyon ve yemleme yöntemleri.",
    description: "Kemirgenler sadece gıda stoklarına zarar vermekle kalmaz, aynı zamanda elektrik tesisatlarını tahrip ederek yangın riski oluşturur. Profesyonel kemirgen istasyonlarımızla alanınızı güven altına alıyoruz.",
    icon: Rat,
    features: ["Kilitli Güvenli İstasyonlar", "Rodentisit Uygulaması", "Fiziksel Bariyer Desteği"],
    riskLevel: "Kritik",
    interventionType: "Mekanik & Kimyasal Mücadele"
  },
  {
    id: "pire",
    title: "Pire İlaçlama",
    slug: "pire-ilaclama",
    shortDescription: "Evcil hayvan kaynaklı veya dış etkenli pire istilalarına karşı güçlü ve güvenli sıvı ilaçlama.",
    description: "Hızla çoğalan pireler, kaşıntı ve alerjik reaksiyonların yanı sıra çeşitli kan yoluyla bulaşan hastalıkların taşıyıcısıdır. Profesyonel sıvı püskürtme yöntemimizle larvaları ve erginleri yok ediyoruz.",
    icon: Zap,
    features: ["Larvasit Etkili Ürünler", "Tüm Alan Dezenfeksiyonu", "Hızlı Müdahale"],
    riskLevel: "Yüksek",
    interventionType: "Sıvı Püskürtme (ULV)"
  },
  {
    id: "apartman",
    title: "Apartman ve Site İlaçlama",
    slug: "apartman-ilaclama",
    shortDescription: "Ortak alanların, rögarların ve bodrum katlarının periyodik olarak dezenfekte edilmesi.",
    description: "Toplu yaşam alanlarında bir dairede görülen sorun kısa sürede tüm binaya yayılabilir. Periyodik apartman ilaçlaması ile rögarlar, bodrumlar ve merdiven boşlukları vektörlerden arındırılır.",
    icon: Building2,
    features: ["Rögar İlaçlaması", "Bodrum ve Kömürlük Temizliği", "Ortak Alan Sterilizasyonu"],
    riskLevel: "Orta",
    interventionType: "Entegre Zararlı Yönetimi"
  },
  {
    id: "isyeri",
    title: "İşyeri ve Ofis İlaçlama",
    slug: "isyeri-ilaclama",
    shortDescription: "Çalışma ortamlarınızda sağlığınızı tehdit eden tüm haşerelere karşı kurumsal çözümler.",
    description: "Çalışanlarınızın sağlığı ve verimliliği için ofis ortamının hijyenik olması şarttır. İş akışınızı bozmadan, mesai saatleri dışında veya haftasonu uygulamalarla yanınızdayız.",
    icon: ShieldCheck,
    features: ["Mesai Dışı Uygulama", "Kurumsal Raporlama", "Sertifikalı Temizlik"],
    riskLevel: "Orta",
    interventionType: "Noktasal Jel & Sisleme"
  },
  {
    id: "fabrika",
    title: "Fabrika ve Depo İlaçlama",
    slug: "depo-ilaclama",
    shortDescription: "Endüstriyel alanlarda gıda güvenliği ve TSE standartlarına uygun haşere mücadelesi.",
    description: "Endüstriyel tesislerde haşere varlığı ciddi ekonomik kayıplara ve denetimlerde cezai işlemlere yol açabilir. BRC, IFS ve HACCP standartlarına uygun periyodik kontrol planları.",
    icon: Warehouse,
    features: ["HACCP Uyumlu Planlar", "Endüstriyel Ekipman Parkuru", "Detaylı İzleme Raporları"],
    riskLevel: "Kritik",
    interventionType: "Endüstriyel Hijyen Protokolü"
  },
  {
    id: "tahtakurusu",
    title: "Tahtakurusu İlaçlama",
    slug: "tahtakurusu-ilaclama",
    shortDescription: "Uykunuzu bölen tahtakurusu sorununa karşı özel buharlı ve kimyasal uygulamalar.",
    description: "Tahtakuruları ile mücadele en zorlu haşere kontrol türlerinden biridir. Özel buhar sistemleri ve direnç kırma programlarımızla, yatak ve mobilyalarınızı koruyarak sorunu çözüyoruz.",
    icon: Home,
    features: ["Termal Uygulama Desteği", "Direnç Kırma Formülü", "Mobilya Koruma Protokolü"],
    riskLevel: "Kritik",
    interventionType: "Termal & Rezidüel Uygulama"
  },
  {
    id: "dezenfeksiyon",
    title: "Dezenfeksiyon Hizmetleri",
    slug: "dezenfeksiyon",
    shortDescription: "Virüs, bakteri ve mantarlara karşı ortamın tamamen sterilize edilmesi hizmeti.",
    description: "Salgın hastalık riski olan dönemlerde veya genel hijyen amacıyla ortamdaki patojen yükünü sıfırlıyoruz. Hastaneler, okullar ve ulaşım araçları için yüksek düzeyli sterilizasyon.",
    icon: Stethoscope,
    features: ["Nano-Gümüş Teknolojisi", "Airborne Dezenfeksiyon", "99.9% Bakteri Eliminasyonu"],
    riskLevel: "Yüksek",
    interventionType: "ULV Sisleme & Sterilizasyon"
  },
];

export const regions = [
  "Bursa", "İstanbul", "İzmir", "Mersin", "Adana"
];
