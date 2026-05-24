import { stack } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function Blog() {
  return (
    <section id="blog" className="section-reveal border-b border-line bg-panel px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01 / 04"
          eyebrow="Stack / Notes"
          title="The tools behind the work."
          description="A compact inventory of the technologies used across the portfolio, project gallery, and current Zoho role."
        />
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((tool, index) => (
            <div
              key={tool}
              className="group bg-ink p-5 transition hover:bg-white"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted transition group-hover:text-ink">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-8 text-lg font-bold uppercase text-white transition group-hover:text-ink">
                {tool}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
