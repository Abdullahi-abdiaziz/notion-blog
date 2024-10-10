import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BlogPost } from "@/types/schema";
import type { PostPage } from "@/types/schema";
import { extractId } from "@/services/extract-id";
import NotionService from "@/services/notion-service";
import { extractHeadings } from "@/services/extract-heading";
import BlurFade from "@/components/ui/blur-fade";
import { geist } from "@/app/layout";

const TableOfContents = dynamic(
  () => import("../../../components/TableOfContent"),
  {
    ssr: false,
  }
);

interface PostPageProps {
  params: { slug: string };
}

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
      url: `https://kawtech.vercel.app/posts/${params.slug}`,
      siteName: "Kawtech",
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

export async function generateStaticParams() {
  const notionService = new NotionService();
  const posts = await notionService.getBlogPosts({
    next: { revalidate: 5 },
  });

  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: PostPageProps) => {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const headings = extractHeadings(post?.markdown);

  return (
    <div className="max-w-screen-2xl my-10 mx-auto flex gap-10 *:text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <BlurFade delay={0.5} inView>
          <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2 text-gray-900 dark:text-gray-100 mb-4">
            {post?.post.title}
          </h1>
          <Image
            className="rounded-xl my-10 px-2"
            src={post?.post.cover}
            alt={post?.post.title}
            width={500}
            height={100}
            layout="responsive"
            style={{ objectFit: "cover" }}
            priority={true}
          />
          <div className="flex flex-col md:flex-row md:gap-4 items-center justify-center max-w-7xl ">
            <p className="mb-2 text-sm font-medium text-center text-gray-700 dark:text-gray-300">
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
        </BlurFade>

        <BlurFade delay={0.75} inView>
          <article className="prose prose-pre:bg-transparent prose-blockquote:bg-green-50 prose-blockquote:px-4 prose-blockquote:py-0.5 prose-blockquote:rounded-sm prose-blockquote:dark:bg-green-950 prose-blockquote:dark:text-white prose-blockquote:border-l-2 prose-blockquote:border-lime-400  text-sm md:text-base lg:text-lg mx-auto max-w-5xl mt-10 px-5 text-gray-700 dark:text-gray-300">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => {
                  const id = extractId(children, headings, 1);
                  return (
                    <h1 id={id} className="text-gray-900 dark:text-gray-100">
                      {children}
                    </h1>
                  );
                },
                h2: ({ children }) => {
                  const id = extractId(children, headings, 2);
                  return (
                    <h2 id={id} className="text-gray-900 dark:text-gray-100">
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => {
                  const id = extractId(children, headings, 3);
                  return (
                    <h3 id={id} className="text-gray-900 dark:text-gray-100">
                      {children}
                    </h3>
                  );
                },
                h4: ({ children }) => {
                  const id = extractId(children, headings, 4);
                  return (
                    <h4 id={id} className="text-gray-900 dark:text-gray-100">
                      {children}
                    </h4>
                  );
                },

                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    // @ts-ignore
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      theme={xonokai}
                      style={xonokai as any}
                      className={"bg-transparent"}
                      language={match[1]}
                      {...props}
                    />
                  ) : (
                    <code
                      className={`bg-gray-400 dark:bg-gray-300 text-gray-900 dark:text-gray-800 px-2 font-mono font-bold text-xs  py-0.5 rounded-sm`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {post?.markdown}
            </Markdown>
          </article>
        </BlurFade>
      </div>
      <aside className="w-1/4 sticky top-10  h-screen hidden lg:block">
        {/* Table of contents */}
        <BlurFade delay={0.5} inView>
          <TableOfContents markdown={post?.markdown} />
        </BlurFade>
      </aside>
    </div>
  );
};

export default PostPage;
