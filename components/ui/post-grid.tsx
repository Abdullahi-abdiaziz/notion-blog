import { BlogPost, Tag } from "@/types/schema";
import React from "react";
import BlurFade from "./blur-fade";
import Link from "next/link";
import { Card, CardTitle } from "./card";
import ReadMoreButton from "./read-more-button";

const PostGrid = ({ index, post }: { index: number; post: BlogPost }) => {
  return (
    <div
      key={post.id}
      className="w-[360px] sm:w-[400px] bg-custom-pattern bg-10px-10px hover:bg-0px-0px hover:scale-[1.05] duration-100 hover:bg-top-left opacity-90 rounded-md mt-10"
    >
      <BlurFade delay={0.1 * index} inView>
        <Link href={`post/${post.slug}`}>
          <Card
            key={post.id}
            className="flex justify-between  gap-2 bg-gradient-to-tl from-slate-50 via-slate-100 to-slate-200 dark:bg-gradient-to-tl hover:dark:bg-gradient-to-br hover:bg-gradient-to-br duration-100 hover:animate-in w-full dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 h-auto sm:h-[220px] rounded shadow-xl"
          >
            <div className="px-6 py-6 w-full">
              <Title title={post.title} />
              <Tags tags={post.tags} />
              <MoreDetails date={post.date} />
            </div>
          </Card>
        </Link>
      </BlurFade>
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return (
    <div>
      <CardTitle className="text-[16px] md:text-md">{title}</CardTitle>
    </div>
  );
};

const Tags = ({ tags }: { tags: Tag[] }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block text-xs md:text-sm bg-green-100 text-green-900 px-2 py-0.5  rounded-md mr-2 mb-2"
          >
            {tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

const MoreDetails = ({ date }: { date: string }) => {
  return (
    <div className="flex justify-between items-center flex-row-reverse mt-5">
      <ReadMoreButton />
      <CreatedDate date={date} />
    </div>
  );
};

const CreatedDate = ({ date }: { date: string }) => {
  return (
    <span className="text-sm text-gray-800 dark:text-gray-200">
      {new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })}
    </span>
  );
};

export default PostGrid;
