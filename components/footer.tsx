import Image from "next/image";
import type { IconType } from "react-icons";
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { profile, socialLinks } from "@/lib/content";

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

const icons: Record<string, IconType> = {
  LinkedIn: FaLinkedinIn,
  Instagram: FaInstagram,
  GitHub: FaGithub,
  Facebook: FaFacebookF,
};

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink px-4 py-6 text-[10px] uppercase tracking-[0.22em] text-muted sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#" className="-my-8 flex items-center gap-3 font-bold text-white">
            <BrandMark />
          </a>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {socialLinks.map((social) => {
              const Icon = icons[social.label];

              return (
              <a
                key={social.label}
                href={social.href}
                className="group flex h-9 w-9 items-center justify-center border border-line text-muted transition hover:border-white hover:bg-white hover:text-ink"
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
              >
                <Icon className="h-4 w-4 transition group-hover:scale-110" />
              </a>
              );
            })}
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
