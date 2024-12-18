import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import dynamic from "next/dynamic";

import { BlogPost } from "@/types/schema";
import type { PostPage, Tag } from "@/types/schema";
import NotionService from "@/services/notion-service";
import BlurFade from "@/components/ui/blur-fade";
import RelatedPosts from "@/components/RelatedPosts";
import Article from "@/components/article/content";

const TableOfContents = dynamic(
  () => import("../../../components/TableOfContent"),
  {
    ssr: false,
  }
);

interface PostPageProps {
  params: { slug: string };
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

  const { title, cover, date, tags } = post.post;

  return (
    <div className="max-w-screen-2xl my-10 mx-auto flex gap-10 *:text-gray-900 dark:text-gray-100">
      {/* Main Content */}
      <div className="w-full md:w-3/4">
        <BlurFade delay={0.5} inView>
          <PostTitle title={title} />
          <PostCover cover={cover} alt={title} />
          <PostMetaData date={date} tags={tags} />
          <Article post={post} />
        </BlurFade>

        <BlurFade delay={0.75} inView>
          <RelatedPosts tags={tags} title={title} />
        </BlurFade>
      </div>
      <aside className="w-1/4 sticky top-10  max-h-[50vh] hidden lg:block">
        <BlurFade delay={0.5} inView>
          <TableOfContents markdown={post?.markdown} />
        </BlurFade>
      </aside>
    </div>
  );
};

const PostTitle = ({ title }: { title: string }) => {
  return (
    <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2 text-gray-900 dark:text-gray-100 mb-4 mt-8">
      {title}
    </h1>
  );
};

const PostCover = ({ cover, alt }: { cover: string; alt: string }) => {
  return (
    <Image
      className="rounded-xl my-10 px-2 sm:px-0 shadow-lg sm:mx-auto border-2"
      src={cover}
      alt={alt}
      width={900}
      height={100}
      style={{ objectFit: "cover" }}
      priority={true}
    />
  );
};

const PostMetaData = ({ date, tags }: { date: string; tags: Tag[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:gap-4 items-center justify-center max-w-7xl">
      <CreatedAt date={date} />
      <Tags tags={tags} />
    </div>
  );
};

const CreatedAt = ({ date }: { date: string }) => {
  return (
    <p className="mb-2 text-sm font-medium text-center text-gray-700 dark:text-gray-300">
      {new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </p>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <p className="mb-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="inline-block text-base bg-green-100 text-green-900 px-2 py-0.5 rounded-md mr-2"
        >
          {tag.name.toLowerCase()}
        </span>
      ))}
    </p>
  );
};

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

export default PostPage;
