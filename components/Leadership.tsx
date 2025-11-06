import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Leadership() {
  const leaders = [
    {
      name: "Ahmad Rizki",
      position: "Ketua DEMA",
      initial: "AR",
      color: "#166CB2"
    },
    {
      name: "Siti Nurhaliza",
      position: "Wakil Ketua",
      initial: "SN",
      color: "#2F563B"
    },
    {
      name: "Budi Santoso",
      position: "Sekretaris Umum",
      initial: "BS",
      color: "#EE8A34"
    },
    {
      name: "Diana Putri",
      position: "Bendahara Umum",
      initial: "DP",
      color: "#FDD100"
    }
  ];

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
          {leaders.map((leader, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-white rounded-2xl text-center"
            >
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4" style={{ borderColor: leader.color }}>
                <AvatarImage src="" />
                <AvatarFallback style={{ backgroundColor: `${leader.color}20`, color: leader.color }}>
                  {leader.initial}
                </AvatarFallback>
              </Avatar>
              <h3 className="text-xl mb-2 text-[#2F563B]" style={{ fontWeight: 700 }}>
                {leader.name}
              </h3>
              <p className="text-[#5F5E5E]">
                {leader.position}
              </p>
            </Card>
          ))}
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
