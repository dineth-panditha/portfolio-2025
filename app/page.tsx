import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience"; // MUST BE IMPORTED
import Works from "@/components/sections/works";
import Contact from "@/components/sections/contact";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        
        {/* The Experience Component (Contains both Work & Education) */}
        <Experience />
        
        <Works />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}