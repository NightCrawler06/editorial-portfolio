import { About } from "@/components/about";
import { Activity } from "@/components/activity";
import { Blog } from "@/components/blog";
import { Certificates } from "@/components/certificates";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Newsletter } from "@/components/newsletter";
import { Projects } from "@/components/projects";
import { StructuredData } from "@/components/structured-data";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-ink">
      <StructuredData />
      <Navbar />
      <Hero />
      <Blog />
      <Projects />
      <About />
      <Activity />
      <Certificates />
      <Newsletter />
      <Footer />
    </main>
  );
}
