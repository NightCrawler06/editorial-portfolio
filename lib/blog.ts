import fs from "node:fs";
import path from "node:path";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";
import readingTime from "reading-time";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  cover?: string;
};

export type BlogHeading = {
  id: string;
  text: string;
  level: 2 | 3 | 4;
};

export type BlogPost = BlogFrontmatter & {
  slug: string;
  content: string;
  readingTime: string;
  headings: BlogHeading[];
  href: string;
};

export type BlogPostSummary = Omit<BlogPost, "content">;

function ensureBlogDir() {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => /\.(md|mdx)$/i.test(file))
    .sort();
}

function slugFromFile(file: string) {
  return file
    .replace(/\.(md|mdx)$/i, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTags(tags: unknown) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .map((tag) => String(tag).trim())
    .filter(Boolean);
}

function extractHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  let inCodeBlock = false;

  for (const line of content.split(/\r?\n/)) {
    if (/^```/.test(line.trim())) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const match = /^(#{2,4})\s+(.+)$/.exec(line);

    if (!match) {
      continue;
    }

    const text = match[2]
      .replace(/\{#.+\}\s*$/, "")
      .replace(/[`*_~[\]]/g, "")
      .trim();

    if (!text) {
      continue;
    }

    headings.push({
      id: slugger.slug(text),
      text,
      level: match[1].length as 2 | 3 | 4,
    });
  }

  return headings;
}

function parsePost(file: string): BlogPost {
  const filePath = path.join(BLOG_DIR, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const slug = slugFromFile(file);

  return {
    slug,
    href: `/blog/${slug}`,
    title: String(data.title ?? slug.replace(/-/g, " ")),
    date: String(data.date ?? new Date().toISOString()),
    description: String(data.description ?? ""),
    tags: normalizeTags(data.tags),
    cover: data.cover ? String(data.cover) : undefined,
    content,
    readingTime: readingTime(content).text,
    headings: extractHeadings(content),
  };
}

export function getAllPosts(): BlogPost[] {
  return ensureBlogDir()
    .map(parsePost)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime() ||
        a.title.localeCompare(b.title),
    );
}

export function getPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map((post) => {
    const summary = { ...post } as Partial<BlogPost>;
    delete summary.content;

    return summary as BlogPostSummary;
  });
}

export function getPostBySlug(slug: string): BlogPost | null {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

export function getAllTags() {
  return Array.from(new Set(getAllPosts().flatMap((post) => post.tags ?? []))).sort(
    (a, b) => a.localeCompare(b),
  );
}

export function getPostsByTag(tag: string) {
  const decodedTag = decodeURIComponent(tag).toLowerCase();

  return getAllPosts().filter((post) =>
    (post.tags ?? []).some((postTag) => postTag.toLowerCase() === decodedTag),
  );
}

export function getAdjacentPosts(slug: string) {
  const posts = getPostSummaries();
  const index = posts.findIndex((post) => post.slug === slug);

  return {
    previous: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}
