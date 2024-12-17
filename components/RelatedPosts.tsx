import NotionService from "@/services/notion-service";
import { Tag } from "@/types/schema";
import { BadgeInfo } from "lucide-react";
import Link from "next/link";
import React from "react";

const RelatedPosts: React.FC<{
  tags: Tag[];
  title: string;
}> = async ({ tags, title }) => {
  const notionService = new NotionService();
  const posts = await notionService.getBlogPosts();

  const filteredPosts = posts.filter(
    (post) =>
      post.tags.some((tag) => tags.map((t) => t.name).includes(tag.name)) &&
      post.title !== title
  );

  return (
    filteredPosts.length > 0 && (
      <div className="m-5 my-20  lg:mx-20 border-l-8 border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-800 p-4 rounded-lg">
        <h2 className="text-lg md:text-xl font-bold mb-8 dark:text-white flex items-center gap-2 mx-3">
          <BadgeInfo className="text-yellow-600" />
          Related Posts
        </h2>
        <div className="flex flex-wrap gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="border-2 rounded-md bg-slate-100 dark:bg-slate-800 px-4 py-4 w-full md:w-fit"
            >
              <h3 className="text-md font-bold">{post.title}</h3>
              <Link
                href={`/post/${post.slug}`}
                className="outline-primary mt-2 flex items-center justify-end text-cyan-600"
              >
                Read more
                <span className="ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default RelatedPosts;
