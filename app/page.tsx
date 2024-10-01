import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema";
import Link from "next/link";
import SearchForm from "@/components/searchForm";
import { Forward } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

interface SearchProps {
  searchParams?: { search?: string };
}

// Generate dynamic metadata
export async function generateMetadata({
  searchParams,
}: SearchProps): Promise<Metadata> {
  const notionService = new NotionService();
  const posts: BlogPost[] = await notionService.getBlogPosts();

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

export default async function Page({ searchParams }: SearchProps) {
  const notionService = new NotionService();
  const posts: BlogPost[] = await notionService.getBlogPosts();

  const searchTerm = searchParams?.search?.toLowerCase() || "";

  // Filter posts based on search term
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm))
  );

  return (
    <section className="min-h-screen md:max-w-screen-xl mx-auto">
      <header className="mb-8 my-20 p-4 container">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome to Our Tech Blog
        </h1>
        <p className="text-base md:text-xl">
          Stay updated with the latest in web development and technology
        </p>
      </header>

      {/* Search Form */}
      <SearchForm />

      <h2 className="flex items-center gap-1 mx-5 font-extrabold text-xl container">
        <Forward size={25} />
        Recent Posts
      </h2>

      <div className="mx-auto flex flex-wrap gap-8 py-8 px-5">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`}>
              <article className="border mx-auto rounded-md shadow-md w-ful h-[23rem] sm:h-[25rem] lg:h-[28rem] sm:w-[22rem] lg:w-[25rem] relative">
                {post.cover && (
                  <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 border-b rounded-t-md overflow-hidden">
                    <Image
                      src={post.cover}
                      alt="Post cover"
                      width={420}
                      height={270}
                      priority
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <div className="px-4 py-4">
                  <p className="mb-2 text-xs font-medium text-gray-500">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="mb-2 absolute bottom-0">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block text-sm bg-green-100 text-green-900 px-2 py-0.5 rounded-md mr-2 mb-2"
                      >
                        {tag.name.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))
        ) : (
          <p>No posts found for "{searchTerm}".</p>
        )}
      </div>
    </section>
  );
}
