import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export function Events() {
  const events = [
    {
      title: "Workshop Digital Marketing",
      date: "15 November 2024",
      location: "Aula Utama Kampus",
      image: "https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBldmVudCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjI0MDk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Workshop"
    },
    {
      title: "Seminar Kewirausahaan",
      date: "20 November 2024",
      location: "Gedung Serbaguna",
      image: "https://images.unsplash.com/photo-1758270705482-cee87ea98738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MjQwOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Seminar"
    },
    {
      title: "Bakti Sosial Lingkungan",
      date: "25 November 2024",
      location: "Desa Cihideung",
      image: "https://images.unsplash.com/photo-1708578200684-3aa944b73237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc2MjQwOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Sosial"
    },
    {
      title: "Musyawarah Besar Mahasiswa",
      date: "1 Desember 2024",
      location: "Kampus Pusat",
      image: "https://images.unsplash.com/photo-1760351065294-b069f6bcadc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHRlYW13b3JrJTIwbWVldGluZ3xlbnwxfHx8fDE3NjI0MDk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Organisasi"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#EE8A34]/10 rounded-full mb-4">
            <span className="text-[#EE8A34]">Kegiatan Unggulan</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Program & Acara Kami
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Berbagai kegiatan yang dirancang untuk mengembangkan potensi dan memperkuat komunitas mahasiswa
          </p>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {events.map((event, index) => (
            <Card 
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none rounded-2xl group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#FDD100] rounded-full text-sm text-[#2F563B]">
                    {event.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg mb-3 text-[#2F563B]" style={{ fontWeight: 700 }}>
                  {event.title}
                </h3>
                <div className="space-y-2 text-sm text-[#5F5E5E]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#166CB2]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#166CB2]" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#EE8A34] hover:bg-[#EE8A34]/90 text-white rounded-xl px-8"
          >
            Lihat Semua Kegiatan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
