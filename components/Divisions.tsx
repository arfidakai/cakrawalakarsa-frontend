"use client";

import { useState, useEffect } from 'react'
import { Card } from "./ui/card";
import { 
  Megaphone, 
  Users, 
  Newspaper, 
  Calendar,
  Briefcase,
  Heart
} from "lucide-react";
import { divisionsStorage, type DivisionItem } from '@/lib/storage'

export function Divisions() {
  const [divisions, setDivisions] = useState<DivisionItem[]>([])

  useEffect(() => {
    // Get all divisions from localStorage
    const allDivisions = divisionsStorage.getAll()
    setDivisions(allDivisions)
  }, [])

  // Icon mapping for divisions
  const iconMap: { [key: string]: any } = {
    'advokasi': Megaphone,
    'sdm': Users,
    'media': Newspaper,
    'kaderisasi': Calendar,
    'wirausaha': Briefcase,
    'sosial': Heart,
  }

  const getIconForDivision = (name: string) => {
    const nameLower = name.toLowerCase()
    if (nameLower.includes('advokasi') || nameLower.includes('kesejahteraan')) return Megaphone
    if (nameLower.includes('sdm') || nameLower.includes('pengembangan')) return Users
    if (nameLower.includes('media') || nameLower.includes('informasi')) return Newspaper
    if (nameLower.includes('kaderisasi')) return Calendar
    if (nameLower.includes('wirausaha') || nameLower.includes('usaha')) return Briefcase
    if (nameLower.includes('sosial') || nameLower.includes('lingkungan')) return Heart
    return Briefcase // default
  }

  // Fallback data if no divisions in localStorage
  const fallbackDivisions = [
    {
      id: 1,
      name: "Advokasi & Kesejahteraan",
      description: "Menyuarakan aspirasi mahasiswa",
      members: [],
      head: "",
      createdAt: ""
    },
    {
      id: 2,
      name: "Pengembangan SDM",
      description: "Pelatihan dan pengembangan kompetensi",
      members: [],
      head: "",
      createdAt: ""
    },
    {
      id: 3,
      name: "Media & Informasi",
      description: "Publikasi dan dokumentasi kegiatan",
      members: [],
      head: "",
      createdAt: ""
    },
    {
      id: 4,
      name: "Kaderisasi",
      description: "Regenerasi dan pembinaan anggota",
      members: [],
      head: "",
      createdAt: ""
    },
    {
      id: 5,
      name: "Kewirausahaan",
      description: "Mengembangkan jiwa entrepreneur",
      members: [],
      head: "",
      createdAt: ""
    },
    {
      id: 6,
      name: "Sosial & Lingkungan",
      description: "Kepedulian sosial dan kelestarian",
      members: [],
      head: "",
      createdAt: ""
    }
  ]

  const displayDivisions = divisions.length > 0 ? divisions : fallbackDivisions
  const colors = ["#166CB2", "#2F563B", "#EE8A34", "#FDD100", "#166CB2", "#2F563B"]

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
          {displayDivisions.map((division, index) => {
            const Icon = getIconForDivision(division.name)
            const color = colors[index % colors.length]
            
            return (
              <Card 
                key={division.id || index}
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
                  <Icon className="w-8 h-8 transition-colors duration-300" style={{ color: color }} />
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
