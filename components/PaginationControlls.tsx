"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeftSquare, ArrowRightSquare } from "lucide-react";

type PaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const PaginationControlls = ({ hasNextPage, hasPrevPage }: PaginationProps) => {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "6";
  return (
    <div className="flex gap-2 items-center justify-center mt-10  px-2 py-1 rounded-md w-fit mx-auto">
      <Link
        className={` flex justify-center items-center"`}
        href={`${
          hasPrevPage
            ? `post?page=${Number(page) - 1}&per_page=${per_page}`
            : `post?page=${Number(page)}&per_page=${per_page}`
        }`}
        {...(hasPrevPage ? {} : { disabled: true })}
      >
        <div
          className={`px-2 py-1 rounded-md border flex gap-1 items-center ${
            !hasPrevPage
              ? "text-gray-600 dark:text-gray-400 bg-slate-100 dark:bg-slate-800 "
              : "text-blue-600 dark:text-blue-600 bg-white dark:bg-black"
          }`}
        >
          <ArrowLeftSquare size={16} />
          <p>Previous</p>
        </div>
      </Link>

      <div className="text-black dark:text-white flex gap-1">
        <span className="font-bold  w-8 text-center flex items-center justify-center  rounded-sm bg-white dark:bg-slate-950 shadow-lg">
          {hasPrevPage && Number(page) - 1}
        </span>

        <span className="px-3 py-0.5 rounded-sm shadow-lg bg-green-100 text-green-900 font-bold border scale-125 ml-2 mr-2">
          {page}
        </span>
        <span className="font-bold w-8 text-center flex justify-center items-center  rounded-sm bg-white dark:bg-slate-950 shadow-lg">
          {hasNextPage && Number(page) + 1}
        </span>
      </div>

      <Link
        className={`  flex items-center justify-center rounded-md"`}
        href={`${
          hasNextPage
            ? `post?page=${Number(page) + 1}&per_page=${per_page}`
            : `post?page=${Number(page)}&per_page=${per_page}`
        }`}
        {...(hasNextPage ? {} : { disabled: true })}
      >
        <div
          className={`px-2 py-1 rounded-md border flex gap-1 items-center ${
            !hasNextPage
              ? "text-gray-600 dark:text-gray-400 bg-slate-100 dark:bg-slate-800 "
              : "text-blue-600 dark:text-blue-600 bg-white dark:bg-black"
          }`}
        >
          <p>Next</p>
          <ArrowRightSquare size={16} />
        </div>
      </Link>
    </div>
  );
};

export default PaginationControlls;
