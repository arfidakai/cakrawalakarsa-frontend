/**
 * This project has been converted to Next.js
 * 
 * Main entry point: /app/page.tsx
 * Layout: /app/layout.tsx
 * 
 * To run this as a Next.js application:
 * 1. Ensure you have Next.js installed: npm install next@latest react@latest react-dom@latest
 * 2. Run: npm run dev
 * 3. Open http://localhost:3000
 */

import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Events } from "./components/Events";
import { Leadership } from "./components/Leadership";
import { Divisions } from "./components/Divisions";
import { News } from "./components/News";
import { Gallery } from "./components/Gallery";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-8 bg-yellow-50 border-b-4 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-2">⚠️ Next.js Version Available</h2>
          <p className="text-gray-700">
            This project has been converted to Next.js. For the full Next.js experience, 
            check the <code className="bg-gray-200 px-2 py-1 rounded">/app</code> directory.
          </p>
        </div>
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Leadership />
        <Divisions />
        <News />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}
