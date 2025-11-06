import { Card } from "./ui/card";
import { Lightbulb, Users, TrendingUp } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Inovatif",
      description: "Menciptakan solusi kreatif untuk menghadapi tantangan mahasiswa modern",
      color: "#FDD100"
    },
    {
      icon: Users,
      title: "Kolaboratif",
      description: "Membangun sinergi antar mahasiswa, organisasi, dan stakeholder kampus",
      color: "#166CB2"
    },
    {
      icon: TrendingUp,
      title: "Progresif",
      description: "Berkomitmen pada perubahan positif dan pembangunan berkelanjutan",
      color: "#EE8A34"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-[#2F563B]/5">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#2F563B]/10 rounded-full mb-4">
            <span className="text-[#2F563B]">Tentang Kami</span>
          </div>
          <h2 className="text-4xl md:text-5xl mb-6 text-[#2F563B]" style={{ fontWeight: 800 }}>
            Kabinet Cakrawala
          </h2>
          <p className="text-lg text-[#5F5E5E] max-w-3xl mx-auto">
            DEMA Kabinet Cakrawala adalah organisasi mahasiswa yang berdedikasi untuk 
            mewujudkan aspirasi mahasiswa melalui program-program inovatif dan berkelanjutan. 
            Kami berkomitmen untuk menjadi jembatan antara mahasiswa dengan pihak kampus, 
            menciptakan lingkungan akademik yang kondusif dan inspiratif.
          </p>
        </div>

        {/* Value cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card 
                key={index}
                className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-white rounded-2xl"
              >
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${value.color}20` }}
                >
                  <Icon className="w-8 h-8" style={{ color: value.color }} />
                </div>
                <h3 className="text-2xl mb-4 text-[#2F563B]" style={{ fontWeight: 700 }}>
                  {value.title}
                </h3>
                <p className="text-[#5F5E5E]">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
