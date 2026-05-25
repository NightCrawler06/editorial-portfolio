import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type HeadingProps = ComponentPropsWithoutRef<"h2"> & {
  children?: ReactNode;
};

function Heading({
  as: Tag,
  id,
  children,
  className,
  ...props
}: HeadingProps & { as: "h2" | "h3" | "h4" }) {
  return (
    <Tag id={id} className={className} {...props}>
      {id ? (
        <a href={`#${id}`} aria-label={`Link to ${children}`} className="heading-anchor">
          #
        </a>
      ) : null}
      {children}
    </Tag>
  );
}

export const mdxComponents = {
  h2: (props: HeadingProps) => (
    <Heading
      as="h2"
      className="group scroll-mt-28 font-display text-4xl uppercase leading-none text-white"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <Heading
      as="h3"
      className="group scroll-mt-28 text-xl font-bold uppercase tracking-[0.08em] text-white"
      {...props}
    />
  ),
  h4: (props: ComponentPropsWithoutRef<"h4">) => (
    <Heading
      as="h4"
      className="group scroll-mt-28 text-base font-bold uppercase tracking-[0.08em] text-white"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-base leading-8 text-neutral-300" {...props} />
  ),
  a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
    const className =
      "text-white underline decoration-line underline-offset-4 transition hover:text-muted";

    if (href.startsWith("/")) {
      return <Link href={href} className={className} {...props} />;
    }

    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("#") ? undefined : "_blank"}
        rel={href.startsWith("#") ? undefined : "noreferrer"}
        {...props}
      />
    );
  },
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="grid gap-3 pl-5 text-neutral-300" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="grid list-decimal gap-3 pl-5 text-neutral-300" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1 leading-7 marker:text-muted" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l border-white bg-panel px-5 py-4 text-lg text-white"
      {...props}
    />
  ),
  hr: () => <hr className="border-line" />,
  img: ({ src = "", alt = "" }: ComponentPropsWithoutRef<"img">) => {
    if (typeof src !== "string") {
      return null;
    }

    return (
      <span className="relative my-8 block aspect-video overflow-hidden border border-line bg-panel">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      </span>
    );
  },
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto border border-line">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b border-line bg-panel px-4 py-3 text-left uppercase tracking-[0.12em] text-white"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-line px-4 py-3 text-neutral-300" {...props} />
  ),
};
