"use client";

import { useEffect, useState } from 'react';
import { Card } from "./ui/card";
import { 
  Megaphone, 
  Users, 
  Newspaper, 
  Calendar,
  Briefcase,
  Heart,
  Folder,
  LucideIcon
} from "lucide-react";
import { divisionsApi } from '@/lib/api';

interface Division {
  id: string;
  name: string;
  description: string;
  icon: string;
  order: number;
}

const iconMap: Record<string, LucideIcon> = {
  megaphone: Megaphone,
  users: Users,
  newspaper: Newspaper,
  calendar: Calendar,
  briefcase: Briefcase,
  heart: Heart,
  folder: Folder,
};

export function Divisions() {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [loading, setLoading] = useState(true);

  const colors = ["#166CB2", "#2F563B", "#EE8A34", "#FDD100", "#166CB2", "#2F563B"];

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const data = await divisionsApi.getAll();
        setDivisions(data.slice(0, 6)); // Ambil 6 divisi teratas
      } catch (error) {
        console.error('Failed to fetch divisions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDivisions();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#5F5E5E]">Memuat divisi...</p>
        </div>
      </section>
    );
  }

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
          {divisions.length > 0 ? (
            divisions.map((division, index) => {
              const IconComponent = iconMap[division.icon?.toLowerCase()] || Folder;
              const color = colors[index % colors.length];
              return (
                <Card 
                  key={division.id}
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
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <IconComponent className="w-8 h-8 transition-colors duration-300" style={{ color: color }} />
                  </div>
                <h3 className="division-title text-xl mb-3 text-[#2F563B] transition-colors duration-300" style={{ fontWeight: 700 }}>
                  {division.name}
                </h3>
                <p className="division-desc text-[#5F5E5E] transition-colors duration-300">
                  {division.description}
                </p>
              </Card>
            );
          })
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-[#5F5E5E]">Belum ada data divisi tersedia</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
