// app/post/[slug]/page.tsx
import Markdown from "react-markdown";
import NotionService from "../../../services/notion-service"; // Adjust the path if necessary
import React from "react";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";
import Image from "next/image";

interface PostPageProps {
  params: { slug: string };
}

// Fetch data using an async function
export async function generateStaticParams() {
  const notionService = new NotionService();
  const blogPosts = await notionService.getBlogPosts();

  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Use dynamic metadata fetching
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post does not exist.",
      openGraph: {
        title: "Post Not Found",
        description: "The requested post does not exist.",
        type: "article",
      },
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
          alt: "Post Cover Image",
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

const PostPage = async ({ params }: PostPageProps) => {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    // Optionally return 404 component or message if post not found
    return <div>Post not found</div>;
  }

  return (
    <>
      <div className="max-w-screen-xl my-10 mx-auto">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2">
          {post.post.title}
        </h1>
        <Image
          className="rounded-xl my-10 px-2"
          src={post.post.cover}
          alt={post.post.title}
          width={800} // Provide the original image width
          height={300} // Provide the original image height
          layout="responsive" // Automatically scale the image
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
          <Markdown remarkPlugins={[remarkGfm]}>{post.markdown}</Markdown>
        </article>
      </div>
    </>
  );
};

export default PostPage;
