import { BlogPost, PostPage } from "@/types/schema";
import Image from "next/image";
import React from "react";

const PostCard = ({ post }: PostPage) => {
  return (
    <article className="border mx-auto rounded-md shadow-md w-ful h-[22rem] sm:h-[24rem] lg:h-[26rem] sm:w-[22rem] lg:w-[25rem] relative dark:bg-slate-900 hover:scale-105 transition-all duration-200">
      {post.cover && (
        <div className="w-full h-48 sm:h-48 md:h-56 lg:h-64 border-b rounded-t-md overflow-hidden">
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
        <p className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
          {new Date(post.date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2">
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
  );
};

export default PostCard;
