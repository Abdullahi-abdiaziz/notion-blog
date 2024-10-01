import { Metadata } from "next";
import NotionService from "../../../services/notion-service";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BlogPost } from "@/types/schema";
import type { PostPage } from "@/types/schema";

// Lazy load the TableOfContents component
const TableOfContents = dynamic(
  () => import("../../../components/TableOfContent"),
  {
    ssr: false,
  }
);

interface PostPageProps {
  params: { slug: string };
}

// Fetch metadata for SEO
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post does not exist.",
    };
  }

  return {
    title: post.post.title,
    description: post.post.description,
    openGraph: {
      title: post.post.title,
      description: post.post.description,
      type: "article",
      images: [
        {
          url: post.post.cover,
          width: 1200,
          height: 630,
          alt: post.post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.post.title,
      description: post.post.description,
      images: post.post.cover,
    },
  };
}

const extractId = (
  children: React.ReactNode,
  headings: { level: number; text: string; id: string }[],
  level: number
): string => {
  const text = React.Children.toArray(children)
    .map((child) =>
      typeof child === "string"
        ? child
        : (child as React.ReactElement)?.props?.children ?? ""
    )
    .filter(Boolean)
    .join("")
    .trim();

  const kebabCaseText = text
    .replace(/[^\w\s/.]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/[/.]+/g, "-")
    .replace(/--+/g, "-")
    .toLowerCase();

  const matchingHeading = headings.find(
    (heading) => heading.level === level && heading.text === text
  );

  return matchingHeading?.id ?? kebabCaseText;
};

const extractHeadings = (markdown: string) => {
  const headingMatches = markdown?.match(/^(#{1,6})\s+(.*)$/gm);
  if (!headingMatches) return [];

  return headingMatches.map((heading) => {
    const level = heading.indexOf(" ") - 1;
    const text = heading.replace(/^#+\s/, "").trim();

    const lower = text.replace(/[^\w]+/g, "-").toLowerCase();
    const id = lower.replace(/^-+|-+$/g, "");

    return { level, text, id };
  });
};

// Pre-build paths for all posts
export async function generateStaticParams() {
  const notionService = new NotionService();
  const posts = await notionService.getBlogPosts();

  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

// Fetch post data on the server
const PostPage = async ({ params }: PostPageProps) => {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const headings = extractHeadings(post?.markdown);

  return (
    <div className="max-w-screen-2xl my-10 mx-auto flex gap-4">
      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2">
          {post?.post.title}
        </h1>
        <Image
          className="rounded-xl my-10 px-2"
          src={post?.post.cover}
          alt={post?.post.title}
          width={800}
          height={300}
          layout="responsive"
          style={{ objectFit: "cover" }}
          priority={true}
        />
        <div className="flex flex-col md:flex-row md:gap-4 items-center justify-center max-w-7xl ">
          <p className="mb-2 text-sm font-medium text-center">
            {new Date(post?.post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mb-2">
            {post?.post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block text-base bg-green-100 text-green-900 px-2 py-0.5 rounded-md mr-2"
              >
                {tag.name.toLowerCase()}
              </span>
            ))}
          </p>
        </div>

        <article className="prose text-sm md:text-base lg:text-lg mx-auto max-w-5xl mt-10 px-5">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => {
                const id = extractId(children, headings, 1);
                return <h1 id={id}>{children}</h1>;
              },
              h2: ({ children }) => {
                const id = extractId(children, headings, 2);
                return <h2 id={id}>{children}</h2>;
              },
              h3: ({ children }) => {
                const id = extractId(children, headings, 3);
                return <h3 id={id}>{children}</h3>;
              },
              h4: ({ children }) => {
                const id = extractId(children, headings, 4);
                return <h4 id={id}>{children}</h4>;
              },
              h5: ({ children }) => {
                const id = extractId(children, headings, 5);
                return <h5 id={id}>{children}</h5>;
              },
            }}
          >
            {post?.markdown}
          </Markdown>
        </article>
      </div>
      <aside className="w-1/4 sticky top-20 h-screen hidden lg:block">
        <TableOfContents markdown={post?.markdown} />
      </aside>
    </div>
  );
};

export default PostPage;
