"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HiBars2, HiXMark } from "react-icons/hi2";
import { navItems, profile } from "@/lib/content";

function BrandMark({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src="/assets/euel-brand.png"
      alt="Euel"
      width={1036}
      height={1036}
      className="h-32 w-32 object-contain"
      priority={priority}
    />
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function getHref(href: string) {
    if (!href.startsWith("#")) {
      return href;
    }

    return isHome ? href : `/${href}`;
  }

  function handleSectionClick(href: string) {
    setIsOpen(false);

    if (!isHome || !href.startsWith("#")) {
      return;
    }

    const target = document.querySelector(href);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const drawer = (
    <>
      <div
        className={`fixed inset-0 z-[900] bg-black/70 transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 right-0 z-[901] flex h-dvh w-full max-w-xl flex-col border-l border-line bg-ink px-7 py-4 shadow-soft transition-[transform,visibility] duration-300 sm:px-10 ${
          isOpen
            ? "visible translate-x-0"
            : "invisible translate-x-[calc(100%+1px)]"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex h-24 items-center justify-between border-b border-line">
          <Link
            href={isHome ? "#top" : "/"}
            className="-my-6 flex items-center"
            onClick={(event) => {
              if (isHome) {
                event.preventDefault();
                handleSectionClick("#top");
                return;
              }

              setIsOpen(false);
            }}
          >
            <BrandMark />
          </Link>
          <button
            type="button"
            aria-label="Close navigation menu"
            className="flex h-11 w-11 items-center justify-center border border-line text-2xl leading-none text-white transition hover:border-white hover:bg-white hover:text-ink"
            onClick={() => setIsOpen(false)}
          >
            <HiXMark aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-9">
          <p className="mb-4 border-b border-line pb-4 text-[10px] uppercase tracking-[0.34em] text-muted">
            Navigate / 00
          </p>
          <div className="divide-y divide-line">
            {[{ label: "Home", href: "#top" }, ...navItems].map(
              (item, index) => (
                <Link
                  key={item.href}
                  href={getHref(item.href)}
                  className="group grid grid-cols-[44px_1fr_auto] items-center gap-5 py-6"
                  onClick={(event) => {
                    if (isHome && item.href.startsWith("#")) {
                      event.preventDefault();
                      handleSectionClick(item.href);
                      return;
                    }

                    setIsOpen(false);
                  }}
                >
                  <span className="text-sm uppercase tracking-[0.22em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-5xl uppercase leading-none text-neutral-400 transition group-hover:text-muted">
                    {item.label}
                  </span>
                  <span className="h-2 w-2 bg-white opacity-0 transition group-hover:opacity-100" />
                </Link>
              ),
            )}
          </div>
        </div>

        <div className="mt-auto border-t border-line pt-5">
          <p className="text-[10px] uppercase tracking-[0.34em] text-muted">
            Connect
          </p>
          <div className="mt-5 flex flex-wrap gap-4 text-xs uppercase tracking-[0.18em] text-muted">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-muted"
            >
              GitHub
            </a>
            <a href={`mailto:${profile.email}`} className="hover:text-muted">
              Email
            </a>
          </div>
        </div>
      </aside>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/92 px-5 py-0 backdrop-blur-md sm:px-10">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <Link
            href={isHome ? "#top" : "/"}
            className="-my-6 flex items-center"
            onClick={(event) => {
              if (isHome) {
                event.preventDefault();
                handleSectionClick("#top");
                return;
              }

              setIsOpen(false);
            }}
          >
            <BrandMark priority />
          </Link>
          <p className="hidden items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-muted sm:flex">
            <span className="h-px w-24 bg-line" />
            01 / 05
          </p>
          <button
            type="button"
            className="ml-auto flex h-10 w-10 items-center justify-center border border-line text-white transition hover:border-white hover:bg-white hover:text-ink"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen(true)}
          >
            <HiBars2 aria-hidden="true" className="h-6 w-6" />
          </button>
        </nav>
      </header>

      {typeof document !== "undefined" ? createPortal(drawer, document.body) : null}
    </>
  );
}
