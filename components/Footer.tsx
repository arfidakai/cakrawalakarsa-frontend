import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative text-white py-16 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#166CB2] via-[#1a7ba8] to-[#2F563B]"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FDD100]/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                          <Image 
                            src="/images/logo.png" 
                            alt="DEMA Cakrawala Logo" 
                            width={250} 
                            height={200}
                            className="object-contain"
                          />
                        </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Dema yang Adaptif, Inklusif, Bersinergi untuk Inovatif dan Transformasi Mahasantri
            </p>
            
            {/* Social media */}
            <div className="flex gap-4">
              <Link 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#166CB2] transition-colors flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#166CB2] transition-colors flex items-center justify-center"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#166CB2] transition-colors flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 700 }}>Tautan Cepat</h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="#" className="hover:text-[#FDD100] transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FDD100] transition-colors">Program Kerja</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FDD100] transition-colors">Struktur Organisasi</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FDD100] transition-colors">Berita</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#FDD100] transition-colors">Galeri</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4" style={{ fontWeight: 700 }}>Kontak</h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FDD100]" />
                <span>Pagendingan, Jatihurip, Cisayong, Tasikmalaya, Jawa Barat 46153</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#FDD100]" />
                <a href="mailto:dema@cakrawala.ac.id" className="hover:text-[#FDD100] transition-colors">
                  dema@cakrawala.ac.id
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#FDD100]" />
                <a href="tel:+62123456789" className="hover:text-[#FDD100] transition-colors">
                  +62 123 456 789
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-center text-white/60">
          <p>&copy; 2025 DEMA Kabinet Cakrawala. All rights reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  );
}
