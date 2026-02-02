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
        <div id="about"><About /></div>
        <div id="events"><Events /></div>
        <div id="leadership"><Leadership /></div>
        <Divisions />
        <div id="news"><News /></div>
        <Gallery />
        <div id="contact"><Footer /></div>
      </main>
    </div>
  );
}
