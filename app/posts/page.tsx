import PostCard from "@/components/PostCard";
import BlurFade from "@/components/ui/blur-fade";
import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import React from "react";

const page = async () => {
  const notionServices = new NotionService();
  const posts: BlogPost[] = await notionServices.getBlogPosts({
    next: { revalidate: 5 },
  });

  return (
    <section className="min-h-screen max-w-screen-2xl mx-auto my-16 px-5">
      <BlurFade delay={0.25} inView>
        <h1 className="text-3xl md:text-4xl font-bold mb-10 ">
          Latest Blog Posts
        </h1>
      </BlurFade>
      <div className="flex flex-wrap items-center gap-10">
        {posts.map((post, index) => (
          <div key={post.id}>
            <BlurFade delay={0.1 * index} inView>
              <Link href={`posts/${post.slug}`}>
                <PostCard post={post} markdown="" />
              </Link>
            </BlurFade>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
