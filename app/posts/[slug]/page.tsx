import { Metadata } from "next";
import NotionService from "../../../services/notion-service";
import Image from "next/image";
import dynamic from "next/dynamic";
import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

interface Post {
  post: {
    title: string;
    cover: string;
    date: string;
    description: string;
    tags: { name: string }[];
  };
  markdown: string;
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
  };
}
const extractId = (
  children: React.ReactNode,
  headings: { level: number; text: string; id: string }[],
  level: number
): string => {
  // Extract the text content from the React children
  const text = React.Children.toArray(children)
    .map((child) =>
      typeof child === "string"
        ? child
        : (child as React.ReactElement)?.props?.children ?? ""
    )
    .filter(Boolean)
    .join("")
    .trim();

  // Sanitize and format the text to create a kebab-case ID
  const kebabCaseText = text
    .replace(/[^\w\s/.]+/g, "") // Remove special characters except slashes and periods
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/[/.]+/g, "-") // Replace slashes and periods with dashes
    .replace(/--+/g, "-") // Replace multiple dashes with a single dash
    .toLowerCase();

  // Find a matching heading by level and text, if it exists
  const matchingHeading = headings.find(
    (heading) => heading.level === level && heading.text === text
  );

  // Return the matched heading's ID or the generated kebab-case ID
  return matchingHeading?.id ?? kebabCaseText;
};

const extractHeadings = (markdown: string) => {
  const headingMatches = markdown.match(/^(#{1,6})\s+(.*)$/gm);
  if (!headingMatches) return [];

  return headingMatches.map((heading) => {
    const level = heading.indexOf(" ") - 1;
    const text = heading.replace(/^#+\s/, "").trim();

    const lower = text.replace(/[^\w]+/g, "-").toLowerCase(); // Clean <ID></ID>
    const id = lower.replace(/^-+|-+$/g, "");

    return { level, text, id };
  });
};
// Server-side rendering of post content
const PostPage = async ({ params }: PostPageProps) => {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  // Extract headings from the Markdown content
  const headings = extractHeadings(post.markdown);

  return (
    <div className="max-w-screen-2xl my-10 mx-auto flex gap-4">
      {/* Table of Contents */}

      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2">
          {post.post.title}
        </h1>
        <Image
          className="rounded-xl my-10 px-2"
          src={post.post.cover}
          alt={post.post.title}
          width={800}
          height={300}
          layout="responsive"
          style={{ objectFit: "cover" }}
          priority={true}
        />
        <div className="flex flex-col md:flex-row md:gap-4 items-center justify-center max-w-7xl ">
          <p className="mb-2 text-sm font-medium text-center">
            {new Date(post.post.date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>

          <p className="mb-2">
            {post.post.tags.map((tag, index) => (
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
          {/* Render Markdown with custom heading renderer */}
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

              // Other headings...
            }}
          >
            {post.markdown}
          </Markdown>
        </article>
      </div>
      <aside className="w-1/4 sticky top-20 h-screen hidden md:block">
        <TableOfContents markdown={post.markdown} />
      </aside>
    </div>
  );
};

export default PostPage;
