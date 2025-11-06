import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Events } from "../components/Events";
import { Leadership } from "../components/Leadership";
import { Divisions } from "../components/Divisions";
import { News } from "../components/News";
import { Gallery } from "../components/Gallery";
import { Footer } from "../components/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
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
