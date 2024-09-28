import NotionService from "@/services/notion-service";
import { BlogPost } from "@/types/schema"; // Assuming you have this type defined
import Link from "next/link";

export default async function Page() {
  const notionService = new NotionService();
  const posts: BlogPost[] = await notionService.getBlogPosts(); // Fetch posts directly

  return (
    <main className="min-h-screen max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold text-center mt-5">Notion Blog</h1>
      <p className="text-gray-700 text-center my-5 w-1/2 mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi aut
        nemo repudiandae voluptas amet.
      </p>
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-10 container py-8">
        {posts.map((post) => (
          <Link href={`/posts/${post.slug}`}>
            <article
              key={post.id}
              className="border p-2 rounded-md shadow-md w-full"
            >
              {post.cover && (
                <img
                  className="h-60 w-full object-cover rounded-md"
                  src={post.cover}
                  alt={post.title}
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
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
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
                <p>{post.description}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
