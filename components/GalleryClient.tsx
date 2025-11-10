"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  id: number;
  judul: string;
  tanggal: string;
  keterangan: string;
  gambar?: {
    url: string;
    formats?: any;
    alternativeText?: string;
  } | null;
}

interface GalleryClientProps {
  images: GalleryImage[];
  strapiUrl: string; // ✅ Terima dari server component
}

export function GalleryClient({ images, strapiUrl }: GalleryClientProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Fallback images jika Strapi kosong
  const fallbackImages: any[] = [
    {
      id: 1,
      judul: "Workshop Kolaborasi",
      url: "https://images.unsplash.com/photo-1758270705482-cee87ea98738?w=1080",
      keterangan: "Kegiatan workshop mahasiswa",
      tanggal: "2025-11-09",
    },
    {
      id: 2,
      judul: "Presentasi Event",
      url: "https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?w=1080",
      keterangan: "Presentasi event kampus",
      tanggal: "2025-11-09",
    },
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#EE8A34]/10 rounded-full mb-4">
            <span className="text-[#EE8A34]">Galeri</span>
          </div>
          <h2
            className="text-4xl md:text-5xl mb-6 text-[#2F563B]"
            style={{ fontWeight: 800 }}
          >
            Dokumentasi Kegiatan
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Jejak visual perjalanan Kabinet Cakrawala dalam melayani mahasiswa
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayImages.map((image) => {
            const imageUrl = image.gambar?.url
              ? `${strapiUrl}${image.gambar.url}`
              : image.url || "/placeholder.jpg";

            return (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
              >
                <Image
                  src={imageUrl}
                  alt={image.gambar?.alternativeText || image.judul}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized={!image.gambar}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F563B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-white font-semibold">{image.judul}</p>
                    <p className="text-white/80 text-sm">{image.keterangan}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-video">
            <Image
              src={selectedImage.gambar?.url
                ? `${strapiUrl}${selectedImage.gambar.url}`
                : (selectedImage as any).url || "/placeholder.jpg"
              }
              alt={selectedImage.judul}
              fill
              className="object-contain"
              unoptimized={!selectedImage.gambar}
            />
          </div>
        </div>
      )}
    </section>
  );
}
