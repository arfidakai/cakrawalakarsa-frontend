'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { newsApi } from '@/lib/api';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
}

export function News() {
  const [articles, setArticles] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await newsApi.getAll();
        setArticles(data.slice(0, 3)); // Hanya ambil 3 berita terakhir
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hari ini';
    if (diffDays === 1) return 'Kemarin';
    if (diffDays < 7) return `${diffDays} hari yang lalu`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`;
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getExcerpt = (content: string, maxLength: number = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#166CB2]/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#5F5E5E]">Memuat berita...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#166CB2]/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FDD100]/20 rounded-full mb-4">
            <span className="text-[#2F563B]">Berita & Publikasi</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Kabar Terbaru
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan pencapaian Kabinet Cakrawala
          </p>
        </div>

        {/* News grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Card 
                key={article.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none rounded-2xl group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#166CB2] to-[#2F563B] flex items-center justify-center">
                      <span className="text-white text-4xl">📰</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#2F563B]">
                      Berita
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-[#5F5E5E] mb-3">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(article.date)}</span>
                  </div>
                  <h3 className="text-xl mb-3 text-[#2F563B] line-clamp-2" style={{ fontWeight: 700 }}>
                    {article.title}
                  </h3>
                  <p className="text-[#5F5E5E] line-clamp-3 mb-4">
                    {getExcerpt(article.content)}
                  </p>
                  <button className="text-[#166CB2] hover:text-[#EE8A34] transition-colors flex items-center gap-1 group/link">
                    Baca selengkapnya
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </button>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-[#5F5E5E]">Belum ada berita tersedia</p>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#166CB2] hover:bg-[#166CB2]/90 text-white rounded-xl px-8"
          >
            Baca Berita Selengkapnya
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
