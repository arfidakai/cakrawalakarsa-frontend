// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Card } from "./ui/card";
// import { Button } from "./ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getDivisions } from "@/lib/strapi";
import { DivisionsClient } from "./DivisionsClient";
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
  ikon?: string;
  program_kerjas?: ProgramKerja[];
}

export async function Divisions() {
  try {
    // Fetch data dari Strapi
    const response = await getDivisions();
    const divisions = response.data as Bidang[]; // ← Tambahkan type assertion

    // Pass data ke client component
    return <DivisionsClient divisions={divisions} />;
  } catch (error) {
    console.error("Error fetching divisions:", error);

    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2F563B] mb-4">
            Bidang & Program Kerja
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-600 font-semibold mb-2">
              Gagal memuat data divisi
            </p>
            <p className="text-red-500 text-sm">
              Pastikan Strapi server berjalan di http://localhost:1337
            </p>
          </div>
        </div>
      </section>
    );
  }
}