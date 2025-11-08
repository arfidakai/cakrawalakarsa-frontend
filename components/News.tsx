import Image from "next/image";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { getNews } from "@/lib/strapi";

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface ImageData {
  id: number;
  url: string;
  alternativeText?: string;
  formats?: {
    large?: ImageFormat;
    medium?: ImageFormat;
    small?: ImageFormat;
    thumbnail?: ImageFormat;
  };
}

interface RichTextBlock {
  type: string;
  children: { type: string; text: string }[];
}

interface Berita {
  id: number;
  judul: string;
  konten: RichTextBlock[];
  ringkasan?: string;
  kategori?: string;
  gambar?: ImageData[]; // Array of images
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export async function News() {
  try {
    const response = await getNews();
    console.log("Strapi News Response:", JSON.stringify(response, null, 2));
    const beritas = response.data as Berita[];

    if (!beritas || beritas.length === 0) {
      return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-[#166CB2]/5">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#2F563B] mb-4">
              Kabar Terbaru
            </h2>
            <p className="text-[#5F5E5E]/70">Belum ada berita yang tersedia.</p>
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
            <h2
              className="text-4xl md:text-5xl mb-6 text-[#2F563B]"
              style={{ fontWeight: 800 }}
            >
              Kabar Terbaru
            </h2>
            <p className="text-lg text-[#5F5E5E] max-w-2xl mx-auto">
              Informasi terkini seputar kegiatan dan pencapaian Kabinet Cakrawala
            </p>
          </div>

          {/* News grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {beritas.slice(0, 3).map((berita) => {
              const imageObj = berita.gambar?.[0];
              const imageUrl =
                imageObj?.formats?.large?.url ||
                imageObj?.formats?.medium?.url ||
                imageObj?.url;

              const fullImageUrl = imageUrl
                ? imageUrl.startsWith("http")
                  ? imageUrl
                  : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`
                : "https://images.unsplash.com/photo-1758270705482-cee87ea98738?w=800&auto=format&fit=crop";

              const getRelativeTime = (dateString: string) => {
                const date = new Date(dateString);
                const now = new Date();
                const diffTime = Math.abs(now.getTime() - date.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if (diffDays === 1) return "Kemarin";
                if (diffDays < 7) return `${diffDays} hari yang lalu`;
                if (diffDays < 30)
                  return `${Math.floor(diffDays / 7)} minggu yang lalu`;
                return date.toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              };

              const kontenText =
                berita.konten
                  ?.map((block) =>
                    block.children?.map((child) => child.text).join(" ")
                  )
                  .join(" ")
                  ?.trim() || "";

              return (
                <Card
                  key={berita.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none rounded-2xl group cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={fullImageUrl}
                      alt={imageObj?.alternativeText || berita.judul || "Berita"}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                      unoptimized
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#2F563B]">
                        {berita.kategori || "Berita"}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-[#5F5E5E] mb-3">
                      <Clock className="w-4 h-4" />
                      <span>
                        {getRelativeTime(
                          berita.publishedAt || berita.createdAt
                        )}
                      </span>
                    </div>
                    <h3
                      className="text-xl mb-3 text-[#2F563B] line-clamp-2"
                      style={{ fontWeight: 700 }}
                    >
                      {berita.judul || "Untitled"}
                    </h3>
                    <p className="text-[#5F5E5E] line-clamp-3 mb-4">
                      {berita.ringkasan ||
                        kontenText.substring(0, 150) ||
                        "Tidak ada deskripsi"}
                    </p>
                    <button className="text-[#166CB2] hover:text-[#EE8A34] transition-colors flex items-center gap-1 group/link">
                      Baca selengkapnya
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </Card>
              );
            })}
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
  } catch (error) {
    console.error("Error fetching news:", error);

    return (
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#166CB2]/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#2F563B] mb-4">
            Kabar Terbaru
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-600 font-semibold mb-2">
              Gagal memuat berita
            </p>
            <p className="text-red-500 text-sm">
              Pastikan Strapi server berjalan di http://localhost:1337
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Error: {error instanceof Error ? error.message : "Unknown error"}
            </p>
          </div>
        </div>
      </section>
    );
  }
}
