// app/post/[slug]/page.tsx
import Markdown from "react-markdown";
import NotionService from "../../../services/notion-service"; // Adjust the path if necessary
import React from "react";
import remarkGfm from "remark-gfm";
import Head from "next/head";

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

const PostPage = async ({ params }: PostPageProps) => {
  const notionService = new NotionService();
  const post = await notionService.getPostBySlug(params.slug);

  if (!post) {
    // Optionally return 404 component or message if post not found
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head>
        <title>{post.post.title} - Blog</title>
        <meta name="description" content={post.post.description} />
        <meta property="og:title" content={post.post.title} />
        <meta property="og:description" content={post.post.description} />
        <meta property="og:image" content={post.post.cover} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://yourdomain.com/post/${post.post.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.post.title} />
        <meta name="twitter:description" content={post.post.description} />
        <meta name="twitter:image" content={post.post.cover} />
      </Head>
      <div className="max-w-screen-xl my-10 mx-auto">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2">
          {post.post.title}
        </h1>
        <img
          src={post.post.cover}
          className="rounded-[1rem] max-w-full block w-full h-[250px] md:h-[550px] my-10 mx-auto px-2"
          alt="post cover"
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
                className="inline-block text-base bg-green-100 text-green-900 px-2 py-0.5 rounded-md mr-2  t"
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
