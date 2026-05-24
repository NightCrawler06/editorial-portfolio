import Image from "next/image";
import { experience } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function Activity() {
  return (
    <section id="experience" className="section-reveal border-b border-line px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04 / 05"
          eyebrow="Experience / Education"
          title="Work, school, and technical foundation."
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr]">
          <div className="border border-line bg-panel p-6">
            <div className="mb-6 flex items-center gap-4 border-b border-line pb-6">
              <div className="flex h-14 w-14 items-center justify-center bg-white p-2">
                <Image
                  src="/assets/companyLogo.png"
                  alt="The CRM Carpenters logo"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
                  Current work
                </p>
                <h3 className="mt-2 text-xl font-bold uppercase text-white">
                  Zoho Developer
                </h3>
              </div>
            </div>
            <p className="text-sm leading-6 text-neutral-300">
              Part-time development work with The CRM Carpenters, supporting
              CRM systems, automations, and business workflows.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden border border-line bg-line">
            {experience.map((item) => (
              <article
                key={`${item.title}-${item.date}`}
                className="grid gap-4 bg-ink p-5 transition hover:bg-panel sm:grid-cols-[130px_1fr]"
              >
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted">
                    {item.type}
                  </p>
                  <p className="mt-3 text-xs text-neutral-400">{item.date}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold uppercase leading-tight text-white">
                    {item.title}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex text-xs text-muted underline decoration-line underline-offset-4 transition hover:text-muted"
                    >
                      {item.place}
                    </a>
                  ) : (
                    <p className="mt-1 text-xs text-muted">{item.place}</p>
                  )}
                  <p className="mt-3 text-xs leading-5 text-neutral-400">
                    {item.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
