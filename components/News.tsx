import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Clock } from "lucide-react";

export function News() {
  const articles = [
    {
      title: "Peluncuran Program Beasiswa Cakrawala 2024",
      excerpt: "DEMA Kabinet Cakrawala meluncurkan program beasiswa untuk mahasiswa berprestasi dan kurang mampu...",
      date: "2 hari yang lalu",
      image: "https://images.unsplash.com/photo-1758270705482-cee87ea98738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MjQwOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Program"
    },
    {
      title: "Kolaborasi dengan Industri untuk Pelatihan Soft Skills",
      excerpt: "Kerjasama strategis dengan berbagai perusahaan untuk meningkatkan kompetensi mahasiswa...",
      date: "5 hari yang lalu",
      image: "https://images.unsplash.com/photo-1760351065294-b069f6bcadc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHRlYW13b3JrJTIwbWVldGluZ3xlbnwxfHx8fDE3NjI0MDk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Kerjasama"
    },
    {
      title: "Sukses Mengadakan Forum Aspirasi Mahasiswa",
      excerpt: "Ratusan mahasiswa hadir dan menyampaikan aspirasi untuk perbaikan fasilitas kampus...",
      date: "1 minggu yang lalu",
      image: "https://images.unsplash.com/photo-1708578200684-3aa944b73237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc2MjQwOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Berita"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#166CB2]/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FDD100]/20 rounded-full mb-4">
            <span className="text-[#2F563B]">Berita & Publikasi</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Kabar Terbaru
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan pencapaian Kabinet Cakrawala
          </p>
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none rounded-2xl group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#2F563B]">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-[#5F5E5E] mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <h3 className="text-xl mb-3 text-[#2F563B] line-clamp-2" style={{ fontWeight: 700 }}>
                  {article.title}
                </h3>
                <p className="text-[#5F5E5E] line-clamp-3 mb-4">
                  {article.excerpt}
                </p>
                <button className="text-[#166CB2] hover:text-[#EE8A34] transition-colors flex items-center gap-1 group/link">
                  Baca selengkapnya
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#166CB2] hover:bg-[#166CB2]/90 text-white rounded-xl px-8"
          >
            Baca Berita Selengkapnya
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
