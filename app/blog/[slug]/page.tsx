import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { mdxComponents } from "@/components/blog/mdx-components";
import { OnThisPage } from "@/components/blog/on-this-page";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import {
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog";
import { ogImageUrl, siteName, siteUrl } from "@/lib/seo";

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  const image = post.cover ? `${siteUrl}${post.cover}` : ogImageUrl;

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    alternates: {
      canonical: post.href,
    },
    openGraph: {
      type: "article",
      title: `${post.title} / ${siteName}`,
      description: post.description,
      url: `${siteUrl}${post.href}`,
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} / ${siteName}`,
      description: post.description,
      images: [image],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { previous, next } = getAdjacentPosts(post.slug);
  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
            },
          ],
        ],
      },
    },
  });

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <article>
        <header className="fine-grid border-b border-line px-5 py-20 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted transition hover:text-white"
            >
              <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
              Back to blog
            </Link>

            <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-center">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
                  {post.readingTime} /{" "}
                  {new Intl.DateTimeFormat("en", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(post.date))}
                </p>
                <h1 className="mt-6 font-display text-5xl uppercase leading-[0.86] text-white min-[380px]:text-6xl sm:text-7xl md:text-8xl">
                  {post.title}
                </h1>
                <div className="mt-8 h-px w-full max-w-[790px] bg-line" />
                <p className="mt-7 max-w-2xl text-base leading-7 text-neutral-200">
                  {post.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag) => (
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

              {post.cover ? (
                <div className="relative aspect-[1.91] overflow-hidden border border-line bg-black">
                  <Image
                    src={post.cover}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-contain"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <section className="px-4 py-14 sm:px-8 lg:px-16">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0">
              <OnThisPage headings={post.headings} variant="mobile" />
              <div className="blog-prose grid gap-7">{content}</div>

              <nav className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
                {previous ? (
                  <Link
                    href={previous.href}
                    className="group bg-panel p-5 transition hover:bg-white"
                  >
                    <p className="text-[10px] uppercase tracking-[0.24em] text-muted transition group-hover:text-ink">
                      Previous
                    </p>
                    <h2 className="mt-4 font-display text-3xl uppercase leading-none text-white transition group-hover:text-ink">
                      {previous.title}
                    </h2>
                  </Link>
                ) : (
                  <div className="bg-panel p-5" />
                )}

                {next ? (
                  <Link
                    href={next.href}
                    className="group bg-panel p-5 text-left transition hover:bg-white sm:text-right"
                  >
                    <p className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted transition group-hover:text-ink">
                      Next
                      <HiArrowRight aria-hidden="true" className="h-4 w-4" />
                    </p>
                    <h2 className="mt-4 font-display text-3xl uppercase leading-none text-white transition group-hover:text-ink">
                      {next.title}
                    </h2>
                  </Link>
                ) : (
                  <div className="bg-panel p-5" />
                )}
              </nav>
            </div>

            <OnThisPage headings={post.headings} variant="desktop" />
          </div>
        </section>
      </article>
      <Footer />
    </main>
  );
}
