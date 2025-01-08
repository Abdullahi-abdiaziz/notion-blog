"use client";
import PaginationControlls from "@/components/PaginationControlls";
import SearchForm from "@/components/searchForm";
import BlurFade from "@/components/ui/blur-fade";
import PostGrid from "@/components/ui/post-grid";
import { BlogPost } from "@/types/schema";
import React, { useState, useEffect } from "react";

const RecentPosts = ({ posts }: { posts: BlogPost[] }) => {
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);

  // Filter posts based on search query
  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        ) || post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPosts(filtered);
    setPage(1); // Reset to the first page whenever the search query changes
  }, [searchQuery, posts]);

  const start = (page - 1) * skip; // 0, 5, 10 ...
  const end = start + skip; // 5, 10, 15 ...

  const totalPages = Math.ceil(filteredPosts.length / skip);
  const perPagePosts = filteredPosts.slice(start, end);

  return (
    <section className="min-h-screen max-w-screen-2xl mx-auto my-16 px-5 relative">
      <PageTitle title={"Latest Blog Posts"} />
      <SearchForm onSearch={setSearchQuery} />

      <div className="flex flex-wrap items-center gap-10">
        {perPagePosts.length === 0 && (
          <p className="text-gray-700 dark:text-gray-400 text-center text-xl font-extrabold">
            No posts found.
          </p>
        )}
        {perPagePosts.map((post, index) => (
          <PostGrid key={post.id} post={post} index={index} />
        ))}
      </div>

      {filteredPosts.length > skip && (
        <PaginationControlls
          hasNextPage={end < filteredPosts.length}
          hasPrevPage={start > 0}
          onNextPage={() => setPage(page + 1)}
          onPrevPage={() => setPage(page - 1)}
          currentPage={page}
          totalPages={totalPages}
        />
      )}
    </section>
  );
};
const PageTitle = ({ title }: { title: string }) => (
  <BlurFade delay={0.25} inView>
    <h1 className="text-3xl md:text-4xl font-bold mb-5 ">{title}</h1>
  </BlurFade>
);

export default RecentPosts;
