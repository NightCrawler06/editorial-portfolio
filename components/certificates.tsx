"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { certificates } from "@/lib/content";

export function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = certificates[activeIndex];
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    thumbnailRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

  function goToPrevious() {
    setActiveIndex((current) =>
      current === 0 ? certificates.length - 1 : current - 1,
    );
  }

  function goToNext() {
    setActiveIndex((current) =>
      current === certificates.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <section
      id="certificates"
      className="section-reveal overflow-hidden border-b border-line bg-ink px-4 py-20 sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
            05 / 05
          </span>
          <span className="h-px w-14 bg-line" />
          <span className="h-3 w-14 bg-[repeating-linear-gradient(115deg,#f5f5f5_0_2px,transparent_2px_6px)] opacity-80" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
              Certificates / Learning
            </p>
            <h2 className="font-display max-w-xl text-4xl uppercase leading-[0.9] text-white sm:text-6xl">
              Proof of practice.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-neutral-300">
              Selected certifications and learning milestones from technical
              courses, school work, and hands-on practice.
            </p>

            <div className="mt-7 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 lg:grid-cols-1">
              {[
                [
                  "Core credentials",
                  "Certificates that support my technical foundation.",
                ],
                [
                  "Applied learning",
                  "Proof from courses, school work, and hands-on training.",
                ],
                [
                  "Always updating",
                  "A growing archive as I keep building and learning.",
                ],
              ].map(([title, description]) => (
                <div key={title} className="bg-panel p-5">
                  <h3 className="font-display text-sm uppercase text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-neutral-400">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-center lg:mx-0 lg:max-w-none lg:items-stretch">
            <div className="mb-4 flex w-full items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(certificates.length).padStart(2, "0")}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous certificate"
                  onClick={goToPrevious}
                  className="h-10 w-10 border border-line text-xl text-white transition hover:border-white hover:bg-white hover:text-ink"
                >
                  <HiChevronLeft aria-hidden="true" className="mx-auto h-5 w-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next certificate"
                  onClick={goToNext}
                  className="h-10 w-10 border border-line text-xl text-white transition hover:border-white hover:bg-white hover:text-ink"
                >
                  <HiChevronRight aria-hidden="true" className="mx-auto h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mx-auto w-full min-w-0 max-w-[42rem] border border-line bg-black shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:max-w-3xl lg:max-w-none">
              <div className="relative h-48 overflow-hidden bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_58%)] min-[420px]:h-56 sm:h-72 lg:h-80">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(min-width: 1024px) 760px, 100vw"
                  className="object-contain object-center p-3 sm:p-5"
                  priority={activeIndex === 0}
                />
              </div>
              <div className="border-t border-line bg-panel px-4 py-4 text-center sm:px-5 sm:text-left">
                <h3 className="break-words text-xs font-bold uppercase tracking-[0.12em] text-white sm:text-sm sm:tracking-[0.16em]">
                  {active.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {active.issuer}
                </p>
              </div>
            </div>

            <div className="relative mt-3 w-full min-w-0 max-w-[42rem] overflow-hidden border border-line bg-black sm:max-w-3xl lg:max-w-none">
              <div className="flex gap-px overflow-x-auto p-px [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {certificates.map((certificate, index) => (
                  <button
                    type="button"
                    ref={(element) => {
                      thumbnailRefs.current[index] = element;
                    }}
                    key={`${certificate.title}-${certificate.image}`}
                    aria-label={`Show ${certificate.title}`}
                    onClick={() => setActiveIndex(index)}
                    className={`relative h-14 min-w-24 bg-panel transition duration-300 sm:h-16 sm:min-w-[calc((100%-5px)/6)] ${
                      activeIndex === index
                        ? "opacity-100 ring-1 ring-inset ring-white"
                        : "opacity-45 hover:opacity-85"
                    }`}
                  >
                    <Image
                      src={certificate.image}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-contain p-1 grayscale"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
