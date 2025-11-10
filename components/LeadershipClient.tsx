"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Mail, Instagram, Linkedin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface Leader {
  id: number;
  nama: string;
  posisi: string;
  initial: string;
  warna: string;
  foto?: {
    url: string;
    alternativeText?: string;
    formats?: any;
  } | null;
  bio?: string;
  email?: string;
  instagram?: string;
  linkedin?: string;
  periode?: string;
}

interface LeadershipClientProps {
  leaders: Leader[];
}

export function LeadershipClient({ leaders }: LeadershipClientProps) {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const fallbackLeaders = [
    {
      id: 1,
      nama: "Ahmad Rizki",
      posisi: "Ketua DEMA",
      initial: "AR",
      warna: "#166CB2",
      bio: "Mahasiswa semester 7 yang berpengalaman dalam organisasi kampus dan memiliki visi untuk memajukan kesejahteraan mahasiswa.",
      email: "ahmad.rizki@example.com",
      instagram: "ahmadrizki",
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      posisi: "Wakil Ketua",
      initial: "SN",
      warna: "#2F563B",
      bio: "Aktivis mahasiswa yang fokus pada pengembangan softskill dan pemberdayaan mahasiswa.",
      email: "siti.nur@example.com",
    },
    {
      id: 3,
      nama: "Budi Santoso",
      posisi: "Sekretaris Umum",
      initial: "BS",
      warna: "#EE8A34",
    },
    {
      id: 4,
      nama: "Diana Putri",
      posisi: "Bendahara Umum",
      initial: "DP",
      warna: "#FDD100",
    }
  ];

  const displayLeaders = leaders.length > 0 ? leaders : fallbackLeaders;
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayLeaders.map((leader) => (
            <Card 
              key={leader.id}
              onClick={() => setSelectedLeader(leader)}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-white rounded-2xl text-center cursor-pointer"
            >
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4" style={{ borderColor: leader.warna }}>
                {leader.foto ? (
                  <AvatarImage 
                    src={`${strapiUrl}${leader.foto.url}`}
                    alt={leader.foto.alternativeText || leader.nama}
                  />
                ) : null}
                <AvatarFallback 
                  style={{ 
                    backgroundColor: `${leader.warna}20`, 
                    color: leader.warna,
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}
                >
                  {leader.initial}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl mb-2 text-[#2F563B]" style={{ fontWeight: 700 }}>
                {leader.nama}
              </h3>
              <p className="text-[#5F5E5E] mb-2">
                {leader.posisi}
              </p>
              {leader.periode && (
                <span className="inline-block px-3 py-1 bg-[#2F563B]/10 text-[#2F563B] text-xs rounded-full">
                  Periode {leader.periode}
                </span>
              )}
            </Card>
          ))}
        </div>
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
      <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          {selectedLeader && (
            <>
              <DialogHeader className="sr-only">
                <DialogTitle>
                  {selectedLeader.nama} - {selectedLeader.posisi}
                </DialogTitle>
              </DialogHeader>
              <div className="flex items-start gap-6 mb-6">
                <Avatar className="w-32 h-32 border-4 flex-shrink-0" style={{ borderColor: selectedLeader.warna }}>
                  {selectedLeader.foto ? (
                    <AvatarImage 
                      src={`${strapiUrl}${selectedLeader.foto.url}`}
                      alt={selectedLeader.foto.alternativeText || selectedLeader.nama}
                    />
                  ) : null}
                  <AvatarFallback 
                    style={{ 
                      backgroundColor: `${selectedLeader.warna}20`, 
                      color: selectedLeader.warna,
                      fontSize: '2.5rem',
                      fontWeight: 700
                    }}
                  >
                    {selectedLeader.initial}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h2 className="text-3xl mb-2 text-[#2F563B]" style={{ fontWeight: 800 }}>
                    {selectedLeader.nama}
                  </h2>
                  <p className="text-lg text-[#5F5E5E] mb-3">
                    {selectedLeader.posisi}
                  </p>
                  {selectedLeader.periode && (
                    <span 
                      className="inline-block px-4 py-2 text-white text-sm rounded-full"
                      style={{ backgroundColor: selectedLeader.warna }}
                    >
                      Periode {selectedLeader.periode}
                    </span>
                  )}
                </div>
              </div>

              {/* Bio */}
              {selectedLeader.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#2F563B] mb-3">Tentang</h3>
                  <p className="text-[#5F5E5E] leading-relaxed">
                    {selectedLeader.bio}
                  </p>
                </div>
              )}

              {/* Kontak & Social Media */}
              {(selectedLeader.email || selectedLeader.instagram || selectedLeader.linkedin) && (
                <div>
                  <h3 className="text-lg font-semibold text-[#2F563B] mb-3">Kontak</h3>
                  <div className="space-y-3">
                    {selectedLeader.email && (
                      <a 
                        href={`mailto:${selectedLeader.email}`}
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#2F563B]/5 hover:bg-[#2F563B]/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#166CB2]/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-[#166CB2]" />
                        </div>
                        <span className="text-[#5F5E5E]">{selectedLeader.email}</span>
                      </a>
                    )}

                    {selectedLeader.instagram && (
                      <a 
                        href={selectedLeader.instagram.startsWith('http') ? selectedLeader.instagram : `https://instagram.com/${selectedLeader.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#2F563B]/5 hover:bg-[#2F563B]/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center">
                          <Instagram className="w-5 h-5 text-pink-500" />
                        </div>
                        <span className="text-[#5F5E5E]">
                          @{selectedLeader.instagram.replace(/https?:\/\/(www\.)?instagram\.com\//g, '')}
                        </span>
                      </a>
                    )}

                    {selectedLeader.linkedin && (
                      <a 
                        href={selectedLeader.linkedin.startsWith('http') ? selectedLeader.linkedin : `https://linkedin.com/in/${selectedLeader.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-[#2F563B]/5 hover:bg-[#2F563B]/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                          <Linkedin className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="text-[#5F5E5E]">LinkedIn Profile</span>
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Jika tidak ada info tambahan */}
              {!selectedLeader.bio && !selectedLeader.email && !selectedLeader.instagram && !selectedLeader.linkedin && (
                <div className="text-center py-8 text-[#5F5E5E]">
                  <p>Informasi detail belum tersedia</p>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
