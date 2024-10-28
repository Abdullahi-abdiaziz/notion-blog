import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import { FileSignatureIcon, Forward, LucideNewspaper } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Pattern from "@/components/Pattern";
import { BackgroundLines } from "@/components/ui/BackgroundLines";
import { Cover } from "@/components/ui/cover";

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
  const posts: BlogPost[] = await notionServices.getFeaturedPosts({
    next: { revalidate: 5 },
  });

  const recentPosts = posts.slice(0, 6);

  return (
    <main className="min-h-screen">
      <BlurFade delay={0.25} inView>
        {/* <Pattern> */}
        <BackgroundLines className=" flex items-center justify-center w-full flex-col px-4">
          <section className="mb-8 my-20 p-4   container flex justify-center items-center flex-col mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome to Our
              <Cover>Kawtech Blog</Cover>
            </h1>
            <p className="text-xl md:text-2xl">
              Stay updated with the latest in web development and technology
            </p>
            <div className="space-x-4 space-y-8 relative">
              <Button>
                <Link href={"/posts"} className="z-50">
                  Latest Posts
                </Link>
              </Button>
              <Button variant="outline">
                <Link href={"#subscribe"}>Subscribe</Link>
              </Button>
            </div>
          </section>
        </BackgroundLines>
        {/* </Pattern> */}
      </BlurFade>

      <section className="bg-slate-100 dark:bg-slate-800 py-10 rounded-md flex flex-col justify-start mx-auto w-full max-w-screen-2xl">
        <BlurFade delay={0.5} inView>
          <h2 className="flex items-center justify-center gap-2 mx-5 sm:mx-10  lg:mx-32 font-extrabold text-xl container dark:text-white rounded-md w-fit px-2 py-1">
            <FileSignatureIcon size={25} />
            Featured Posts
          </h2>
        </BlurFade>

        <div className="mx-auto flex flex-wrap gap-8 py-8 px-5 justify-center items-center">
          {posts.length > 0 ? (
            recentPosts.map((post, index) => (
              <Link key={post.id} href={`/posts/${post.slug}`}>
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
      <section className="w-full py-12 md:py-24 lg:py-32" id="subscribe">
        <div className="flex justify-between items-center border-2 rounded-md  p-10 px-4 max-w-screen-xl mx-2 sm:mx-auto ">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="space-y-8">
              <h2 className="text-xl font-bold tracking-tighter flex items-center gap-2">
                <LucideNewspaper />
                Stay Updated
              </h2>
              <p className="mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Subscribe to our newsletter for the latest tech insights and
                blog updates.
              </p>
            </div>
            <div className="w-full max-w-screen-md mt-8">
              <form className="flex flex-col md:flex-row space-y-5 md:space-y-0 space-x-2 md:items-center ">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" size={"lg"}>
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <Pattern>
            <div className="hidden md:block">
              <Image
                src="/subscribe.png"
                width={400}
                height={400}
                alt="Picture of the author"
              />
            </div>
          </Pattern>
        </div>
      </section>
    </main>
  );
}
