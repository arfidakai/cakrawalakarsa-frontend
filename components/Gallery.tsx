'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { galleryApi } from '@/lib/api';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

export function Gallery() {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const data = await galleryApi.getAll();
        setImages(data.slice(0, 6)); // Ambil 6 gambar terakhir
      } catch (error) {
        console.error('Failed to fetch gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#5F5E5E]">Memuat galeri...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#EE8A34]/10 rounded-full mb-4">
            <span className="text-[#EE8A34]">Galeri</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Dokumentasi Kegiatan
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Jejak visual perjalanan Kabinet Cakrawala dalam melayani mahasiswa
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.length > 0 ? (
            images.map((image) => (
              <div 
                key={image.id}
                className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
              >
                {image.image ? (
                  <Image
                    src={image.image}
                    alt={image.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#166CB2] to-[#2F563B] flex items-center justify-center">
                    <span className="text-white text-4xl">🖼️</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F563B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-medium">{image.title}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-[#5F5E5E]">Belum ada foto tersedia</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
