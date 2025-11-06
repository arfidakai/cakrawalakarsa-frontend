"use client";

import { Card } from "./ui/card";
import { 
  Megaphone, 
  Users, 
  Newspaper, 
  Calendar,
  Briefcase,
  Heart
} from "lucide-react";

export function Divisions() {
  const divisions = [
    {
      icon: Megaphone,
      name: "Advokasi & Kesejahteraan",
      description: "Menyuarakan aspirasi mahasiswa",
      color: "#166CB2"
    },
    {
      icon: Users,
      name: "Pengembangan SDM",
      description: "Pelatihan dan pengembangan kompetensi",
      color: "#2F563B"
    },
    {
      icon: Newspaper,
      name: "Media & Informasi",
      description: "Publikasi dan dokumentasi kegiatan",
      color: "#EE8A34"
    },
    {
      icon: Calendar,
      name: "Kaderisasi",
      description: "Regenerasi dan pembinaan anggota",
      color: "#FDD100"
    },
    {
      icon: Briefcase,
      name: "Kewirausahaan",
      description: "Mengembangkan jiwa entrepreneur",
      color: "#166CB2"
    },
    {
      icon: Heart,
      name: "Sosial & Lingkungan",
      description: "Kepedulian sosial dan kelestarian",
      color: "#2F563B"
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#2F563B]/10 rounded-full mb-4">
            <span className="text-[#2F563B]">Divisi</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Bidang & Program Kerja
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Setiap divisi berperan penting dalam mewujudkan visi dan misi Kabinet Cakrawala
          </p>
        </div>

        {/* Divisions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, index) => {
            const Icon = division.icon;
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-white rounded-2xl group cursor-pointer"
                style={{
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#EE8A34';
                  const title = e.currentTarget.querySelector('.division-title') as HTMLElement;
                  const desc = e.currentTarget.querySelector('.division-desc') as HTMLElement;
                  if (title) title.style.color = 'white';
                  if (desc) desc.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  const title = e.currentTarget.querySelector('.division-title') as HTMLElement;
                  const desc = e.currentTarget.querySelector('.division-desc') as HTMLElement;
                  if (title) title.style.color = '#2F563B';
                  if (desc) desc.style.color = '#5F5E5E';
                }}
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300"
                  style={{ backgroundColor: `${division.color}20` }}
                >
                  <Icon className="w-8 h-8 transition-colors duration-300" style={{ color: division.color }} />
                </div>
                <h3 className="division-title text-xl mb-3 text-[#2F563B] transition-colors duration-300" style={{ fontWeight: 700 }}>
                  {division.name}
                </h3>
                <p className="division-desc text-[#5F5E5E] transition-colors duration-300">
                  {division.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
