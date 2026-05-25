"use client";

import { useEffect, useState } from "react";
import type { BlogHeading } from "@/lib/blog";

type OnThisPageProps = {
  headings: BlogHeading[];
  variant?: "mobile" | "desktop" | "both";
};

export function OnThisPage({ headings, variant = "both" }: OnThisPageProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-18% 0px -70% 0px",
        threshold: [0, 1],
      },
    );

    for (const heading of headings) {
      const element = document.getElementById(heading.id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) {
    return null;
  }

  const list = (
    <nav aria-label="On this page" className="grid gap-2">
      {headings.map((heading) => (
        <a
          key={heading.id}
          href={`#${heading.id}`}
          className={`border-l px-3 py-1.5 text-xs leading-5 transition ${
            activeId === heading.id
              ? "border-white text-white"
              : "border-line text-muted hover:border-muted hover:text-white"
          } ${heading.level === 3 ? "ml-3" : ""} ${
            heading.level === 4 ? "ml-6" : ""
          }`}
        >
          {heading.text}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {variant === "desktop" || variant === "both" ? (
        <aside className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto border border-line bg-panel p-5 lg:block">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
            On this page
          </p>
          {list}
        </aside>
      ) : null}

      {variant === "mobile" || variant === "both" ? (
        <details className="group sticky top-20 z-20 mb-8 border border-line bg-panel/95 p-4 backdrop-blur lg:hidden">
          <summary className="cursor-pointer list-none text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            On this page
          </summary>
          <div className="mt-4">{list}</div>
        </details>
      ) : null}
    </>
  );
}
