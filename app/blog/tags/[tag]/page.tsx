import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi2";
import { BlogSearch } from "@/components/blog/blog-search";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { getAllTags, getPostsByTag } from "@/lib/blog";
import { ogImageUrl, siteName, siteUrl } from "@/lib/seo";

type TagPageProps = {
  params: Promise<{
    tag: string;
  }>;
};

export function generateStaticParams() {
  return getAllTags().map((tag) => ({
    tag: tag.toLowerCase(),
  }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const label = posts[0]?.tags?.find(
    (postTag) => postTag.toLowerCase() === decodeURIComponent(tag).toLowerCase(),
  );

  if (!label) {
    return {};
  }

  return {
    title: `${label} Posts`,
    description: `Blog posts tagged ${label} by Euel Villavicencio.`,
    alternates: {
      canonical: `/blog/tags/${encodeURIComponent(label.toLowerCase())}`,
    },
    openGraph: {
      title: `${label} / ${siteName}`,
      description: `Blog posts tagged ${label} by Euel Villavicencio.`,
      url: `${siteUrl}/blog/tags/${encodeURIComponent(label.toLowerCase())}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} blog tag preview`,
        },
      ],
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  const postSummaries = posts.map((post) => {
    const summary = { ...post } as Partial<typeof post>;
    delete summary.content;

    return summary as Omit<typeof post, "content">;
  });
  const label = posts[0]?.tags?.find(
    (postTag) => postTag.toLowerCase() === decodeURIComponent(tag).toLowerCase(),
  );

  if (!label) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink">
      <Navbar />
      <section className="fine-grid border-b border-line px-5 py-24 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-muted transition hover:text-white"
          >
            <HiArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to blog
          </Link>
          <p className="mt-16 text-[10px] font-semibold uppercase tracking-[0.34em] text-muted">
            Tag / {String(posts.length).padStart(2, "0")}
          </p>
          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.86] text-white min-[380px]:text-6xl sm:text-7xl md:text-8xl">
            {label}
          </h1>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <BlogSearch posts={postSummaries} activeTag={label} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
