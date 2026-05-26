import Link from "next/link";
import { navItems, profile } from "@/lib/content";
import { HiArrowRight } from "react-icons/hi2";

export function Hero() {
  return (
    <section
      id="top"
      className="fine-grid grid min-h-[calc(100svh-57px)] max-w-full overflow-hidden border-b border-line px-5 py-16 sm:content-center sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto w-full min-w-0 max-w-[1190px] overflow-hidden">
        <p className="mb-7 max-w-full text-[10px] font-semibold uppercase tracking-[0.28em] text-muted sm:tracking-[0.34em]">
          {profile.role}
        </p>
        <h1 className="font-display max-w-full text-[clamp(2.55rem,12.4vw,4rem)] uppercase leading-[0.9] text-white [overflow-wrap:anywhere] sm:max-w-5xl sm:text-7xl sm:leading-[0.86] md:text-8xl">
          {profile.headline}
        </h1>
        <div className="mt-8 h-px w-full max-w-[790px] bg-line" />
        <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-200">
          {profile.tagline}
        </p>
        <div className="mt-10 flex min-w-0 flex-col gap-3 min-[480px]:flex-row">
          <a
            href="#projects"
            className="inline-flex h-12 min-w-0 items-center justify-center border border-white bg-white px-5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-ink transition hover:-translate-y-0.5 hover:bg-transparent hover:text-muted sm:px-7 sm:tracking-[0.26em]"
          >
            Explore the work
          </a>
          <Link
            href="/blog"
            className="inline-flex h-12 min-w-0 items-center justify-center gap-2 border border-line px-5 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:-translate-y-0.5 hover:border-white hover:text-muted sm:px-7 sm:tracking-[0.26em]"
          >
            Read the blog
            <HiArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid min-w-0 overflow-hidden border border-line sm:mt-12 sm:grid-cols-2 lg:grid-cols-5">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="group grid min-h-16 grid-cols-[1fr_auto] content-center gap-3 border-b border-line px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink sm:min-h-20 sm:border-b-0 sm:border-r sm:px-5 sm:py-4 sm:last:border-r-0"
            >
              <span className="text-muted transition group-hover:text-ink">
                0{index + 1}
              </span>
              <span className="justify-self-end text-muted transition group-hover:text-ink">
                <HiArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="font-bold">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
