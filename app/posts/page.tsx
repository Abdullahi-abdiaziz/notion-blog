import PaginationControlls from "@/components/PaginationControlls";
import PostCard from "@/components/PostCard";
import SearchForm from "@/components/searchForm";
import BlurFade from "@/components/ui/blur-fade";
import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const notionServices = new NotionService();
  const posts: BlogPost[] = await notionServices.getBlogPosts({
    next: { revalidate: 5 },
  });

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "6";
  const titleQuery = searchParams["title"] ?? "";
  const tagsQuery = searchParams["tags"] ?? "";

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  const end = start + Number(per_page); // 5, 10, 15 ..

  let filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(titleQuery.toString().toLowerCase())
  );

  let perPagePosts = filteredPosts.slice(start, end);

  // filteredPosts = filteredPosts.filter((post) =>
  //   post.tags.some((tag) =>
  //     tag.name.toLowerCase().includes(tagsQuery.toString().toLowerCase())
  //   )
  // );

  return (
    <section className="min-h-screen max-w-screen-2xl mx-auto my-16 px-5">
      <BlurFade delay={0.25} inView>
        <h1 className="text-3xl md:text-4xl font-bold mb-5 ">
          Latest Blog Posts
        </h1>
      </BlurFade>
      <SearchForm />
      <div className="flex flex-wrap items-center gap-10">
        {perPagePosts.length === 0 && (
          <p className="text-gray-700 dark:text-gray-400 text-center text-xl font-extrabold">
            No posts found.
          </p>
        )}
        {perPagePosts.map((post, index) => (
          <div key={post.id}>
            <BlurFade delay={0.1 * index} inView>
              <Link href={`posts/${post.slug}`}>
                <PostCard post={post} markdown="" />
              </Link>
            </BlurFade>
          </div>
        ))}
      </div>
      {filteredPosts.length > Number(per_page) && (
        <PaginationControlls
          hasNextPage={end < posts.length}
          hasPrevPage={start > 0}
        />
      )}
    </section>
  );
};

export default page;
