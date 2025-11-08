import { Card } from "./ui/card";
import { Lightbulb, Users, TrendingUp, Target, Compass } from "lucide-react";

export function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Inovatif",
      description: "Menciptakan solusi kreatif dan adaptif untuk menjawab tantangan mahasiswa modern serta mendukung perubahan positif di lingkungan kampus.",
      color: "#FDD100"
    },
    {
      icon: Users,
      title: "Kolaboratif",
      description: "Membangun sinergi antar mahasiswa, organisasi, dan stakeholder kampus untuk mencapai tujuan bersama.",
      color: "#166CB2"
    },
    {
      icon: TrendingUp,
      title: "Progresif",
      description: "Mendorong perubahan berkelanjutan demi peningkatan kualitas mahasiswa di bidang akademik maupun non-akademik.",
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
           DEMA Kabinet Cakrawala adalah organisasi mahasiswa yang berdedikasi untuk mewujudkan aspirasi mahasiswa melalui program-program inovatif dan berkelanjutan.
          </p>
        </div>

        {/* Visi Misi Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Visi */}
          <Card className="p-8 border-none bg-gradient-to-br from-[#2F563B] to-[#2F563B]/80 text-white rounded-2xl">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl" style={{ fontWeight: 700 }}>
                Visi
              </h3>
            </div>
            <p className="text-white/90 leading-relaxed">
              Menjadikan DEMA sebagai wadah yang inovatif dan adaptif terhadap perubahan serta menjadi agen perubahan yang menginspirasi mahasiswa dan seluruh civitas akademika.
            </p>
          </Card>

          {/* Misi */}
          <Card className="p-8 border-none bg-white rounded-2xl shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#2F563B]/10 flex items-center justify-center flex-shrink-0">
                <Compass className="w-6 h-6 text-[#2F563B]" />
              </div>
              <h3 className="text-2xl md:text-3xl text-[#2F563B]" style={{ fontWeight: 700 }}>
                Misi
              </h3>
            </div>
            <ul className="space-y-3 text-[#5F5E5E]">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#2F563B] rounded-full mt-2 flex-shrink-0"></span>
                <span>Membangun sinergi yang kuat antara DEMA dengan berbagai pihak, baik internal maupun eksternal kampus.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#2F563B] rounded-full mt-2 flex-shrink-0"></span>
                <span>Menciptakan lingkungan DEMA yang inklusif dan ramah bagi semua mahasantri.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#2F563B] rounded-full mt-2 flex-shrink-0"></span>
                <span>Meningkatkan kualitas Mahasantri dalam bidang akademik maupun non-akademik.</span>
              </li>
            </ul>
          </Card>
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
