import Image from "next/image";
import { HiArrowUpRight } from "react-icons/hi2";
import type { Project } from "@/lib/content";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group flex min-h-[360px] flex-col bg-ink transition hover:bg-panel hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]">
      <div className="relative h-36 overflow-hidden border-b border-line bg-panel">
        <Image
          src={project.image}
          alt={`${project.name} preview`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <span className="text-muted">Project</span>
          </div>
          <h3 className="mt-5 text-xl font-bold uppercase leading-tight text-white">
            {project.name}
          </h3>
          <p className="mt-3 text-xs leading-5 text-muted">
            {project.description}
          </p>
        </div>
        <div>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-line px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white underline decoration-line underline-offset-8 transition hover:text-muted hover:decoration-white"
          >
            Open project
            <HiArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
