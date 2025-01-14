import RecentPosts from "@/components/RecentPosts";
import PostGrid from "@/components/ui/post-grid";
import NotionService from "@/services/notion-service";
import { BlogPost, PostPage } from "@/types/schema";
import React from "react";

interface PostPageProps {
  params: { category: string };
}

// export async function generateStaticParams() {
//   const notionService = new NotionService();
//   const posts = await notionService.getBlogPosts();

//   return posts.map((post: BlogPost) => ({
//     slug: post.slug,
//   }));
// }

const page = async ({ params }: PostPageProps) => {
  // Fetch blog posts based on category
  const notionService = new NotionService();
  const posts: BlogPost[] = await notionService.getPostsByCategory(
    params.category
      .split("-") // Split the string by hyphens
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(" "), // Join the words with spaces
    {
      next: { revalidate: 5 },
    }
  );

  // Render blog posts
  if (!posts) {
    return <div>No posts found for this category</div>;
  }

  return (
    <section className="max-w-[1400px] mx-auto relative z-100">
      <div className=" text-center py-20 bg-gradient-to-br from-indigo-400 via-green-300 border-t-violet-400 dark:bg-slate-700 my-10 rounded-md dark:text-black">
        <h1 className="text-4xl font-bold">#{params.category}</h1>
      </div>
      <RecentPosts posts={posts} />
    </section>
  );
};

export default page;
