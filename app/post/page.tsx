// import PaginationControlls from "@/components/PaginationControlls";
// import SearchForm from "@/components/searchForm";
// import BlurFade from "@/components/ui/blur-fade";
// import PostGrid from "@/components/ui/post-grid";
// import NotionService from "@/services/notion-service";
// import { BlogPost } from "@/types/schema";
// import React from "react";

// const page = async ({
//   searchParams,
// }: {
//   searchParams: { [key: string]: string | string[] | undefined };
// }) => {
//   const notionServices = new NotionService();
//   const posts: BlogPost[] = await notionServices.getBlogPosts({
//     next: { revalidate: 5 },
//   });

//   // Destructure searchParams and set default values
//   const {
//     page = "1",
//     per_page = "6",
//     query: titleQuery = "",
//     tags: tagsQuery = [],
//   } = searchParams;

//   const start = (parseInt(page as string) - 1) * parseInt(per_page as string); // 0, 5, 10 ...
//   const end = start + parseInt(per_page as string); // 5, 10, 15 ...

//   const tagsArray: string[] = Array.isArray(tagsQuery)
//     ? tagsQuery
//     : [tagsQuery];

//   let filteredPosts = posts.filter((post) =>
//     post.title.toLowerCase().includes(String(titleQuery).trim().toLowerCase())
//   );

//   if (tagsArray.length > 0) {
//     filteredPosts = filteredPosts.filter((post) =>
//       tagsArray.every((tagQuery) =>
//         post.tags.some((tag) =>
//           tag.name.toLowerCase().includes(tagQuery.toLowerCase())
//         )
//       )
//     );
//   }

//   let perPagePosts = filteredPosts.slice(start, end);

//   return (
//     <section className="min-h-screen max-w-screen-2xl mx-auto my-16 px-5 relative">
//       <PageTitle title={"Latest Blog Posts"} />
//       {/* <SearchForm /> */}

//       <div className="flex flex-wrap items-center gap-10">
//         {perPagePosts.length === 0 && (
//           <p className="text-gray-700 dark:text-gray-400 text-center text-xl font-extrabold">
//             No posts found.
//           </p>
//         )}
//         {perPagePosts.map((post, index) => (
//           <PostGrid post={post} index={index} />
//         ))}
//       </div>

//       {filteredPosts.length > Number(per_page) && (
//         <PaginationControlls
//           hasNextPage={end < posts.length}
//           hasPrevPage={start > 0}
//         />
//       )}
//     </section>
//   );
// };

// const PageTitle = ({ title }: { title: string }) => (
//   <BlurFade delay={0.25} inView>
//     <h1 className="text-3xl md:text-4xl font-bold mb-5 ">{title}</h1>
//   </BlurFade>
// );

// export default page;

import RecentPosts from "@/components/RecentPosts";
import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import React from "react";

const page = async () => {
  const notionServices = new NotionService();
  const posts: BlogPost[] = await notionServices.getBlogPosts({
    next: { revalidate: 5 },
  });

  return <RecentPosts posts={posts} />;
};

export default page;
