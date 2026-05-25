import type { Metadata } from "next";
import Link from "next/link";
import { BlogSearch } from "@/components/blog/blog-search";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getAllTags, getPostSummaries } from "@/lib/blog";
import { ogImageUrl, siteDescription, siteName, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical notes, project writeups, and learning logs from Euel Villavicencio.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  openGraph: {
    title: `Blog / ${siteName}`,
    description:
      "Read technical notes, project writeups, and learning logs from Euel Villavicencio.",
    url: `${siteUrl}/blog`,
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: `${siteName} blog preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog / ${siteName}`,
    description: siteDescription,
    images: [ogImageUrl],
  },
};

export default function BlogPage() {
  const posts = getPostSummaries();
  const tags = getAllTags();

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <section className="fine-grid border-b border-line px-5 py-14 sm:px-10 sm:py-16 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
            Writing / {String(posts.length).padStart(2, "0")}
          </p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.86] text-white min-[380px]:text-6xl sm:text-7xl md:text-8xl">
            Blog
          </h1>
          <div className="mt-8 h-px w-full max-w-[790px] bg-line" />
          <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-200">
            Notes on projects, systems, learning, and the real work behind
            building useful software.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/blog/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="border border-line px-3 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted transition hover:border-white hover:bg-white hover:text-ink"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <BlogSearch posts={posts} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
