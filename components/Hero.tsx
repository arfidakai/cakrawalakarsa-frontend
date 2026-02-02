"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with sunrise gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FDD100]/20 via-[#EE8A34]/10 to-white"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1663658737062-480e3cb24a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwaG9yaXpvbiUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjI0MDk0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[#FDD100]/20 blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[#166CB2]/20 blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-4 py-2 bg-[#FDD100] rounded-full">
          <span className="text-[#2F563B]">Periode 2025/2026</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
          DEMA Kabinet
          <br />
          <span className="text-[#166CB2]">Cakrawala</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-[#5F5E5E] max-w-2xl mx-auto">
          Dema yang Adaptif, Inklusif, Bersinergi untuk Inovatif dan Transformasi Mahasantri
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection("#about")}
            className="bg-[#166CB2] hover:bg-[#166CB2]/90 text-white rounded-xl px-8 py-6 shadow-lg"
          >
            Kenali Kami
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#events")}
            className="border-2 border-[#2F563B] text-[#2F563B] hover:bg-[#2F563B] hover:text-white rounded-xl px-8 py-6"
          >
            Lihat Program Kerja
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#5F5E5E]/30 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1.5 h-1.5 bg-[#166CB2] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
