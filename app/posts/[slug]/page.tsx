// app/post/[slug]/page.tsx
import Markdown from "react-markdown";
import NotionService from "../../../services/notion-service"; // Adjust the path if necessary
import React from "react";
import remarkGfm from "remark-gfm";

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
    <div className="max-w-screen-lg my-10 mx-auto">
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold space-y-2">
        {post.post.title}
      </h1>
      <img
        src={post.post.cover}
        className="rounded-lg min-w-full h-[250px] md:h-[450px] my-10 mx-5"
        alt="post cover"
      />
      <article className="prose text-xs md:text-sm lg:text-base mx-auto max-w-4xl mt-10 px-5">
        <Markdown remarkPlugins={[remarkGfm]}>{post.markdown}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
