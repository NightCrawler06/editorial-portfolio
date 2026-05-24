import Image from "next/image";
import { profile } from "@/lib/content";

function BrandMark() {
  return (
    <Image
      src="/assets/euel-brand.png"
      alt="Euel"
      width={1036}
      height={1036}
      className="h-32 w-32 object-contain"
    />
  );
}

const socials = [
  { label: "YT", href: "#" },
  { label: "FB", href: "#" },
  { label: "IG", href: "#" },
  { label: "GH", href: profile.github },
  { label: "IN", href: "#" },
  { label: "@", href: `mailto:${profile.email}` },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-4 py-6 text-[10px] uppercase tracking-[0.22em] text-muted sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="-my-8 flex items-center gap-3 font-bold text-white">
            <BrandMark />
          </a>

          <div className="flex flex-wrap gap-4 sm:gap-7">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="flex h-7 min-w-7 items-center justify-center border border-transparent text-muted transition hover:border-white hover:text-muted"
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-2 grid items-center gap-5 sm:grid-cols-[1fr_auto_1fr]">
          <span className="h-px bg-line" />
          <p className="text-center text-[10px] tracking-[0.34em] text-neutral-400">
            Copyright 2026 {profile.shortName} - All rights reserved
          </p>
          <span className="h-px bg-line" />
        </div>
      </div>
    </footer>
  );
}
