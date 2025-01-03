import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import { FileSignatureIcon, LucideNewspaper } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Pattern from "@/components/Pattern";
import SubscribtionForm from "@/components/SubscribtionForm";
import HeroContent from "@/components/HeroContent";

export default async function Page() {
  const notionServices = new NotionService();
  const posts: BlogPost[] = await notionServices.getFeaturedPosts({
    next: { revalidate: 5 },
  });

  const recentPosts = posts.slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* <HeroComponent /> */}
      <HeroContent />
      <RecentPosts recentPosts={recentPosts} posts={posts} />
      <SubscribtionForm />
    </main>
  );
}

const RecentPosts = ({
  recentPosts,
  posts,
}: {
  recentPosts: BlogPost[];
  posts: BlogPost[];
}) => {
  return (
    <section
      className="bg-slate-100 dark:bg-slate-800 py-10 rounded-md flex flex-col justify-start mx-auto w-full max-w-[1600px]"
      id="featured_posts"
    >
      <BlurFade delay={0.5} inView>
        <h2 className="flex items-center justify-center gap-2 mx-5 sm:mx-10  lg:mx-32 font-extrabold text-xl container dark:text-white rounded-md w-fit px-2 py-1">
          <FileSignatureIcon size={25} />
          Featured Posts
        </h2>
      </BlurFade>

      <div className="mx-auto flex flex-wrap gap-8 py-8 px-5 justify-center items-center">
        {posts.length > 0 ? (
          recentPosts.map((post, index) => (
            <Link key={post.id} href={`/post/${post.slug}`}>
              <BlurFade delay={0.15 * index} inView>
                <PostCard post={post} markdown={""} />
              </BlurFade>
            </Link>
          ))
        ) : (
          <p>No posts published yet!.</p>
        )}
      </div>
    </section>
  );
};

const HeroComponent = () => {
  return (
    <BlurFade delay={0.025} inView>
      <section className="mb-8 my-20 p-4 min-h-[50vh]  container flex justify-center items-center flex-col mx-auto text-center">
        <h1 className="text-5xl md:text-5xl font-bold mb-2">
          Welcome to Our Kawtech Blog
        </h1>
        <p className="text-lg md:text-xl">
          Stay updated with the latest in web development and technology
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 items-center relative mt-10">
          <Button className="p-6">
            <Link
              href="/post"
              className="text-base block"
              style={{
                minWidth: "50px", // Ensure a larger minimum width
                minHeight: "50px", // Ensure a larger minimum height
                padding: "12px 24px", // Add padding to increase the touch area
              }}
            >
              Latest Posts
            </Link>
          </Button>
          <Button variant="outline" className="p-6">
            <Link
              href="#subscribe"
              className="text-base block"
              style={{
                minWidth: "50px", // Ensure a larger minimum width
                minHeight: "50px", // Ensure a larger minimum height
                padding: "12px 24px", // Add padding to increase the touch area
              }}
            >
              Subscribe
            </Link>
          </Button>
        </div>
      </section>
    </BlurFade>
  );
};

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
