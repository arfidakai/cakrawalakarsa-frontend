import Image from "next/image";

export function Gallery() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1758270705482-cee87ea98738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2MjQwOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Workshop Kolaborasi"
    },
    {
      url: "https://images.unsplash.com/photo-1660795308754-4c6422baf2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1wdXMlMjBldmVudCUyMHByZXNlbnRhdGlvbnxlbnwxfHx8fDE3NjI0MDk0NTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Presentasi Event"
    },
    {
      url: "https://images.unsplash.com/photo-1708578200684-3aa944b73237?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwY29tbXVuaXR5JTIwZ2F0aGVyaW5nfGVufDF8fHx8MTc2MjQwOTQ1OHww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Gathering Komunitas"
    },
    {
      url: "https://images.unsplash.com/photo-1760351065294-b069f6bcadc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMHRlYW13b3JrJTIwbWVldGluZ3xlbnwxfHx8fDE3NjI0MDk0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Teamwork Meeting"
    },
    {
      url: "https://images.unsplash.com/photo-1600903308878-bf5e554ab841?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYW1wdXMlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjIzNjAxNjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Gedung Kampus"
    },
    {
      url: "https://images.unsplash.com/photo-1663658737062-480e3cb24a51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5yaXNlJTIwaG9yaXpvbiUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjI0MDk0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "Sunrise Horizon"
    }
  ];

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
          {images.map((image, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-2xl aspect-square group cursor-pointer"
            >
              <Image
                src={image.url}
                alt={image.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2F563B]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
