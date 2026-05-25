"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { HiArrowRight, HiMagnifyingGlass } from "react-icons/hi2";
import type { BlogPostSummary } from "@/lib/blog";

type BlogSearchProps = {
  posts: BlogPostSummary[];
  activeTag?: string;
};

export function BlogSearch({ posts, activeTag }: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const searchable = [
        post.title,
        post.description,
        post.readingTime,
        ...(post.tags ?? []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [posts, query]);

  return (
    <div>
      <div className="mb-7 flex flex-col gap-3 border border-line bg-ink p-3 sm:flex-row sm:items-center">
        <label className="flex min-w-0 flex-1 items-center gap-3 border border-line bg-black px-4 py-3">
          <HiMagnifyingGlass
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-muted"
          />
          <span className="sr-only">Search posts</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notes, tags, topics"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </label>
        <p className="px-1 text-[10px] uppercase tracking-[0.24em] text-muted">
          {filteredPosts.length} / {posts.length} posts
        </p>
      </div>

      {activeTag ? (
        <div className="mb-7 flex items-center justify-between gap-4 border border-line bg-panel px-4 py-3">
          <p className="text-[10px] uppercase tracking-[0.24em] text-muted">
            Filtered by <span className="text-white">{activeTag}</span>
          </p>
          <Link
            href="/blog"
            className="text-[10px] font-bold uppercase tracking-[0.24em] text-white transition hover:text-muted"
          >
            Clear
          </Link>
        </div>
      ) : null}

      <div className="grid gap-px overflow-hidden border border-line bg-line">
        {filteredPosts.map((post, index) => (
          <article
            key={post.slug}
            className="group grid gap-6 bg-panel p-5 transition hover:bg-white sm:grid-cols-[120px_1fr_auto] sm:p-6"
          >
            <div className="text-[10px] uppercase tracking-[0.24em] text-muted transition group-hover:text-ink">
              <p>{String(index + 1).padStart(2, "0")}</p>
              <time dateTime={post.date}>
                {new Intl.DateTimeFormat("en", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(post.date))}
              </time>
            </div>

            <div className="min-w-0">
              <Link href={post.href} className="block">
                <h2 className="font-display text-3xl uppercase leading-none text-white transition group-hover:text-ink sm:text-4xl">
                  {post.title}
                </h2>
              </Link>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-300 transition group-hover:text-neutral-800">
                {post.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(post.tags ?? []).map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
                    className="border border-line px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-muted transition group-hover:border-neutral-300 group-hover:text-neutral-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href={post.href}
              className="inline-flex items-center gap-2 self-end text-[10px] font-bold uppercase tracking-[0.24em] text-white transition group-hover:text-ink sm:self-center"
            >
              Read
              <HiArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
