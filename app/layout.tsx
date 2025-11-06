import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEMA Kabinet Cakrawala",
  description: "Menerangi Ufuk Baru dengan Inovasi, Kolaborasi, dan Dedikasi untuk Kemajuan Mahasiswa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
