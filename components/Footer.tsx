import Link from "next/link";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2F563B] text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#FDD100] flex items-center justify-center">
                <span className="text-[#2F563B]" style={{ fontWeight: 800 }}>DC</span>
              </div>
              <div>
                <h3 className="text-xl" style={{ fontWeight: 700 }}>DEMA Kabinet</h3>
                <p className="text-[#FDD100]">Cakrawala</p>
              </div>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Menerangi ufuk baru dengan inovasi, kolaborasi, dan dedikasi 
              untuk kemajuan mahasiswa Indonesia.
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
                <span>Jl. Raya Rajapolah – Tasikmalaya No.49, Cisayong, Kabupaten Tasikmalaya, Jawa Barat</span>
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
          <p>&copy; 2024 DEMA Kabinet Cakrawala. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
