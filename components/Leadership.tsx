'use client'

import { useState, useEffect } from 'react'
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { leadershipStorage, type LeaderItem } from '@/lib/storage'

export function Leadership() {
  const [leaders, setLeaders] = useState<LeaderItem[]>([])

  useEffect(() => {
    // Get top 4 leaders from localStorage
    const allLeaders = leadershipStorage.getAll()
    setLeaders(allLeaders.slice(0, 4))
  }, [])

  // Fallback data if no leaders in localStorage
  const fallbackLeaders = [
    {
      id: 1,
      name: "Ahmad Rizki",
      position: "Ketua DEMA",
      image: "",
      createdAt: ""
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      position: "Wakil Ketua",
      image: "",
      createdAt: ""
    },
    {
      id: 3,
      name: "Budi Santoso",
      position: "Sekretaris Umum",
      image: "",
      createdAt: ""
    },
    {
      id: 4,
      name: "Diana Putri",
      position: "Bendahara Umum",
      image: "",
      createdAt: ""
    }
  ]

  const displayLeaders = leaders.length > 0 ? leaders : fallbackLeaders
  const colors = ["#166CB2", "#2F563B", "#EE8A34", "#FDD100"]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#2F563B]/5 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#166CB2]/10 rounded-full mb-4">
            <span className="text-[#166CB2]">Pengurus</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Struktur Kepemimpinan
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Tim solid yang berdedikasi untuk mewakili dan memperjuangkan aspirasi mahasiswa
          </p>
        </div>

        {/* Leadership grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayLeaders.map((leader, index) => {
            const color = colors[index % colors.length]
            const initials = leader.name.split(' ').map(n => n[0]).join('').toUpperCase()
            
            return (
              <Card 
                key={leader.id || index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-white rounded-2xl text-center"
              >
                <Avatar className="w-24 h-24 mx-auto mb-4 border-4" style={{ borderColor: color }}>
                  <AvatarImage src={leader.image} alt={leader.name} />
                  <AvatarFallback style={{ backgroundColor: `${color}20`, color: color }}>
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl mb-2 text-[#2F563B]" style={{ fontWeight: 700 }}>
                  {leader.name}
                </h3>
                <p className="text-[#5F5E5E]">
                  {leader.position}
                </p>
              </Card>
            )
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-[#166CB2] text-[#166CB2] hover:bg-[#166CB2] hover:text-white rounded-xl px-8"
          >
            Lihat Struktur Lengkap
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
