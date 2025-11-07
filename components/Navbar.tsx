"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", href: "#" },
    { name: "Tentang", href: "#about" },
    { name: "Program", href: "#events" },
    { name: "Pengurus", href: "#leadership" },
    { name: "Berita", href: "#news" },
    { name: "Kontak", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image 
              src="/images/logo.png" 
              alt="DEMA Cakrawala Logo" 
              width={150} 
              height={200}
              className="object-contain"
            />
            {/* <span className="font-bold text-lg">DEMA Cakrawala</span> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-[#5F5E5E] hover:text-[#166CB2] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button className="bg-[#166CB2] hover:bg-[#166CB2]/90 text-white rounded-lg">
              Aspirasi Mahasiswa
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[#2F563B]"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[#5F5E5E] hover:text-[#166CB2] transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="bg-[#166CB2] hover:bg-[#166CB2]/90 text-white rounded-lg w-full">
                Aspirasi Mahasiswa
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
