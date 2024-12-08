import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { extractId } from "@/services/extract-id";
import { extractHeadings } from "@/services/extract-heading";
import { PostPage } from "@/types/schema";
import Heading from "./headings";
import Code from "./code";

const Content = ({ post }: { post: PostPage }) => {
  const headings = extractHeadings(post?.markdown);
  return (
    <article className="prose prose-pre:bg-transparent prose-blockquote:bg-green-50 prose-blockquote:px-4 prose-blockquote:py-0.5 prose-blockquote:rounded-sm prose-blockquote:dark:bg-green-950 prose-blockquote:dark:text-white prose-blockquote:border-l-2 prose-blockquote:border-lime-400  text-sm md:text-base lg:text-lg mx-auto max-w-5xl mt-10 px-3 sm:px-5 text-gray-700 dark:text-gray-300">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => {
            const id = extractId(children, headings, 1);
            return <Heading children={children} id={id} level={1} />;
          },
          h2: ({ children }) => {
            const id = extractId(children, headings, 2);
            return <Heading children={children} id={id} level={2} />;
          },
          h3: ({ children }) => {
            const id = extractId(children, headings, 3);
            return <Heading children={children} id={id} level={3} />;
          },
          h4: ({ children }) => {
            const id = extractId(children, headings, 4);
            return <Heading children={children} id={id} level={4} />;
          },
          code: ({ children, className, ...props }) => {
            return (
              <Code children={children} className={className} {...props} />
            );
          },
        }}
      >
        {post?.markdown}
      </Markdown>
    </article>
  );
};

export default Content;
