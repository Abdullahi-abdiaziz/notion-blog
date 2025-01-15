import RecentPosts from "@/components/RecentPosts";
import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import React from "react";

interface PostPageProps {
  params: { category: string };
}

const formatCategoryName = (category: string) => {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const page = async ({ params }: PostPageProps) => {
  // Fetch blog posts
  const notionService = new NotionService();
  const posts: BlogPost[] = await notionService.getBlogPosts({
    next: { revalidate: 5 },
  });

  // Format category from params to match post categories
  const formattedCategory = formatCategoryName(params.category);

  // Filter posts by category
  const filteredPosts = posts.filter((post) =>
    post.categories.some((cat) => cat.name === formattedCategory)
  );

  return (
    <section className="max-w-[1400px] mx-auto relative z-100">
      <div className=" text-center py-20 bg-gradient-to-br from-indigo-400 via-green-300 border-t-violet-400 dark:bg-slate-700 my-10 rounded-md dark:text-black">
        <h1 className="text-4xl font-bold">#{params.category}</h1>
      </div>
      <RecentPosts posts={filteredPosts} />
    </section>
  );
};

export default page;
