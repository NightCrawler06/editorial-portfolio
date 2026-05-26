"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, MouseEvent as ReactMouseEvent, useEffect, useRef, useState } from "react";

const FADE_DURATION = 260;

type PageTransitionProviderProps = {
  children: ReactNode;
};

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLeaving, setIsLeaving] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingHashRef = useRef<string | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const resetFrame = requestAnimationFrame(() => setIsLeaving(false));

    const scrollToTop = () => {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      root.scrollTop = 0;
      document.body.scrollTop = 0;
      root.style.scrollBehavior = previousBehavior;
    };

    const scrollToPendingHash = () => {
      if (!pendingHashRef.current || pendingHashRef.current === "#") {
        scrollToTop();
        return;
      }

      const target = document.querySelector(pendingHashRef.current);

      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
      }
    };

    scrollToTop();
    requestAnimationFrame(scrollToTop);
    const scrollTimeouts = [60, 160, 320].map((delay) =>
      setTimeout(scrollToPendingHash, delay),
    );

    return () => {
      cancelAnimationFrame(resetFrame);
      scrollTimeouts.forEach(clearTimeout);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname]);

  function handleClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const anchor = (event.target as HTMLElement).closest("a");

    if (!anchor) {
      return;
    }

    const target = anchor.getAttribute("target");
    const href = anchor.getAttribute("href");

    if (!href || target === "_blank" || anchor.hasAttribute("download")) {
      return;
    }

    const nextUrl = new URL(href, window.location.href);

    if (nextUrl.origin !== window.location.origin) {
      return;
    }

    const isSamePageHash =
      nextUrl.pathname === window.location.pathname &&
      nextUrl.search === window.location.search &&
      nextUrl.hash;

    if (isSamePageHash) {
      return;
    }

    const nextPath = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
    const currentPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

    if (nextPath === currentPath) {
      return;
    }

    event.preventDefault();
    pendingHashRef.current = nextUrl.hash || null;
    setIsLeaving(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      router.push(nextPath, { scroll: false });
    }, FADE_DURATION);
  }

  return (
    <div
      className={`route-transition-shell ${isLeaving ? "route-transition-leave" : ""}`}
      onClickCapture={handleClick}
    >
      {children}
    </div>
  );
}
