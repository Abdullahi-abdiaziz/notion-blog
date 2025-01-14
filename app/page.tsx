import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import { FileSignatureIcon } from "lucide-react";
import BlurFade from "@/components/ui/blur-fade";
import PostCard from "@/components/PostCard";
import SubscribtionForm from "@/components/SubscribtionForm";
import HeroContent from "@/components/HeroContent";
import CategoriesSection from "@/components/CategoriesSection";

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
      <CategoriesSection />
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
      className=" py-10 rounded-md flex flex-col justify-start mx-auto w-full max-w-[1400px]"
      id="featured_posts"
    >
      <div className="container mx-auto px-4">
        <BlurFade delay={0.5} inView>
          <h2 className="flex items-center justify-center gap-2   font-extrabold text-2xl container dark:text-white rounded-md w-fit mb-8">
            <FileSignatureIcon size={25} />
            Featured Posts
          </h2>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            recentPosts.map((post, index) => (
              <Link key={post.id} href={`/post/${post.slug}`}>
                <BlurFade delay={0.1 * index} inView>
                  <PostCard post={post} markdown={""} />
                </BlurFade>
              </Link>
            ))
          ) : (
            <p>No posts published yet!.</p>
          )}
        </div>
      </div>
    </section>
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
