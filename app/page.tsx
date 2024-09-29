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

  // Use the first post's data for Open Graph and Twitter Card

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

      <div className="mx-auto flex items-center flex-wrap gap-10 py-8 px-5">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`}>
              <article className="border p-2 rounded-md shadow-md max-w-96 h-[25rem] w-full">
                {post.cover && (
                  <Image
                    className="rounded-md"
                    src={post?.cover}
                    alt={post.title}
                    width={600} // Set a proper width according to your design
                    height={100} // Set an appropriate height
                    objectFit="cover"
                    priority={true}
                  />
                )}

                <div className="px-2 py-4">
                  <p className="mb-2 text-xs font-medium">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="mb-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block text-sm bg-green-100 text-green-900 px-2 py-0.5 rounded-md mr-2 mb-2"
                      >
                        {tag.name.toLowerCase()}
                      </span>
                    ))}
                  </p>
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
