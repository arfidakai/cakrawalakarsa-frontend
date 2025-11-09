"use client";

import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Megaphone, Users, Newspaper, Calendar, Briefcase, Heart } from "lucide-react";

// Pemetaan ikon dari nama ikon di Strapi
const iconMap: Record<string, any> = {
  Megaphone,
  Users,
  Newspaper,
  Calendar,
  Briefcase,
  Heart,
};

// === TIPE DATA ===
interface ProgramKerja {
  id: number;
  nama: string;
  deskripsi?: string;
  tanggalMulai?: string;
  tanggalSelesai?: string;
}

interface Bidang {
  id: number;
  nama: string;
  deskripsi: string;
  warna: string;
  ikon?: keyof typeof iconMap;
  program_kerjas?: ProgramKerja[];
}

interface DivisionsClientProps {
  divisions: Bidang[];
}

export function DivisionsClient({ divisions }: DivisionsClientProps) {
  const [selectedDivision, setSelectedDivision] = useState<Bidang | null>(null);
  
  // Debug log
  // console.log("Divisions received:", divisions);
  // console.log("First division program_kerjas:", divisions[0]?.program_kerjas);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#2F563B]/10 rounded-full mb-4">
            <span className="text-[#2F563B]">Divisi</span>
          </div>
          <h2
            className="text-4xl md:text-5xl mb-6 text-[#2F563B]"
            style={{ fontWeight: 800 }}
          >
            Bidang & Program Kerja
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Setiap divisi berperan penting dalam mewujudkan visi dan misi Kabinet Cakrawala
          </p>
        </div>

        {/* Divisions grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division) => {
            const Icon = division.ikon ? iconMap[division.ikon] : Megaphone;

            return (
              <Card
                key={division.id}
                onClick={() => setSelectedDivision(division)}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-white rounded-2xl group cursor-pointer"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${division.warna}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color: division.warna }} />
                </div>
                <h3
                  className="division-title text-xl mb-3 text-[#2F563B]"
                  style={{ fontWeight: 700 }}
                >
                  {division.nama}
                </h3>
                <p className="division-desc text-[#5F5E5E]">
                  {division.deskripsi}
                </p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* === MODAL === */}
      <Dialog open={!!selectedDivision} onOpenChange={() => setSelectedDivision(null)}>
        <DialogContent className="max-w-2xl rounded-2xl">
          {selectedDivision && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#2F563B]">
                  {selectedDivision.nama}
                </DialogTitle>
              </DialogHeader>
              <p className="text-[#5F5E5E] mb-6">{selectedDivision.deskripsi}</p>

              {/* Program Kerja List */}
              {selectedDivision.program_kerjas &&
              selectedDivision.program_kerjas.length > 0 ? (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-[#166CB2] mb-2">
                    Program Kerja
                  </h4>
                  {selectedDivision.program_kerjas.map((proker) => (
                    <Card
                      key={proker.id}
                      className="p-4 border-l-4 border-[#166CB2] bg-[#F9FAFB]"
                    >
                      <h5 className="font-semibold text-[#2F563B]">
                        {proker.nama}
                      </h5>
                      {proker.deskripsi && (
                        <p className="text-sm text-[#5F5E5E] mt-1">
                          {proker.deskripsi.substring(0, 120)}...
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">
                  Belum ada program kerja yang terdaftar.
                </p>
              )}

              <div className="text-right mt-6">
                <Button
                  onClick={() => setSelectedDivision(null)}
                  className="bg-[#166CB2] hover:bg-[#166CB2]/90 text-white rounded-xl"
                >
                  Tutup
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
