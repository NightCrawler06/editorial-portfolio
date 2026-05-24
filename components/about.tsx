import Image from "next/image";
import { profile } from "@/lib/content";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="section-reveal border-b border-line bg-panel px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <div>
            <SectionHeading
              index="03 / 05"
              eyebrow="About"
              title="Student developer from the Philippines."
              description="A focused profile on my work, studies, and current developer role."
            />
            <div className="max-w-2xl space-y-5 text-sm leading-7 text-neutral-300">
              <p>
                I&apos;m {profile.name}, also known as {profile.shortName}. I&apos;m a
                self-taught developer with five years of coding experience,
                currently studying Information Technology and working part-time
                as a Zoho Developer.
              </p>
              <p>
                My work covers dashboards, APIs, QR systems, mobile screens,
                and desktop utilities, with a preference for dark interfaces
                and direct workflows.
              </p>
            </div>
            <dl className="mt-10 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
              {[
                ["Role", profile.role],
                ["Location", profile.location],
                ["Mode", "Dark mode by default"],
              ].map(([term, detail]) => (
                <div key={term} className="bg-ink p-5">
                  <dt className="text-[10px] uppercase tracking-[0.24em] text-muted">
                    {term}
                  </dt>
                  <dd className="mt-4 text-sm font-bold uppercase text-white">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[460px] overflow-hidden border border-line bg-panel">
            <Image
              src="/assets/euel.png"
              alt="Franc Emmanuel Villavicencio portrait"
              fill
              sizes="(min-width: 1024px) 360px, 100vw"
              className="object-cover object-top "
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-between border-t border-line bg-ink/80 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur">
              <span>{profile.shortName}</span>
              <span>{profile.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
