import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { BlogPost } from "@/types/schema";
import type { PostPage } from "@/types/schema";
import { extractId } from "@/services/extract-id";
import NotionService from "@/services/notion-service";
import { extractHeadings } from "@/services/extract-heading";
import BlurFade from "@/components/ui/blur-fade";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import localFont from "next/font/local";
import RelatedPosts from "@/components/RelatedPosts";

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

  const { title, description, cover } = post.post;
  console.log(title, description, cover);

  return {
    title: title || "Blog Post",
    description: description || "Read this blog post for more information.",
    openGraph: {
      title: title || "Blog Post",
      description: description || "Read this blog post for more information.",
      type: "article",
      url: `https://kawtech.vercel.app/post/${params.slug}`,
      siteName: "Kawtech",
      images: cover
        ? [
            {
              url: cover,
              width: 1200,
              height: 630,
              alt: title || "Blog Post",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title || "Blog Post",
      description: description || "Read this blog post for more information.",
      images: cover || undefined,
    },
    alternates: {
      canonical: `https://kawtech.vercel.app/post/${params.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const notionService = new NotionService();
  const posts = await notionService.getBlogPosts();

  return posts.map((post: BlogPost) => ({
    slug: post.slug,
  }));
}

const PostPage = async ({ params }: PostPageProps) => {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug, {
    next: { revalidate: 5 },
  });

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
            className="rounded-xl my-10 px-2 sm:px-0 shadow-lg sm:mx-auto border-2"
            src={post?.post.cover}
            alt={post?.post.title}
            width={900}
            height={100}
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
          <article className="prose prose-pre:bg-transparent prose-blockquote:bg-green-50 prose-blockquote:px-4 prose-blockquote:py-0.5 prose-blockquote:rounded-sm prose-blockquote:dark:bg-green-950 prose-blockquote:dark:text-white prose-blockquote:border-l-2 prose-blockquote:border-lime-400  text-sm md:text-base lg:text-lg mx-auto max-w-5xl mt-10 px-3 sm:px-5 text-gray-700 dark:text-gray-300">
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
                      theme={xcode}
                      // style={github as any}
                      className={`bg-transparent`}
                      language={match[1]}
                      {...props}
                    />
                  ) : (
                    <code
                      className={`bg-rose-100 dark:bg-rose-100 text-pink-800 dark:text-pink-800 font- font-semibold text-sm m-0 rounded-sm`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                a: ({ href, children }) => {
                  const isVideo =
                    href?.includes("youtu.be") || href?.includes("vimeo.com");
                  return isVideo ? (
                    <div className="relative">
                      <HeroVideoDialog
                        className="dark:hidden block"
                        animationStyle="top-in-bottom-out"
                        videoSrc="https://youtu.be/Q1JdRUh1_98?si=3MriaWGD3Tjn6YPc"
                        thumbnailSrc={post.post.cover}
                        thumbnailAlt="Hero Video"
                      />
                    </div>
                  ) : (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                },
              }}
            >
              {post?.markdown}
            </Markdown>
          </article>
          <RelatedPosts tags={post.post.tags} title={post.post.title} />
        </BlurFade>
      </div>
      <aside className="w-1/4 sticky top-10  max-h-[100vh] hidden lg:block">
        {/* Table of contents */}
        <BlurFade delay={0.5} inView>
          <TableOfContents markdown={post?.markdown} />
        </BlurFade>
      </aside>
    </div>
  );
};

export default PostPage;
