"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
    ArrowBigDown,
    rrowDown01Icon,
  ArrowDownFromLine,
  ArrowDownLeftFromSquareIcon,
  
  ArrowDownNarrowWideIcon,
  PlusCircle,
  Search,
  Verified,
} from "lucide-react";
import { Input } from "./ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { DropdownMenuIcon } from "@radix-ui/react-icons";

function SearchForm() {
  const [showTags, setShowTags] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Extract existing tags from the URL
  const selectedTags = searchParams.getAll("tags");

  // Handle search input changes
  const handleChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query.trimStart()) params.set("query", query);
    else params.delete("query");

    router.replace(`${pathname}?${params.toString()}`);
  };

  // Available tags for selection
  const tags = [
    "backend",
    "frontend",
    "nodejs",
    "react",
    "typescript",
    "javascript",
    "mongodb",
    "graphql",
    "aws",
    "docker",
    "kubernetes",
    "aws-lambda",
  ];

  // Handle tag selection/deselection
  const handleTagClick = (tag: string) => {
    const params = new URLSearchParams(searchParams);
    const currentTags = params.getAll("tags");

    if (currentTags.includes(tag)) {
      // Remove tag if it is already selected
      const newTags = currentTags.filter((t) => t !== tag);
      params.delete("tags"); // Clear all tags first
      newTags.forEach((t) => params.append("tags", t)); // Re-add filtered tags
    } else {
      // Add tag if it's not selected
      params.append("tags", tag);
    }

    // Update the URL with new search params
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:gap-4">
      <Input
        type="search"
        placeholder="Search posts..."
        onChange={(e) => handleChange(e.target.value)}
        className="p-3 bg-white rounded-sm shadow-sm max-w-md mb-4 md:mb-10"
      />
      <div
        className="flex items-center gap-3 mb-4 md:hidden"
        onClick={() => setShowTags(!showTags)}
      >
        <p className="font-bold text-sm bg-slate-200 dark:bg-slate-700 py-1 px-2 rounded-sm flex items-center gap-1">
          {showTags ? "hide tags" : "show tags"}
          <ArrowDownLeftFromSquareIcon className="" size={12} />
        </p>
      </div>
      {showTags && (
        <div className="mb-10 md:mb-0 flex flex-wrap ">
          {tags.map((tag) => {
            const isActive = selectedTags.includes(tag);

            return (
              <Badge
                key={tag}
                className={`${
                  isActive
                    ? "bg-green-100 text-slate-800 dark:bg-green-100 dark:text-slate-800 hover:bg-green-200"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-green-50 hover:bg-slate-100"
                } px-2 py-1 text-sm rounded-md shadow-sm mr-2 cursor-pointer mb-2`}
                onClick={() => handleTagClick(tag)}
              >
                {isActive ? (
                  <Verified
                    size={15}
                    className="mr-1 text-green-800 font-extrabold"
                  />
                ) : (
                  <PlusCircle size={14} className="mr-1" />
                )}
                {tag}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchForm;
