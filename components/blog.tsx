import { stack } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function Blog() {
  return (
    <section id="blog" className="section-reveal border-b border-line bg-panel px-4 py-14 sm:px-8 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="01 / 05"
          eyebrow="Stack / Notes"
          title="The tools behind the work."
          description="A compact inventory of the technologies used across the portfolio, project gallery, and current Zoho role."
        />
        <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stack.map((tool, index) => (
            <div
              key={tool}
              className="group bg-ink p-4 transition hover:bg-white sm:p-5"
            >
              <p className="text-[10px] uppercase tracking-[0.24em] text-muted transition group-hover:text-ink">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 break-words text-sm font-bold uppercase text-white transition group-hover:text-ink sm:mt-8 sm:text-lg">
                {tool}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
