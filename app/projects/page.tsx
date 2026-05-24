import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi2";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";
import { siteDescription, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full project archive for Euel Villavicencio across web, mobile, desktop, and developer utilities.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `Projects / ${siteName}`,
    description:
      "Explore Euel Villavicencio's apps, dashboards, APIs, mobile experiments, and developer utilities.",
    url: "/projects",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteName} projects preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects / ${siteName}`,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <section className="fine-grid border-b border-line px-5 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted transition hover:text-muted"
          >
            <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back home
          </Link>
          <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
            Project archive / {String(projects.length).padStart(2, "0")}
          </p>
          <h1 className="mt-6 font-display text-6xl uppercase leading-[0.86] text-white sm:text-7xl md:text-8xl">
            All projects
          </h1>
          <div className="mt-8 h-px w-full max-w-[790px] bg-line" />
          <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-200">
            A complete collection of apps, dashboards, APIs, mobile experiments,
            and utility projects.
          </p>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-8 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-px overflow-hidden border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
