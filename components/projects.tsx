import Link from "next/link";
import { projects } from "@/lib/content";
import { ProjectCard } from "./project-card";
import { SectionHeading } from "./section-heading";

export function Projects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section id="projects" className="section-reveal border-b border-line px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            index="02 / 04"
            eyebrow="Projects"
            title="Selected work."
            description="A quick look at the strongest builds. The full archive lives on the projects page."
          />
          <Link
            href="/projects"
            className="mb-10 inline-flex h-11 items-center justify-center border border-line px-5 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:border-white hover:bg-white hover:text-ink"
          >
            View all projects -&gt;
          </Link>
        </div>
        <div className="grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
