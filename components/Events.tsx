'use client';

import { useEffect, useState } from 'react';
import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { eventsApi } from "@/lib/api";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  category: string;
  description?: string;
}

export function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await eventsApi.getAll();
        // Ambil 4 event terbaru untuk ditampilkan
        setEvents(data.slice(0, 4));
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#EE8A34]/10 rounded-full mb-4">
              <span className="text-[#EE8A34]">Kegiatan Unggulan</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
              Program & Acara Kami
            </h2>
          </div>
          <div className="text-center text-gray-500">Memuat data...</div>
        </div>
      </section>
    );
  }

  if (events.length === 0) {
    return (
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#EE8A34]/10 rounded-full mb-4">
              <span className="text-[#EE8A34]">Kegiatan Unggulan</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
              Program & Acara Kami
            </h2>
          </div>
          <div className="text-center text-gray-500">Belum ada event yang tersedia.</div>
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
            <span className="text-[#EE8A34]">Kegiatan Unggulan</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Program & Acara Kami
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
            Berbagai kegiatan yang dirancang untuk mengembangkan potensi dan memperkuat komunitas mahasiswa
          </p>
        </div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {events.map((event) => {
            // Format date
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            });

            return (
              <Card 
                key={event.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none rounded-2xl group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#FDD100] rounded-full text-sm text-[#2F563B]">
                      {event.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg mb-3 text-[#2F563B]" style={{ fontWeight: 700 }}>
                    {event.title}
                  </h3>
                  <div className="space-y-2 text-sm text-[#5F5E5E]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#166CB2]" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#166CB2]" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-[#EE8A34] hover:bg-[#EE8A34]/90 text-white rounded-xl px-8"
          >
            Lihat Semua Kegiatan
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
