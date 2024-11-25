import PaginationControlls from "@/components/PaginationControlls";
import PostCard from "@/components/PostCard";
import SearchForm from "@/components/searchForm";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
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

  // Destructure searchParams and set default values
  const {
    page = "1",
    per_page = "6",
    query: titleQuery = "",
    tags: tagsQuery = [],
  } = searchParams;

  const start = (parseInt(page as string) - 1) * parseInt(per_page as string); // 0, 5, 10 ...
  const end = start + parseInt(per_page as string); // 5, 10, 15 ...

  const tagsArray: string[] = Array.isArray(tagsQuery)
    ? tagsQuery
    : [tagsQuery];

  let filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(String(titleQuery).trim().toLowerCase())
  );

  if (tagsArray.length > 0) {
    filteredPosts = filteredPosts.filter((post) =>
      tagsArray.every((tagQuery) =>
        post.tags.some((tag) =>
          tag.name.toLowerCase().includes(tagQuery.toLowerCase())
        )
      )
    );
  }

  const paginatedPosts = filteredPosts.slice(start, end);

  let perPagePosts = filteredPosts.slice(start, end);

  return (
    <section className="min-h-screen max-w-screen-2xl mx-auto my-16 px-5 relative">
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
          <div
            key={post.id}
            className="w-[360px] sm:w-[400px] bg-custom-pattern bg-10px-10px hover:bg-0px-0px hover:scale-[1.05] duration-100 hover:bg-top-left opacity-90 rounded-md mt-10"
          >
            <BlurFade delay={0.1 * index} inView>
              <Link href={`posts/${post.slug}`}>
                <Card
                  key={post.id}
                  className="flex justify-between  gap-2 bg-gradient-to-tl from-slate-50 via-slate-100 to-slate-200 dark:bg-gradient-to-tl hover:dark:bg-gradient-to-br hover:bg-gradient-to-br duration-100 hover:animate-in w-full dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 h-auto sm:h-[220px] rounded shadow-xl"
                >
                  <div className="px-6 py-6 w-full">
                    <div>
                      <CardTitle className="text-[16px] md:text-md">
                        {post.title}
                      </CardTitle>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="inline-block text-xs md:text-sm bg-green-100 text-green-900 px-2 py-0.5  rounded-md mr-2 mb-2"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center flex-row-reverse mt-5">
                      <Button className="ml-auto realtive group relative inline-flex items-center overflow-hidden rounded-md border-2  px-6 py-2 text-base font-medium ">
                        <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full  opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
                        <span className="ease absolute right-0 flex h-5 w-5 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                          </svg>
                        </span>
                        <span className="relative text-sm transform duration-700 group-hover:-translate-x-2">
                          Read more
                        </span>
                      </Button>
                      <span className="text-sm text-gray-800 dark:text-gray-200">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Card>
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
