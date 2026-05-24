import { navItems, profile } from "@/lib/content";

export function Hero() {
  return (
    <section
      id="top"
      className="fine-grid grid min-h-[calc(100vh-57px)] content-center border-b border-line px-5 py-20 sm:px-10 lg:px-16"
    >
      <div className="mx-auto w-full max-w-[1190px]">
        <p className="mb-7 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
          {profile.role}
        </p>
        <h1 className="font-display max-w-5xl text-6xl uppercase leading-[0.86] text-white sm:text-7xl md:text-8xl">
          {profile.headline}
        </h1>
        <div className="mt-8 h-px w-full max-w-[790px] bg-line" />
        <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-200">
          {profile.tagline}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center border border-white bg-white px-7 text-[10px] font-bold uppercase tracking-[0.26em] text-ink transition hover:-translate-y-0.5 hover:bg-transparent hover:text-muted"
          >
            Explore the work
          </a>
          <a
            href="#about"
            className="inline-flex h-12 items-center justify-center border border-line px-7 text-[10px] font-bold uppercase tracking-[0.26em] text-white transition hover:-translate-y-0.5 hover:border-white hover:text-muted"
          >
            About Euel -&gt;
          </a>
        </div>
        <div className="mt-12 grid border border-line sm:grid-cols-4">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="group grid min-h-20 grid-cols-[1fr_auto] content-center gap-3 border-b border-line px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-ink sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <span className="text-muted transition group-hover:text-ink">
                0{index + 1}
              </span>
              <span className="justify-self-end text-muted transition group-hover:text-ink">
                -&gt;
              </span>
              <span className="font-bold">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
