import { About } from "@/components/about";
import { Activity } from "@/components/activity";
import { Blog } from "@/components/blog";
import { Certificates } from "@/components/certificates";
import { ContentNav } from "@/components/content-nav";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Newsletter } from "@/components/newsletter";
import { Projects } from "@/components/projects";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-ink">
      <Navbar />
      <Hero />
      <ContentNav />
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
