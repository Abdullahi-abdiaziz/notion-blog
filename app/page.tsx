import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import { Forward } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import PostCard from "@/components/PostCard";
import { Suspense } from "react";

// Generate dynamic metadata
export async function generateMetadata() {
  // Determine meta tags based on search results or general blog information
  const title = "Kawtech | Blog - Stay Updated with the Latest in Tech";
  const description =
    "Explore our latest blog posts covering web development, programming, and tech news.";
  const defaultImage = "https://shorturl.at/tsFLd"; // Provide a default image URL

  return {
    title,
    description,
    openGraph: {
      title: title,
      description: description,
      type: "website",
      url: "https://kawtech.vercel.app/",
      siteName: "Kawtech",
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: "Default Blog Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: defaultImage,
    },
  };
}

export default async function Page() {
  const notionServices = new NotionService();
  const posts: BlogPost[] = await notionServices.getBlogPosts({
    next: { revalidate: 5 },
  });

  const recentPosts = posts.slice(0, 6);

  return (
    <section className="min-h-screen max-w-screen-2xl mx-auto my-10">
      <BlurFade delay={0.25} inView>
        <header className="mb-8 my-20 p-4 container">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome to Our Kawtech Tech Blog
          </h1>
          <p className="text-base md:text-xl">
            Stay updated with the latest in web development and technology
          </p>
        </header>
      </BlurFade>

      <BlurFade delay={0.5} inView>
        <h2 className="flex items-center gap-2 mx-5 font-extrabold text-xl container bg-gray-100 dark:bg-gray-900 dark:text-white rounded-md w-fit px-2 py-1">
          <Forward size={25} />
          Recent Posts
        </h2>
      </BlurFade>

      <div className="mx-auto flex flex-wrap gap-8 py-8 px-5">
        {posts.length > 0 ? (
          recentPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`}>
              <BlurFade delay={0.75} inView>
                <PostCard post={post} markdown={""} />
              </BlurFade>
            </Link>
          ))
        ) : (
          <p>No posts published yet!.</p>
        )}
      </div>
      <div className="flex justify-center items-start mb-5">
        <Link
          href={"/posts"}
          className="text-lg text-gray-700 dark:text-gray-400 hover:text-blue-500 font-bold hover:underline "
        >
          show all posts
        </Link>
      </div>
    </section>
  );
}
