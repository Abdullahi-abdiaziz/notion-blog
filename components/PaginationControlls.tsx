"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BiRightArrow,
  BiRightArrowAlt,
  BiSolidLeftArrow,
  BiSolidLeftArrowSquare,
  BiSolidRightArrow,
  BiSolidRightArrowAlt,
} from "react-icons/bi";
import Link from "next/link";
import {
  ArrowLeftSquare,
  ArrowRightFromLine,
  ArrowRightSquare,
} from "lucide-react";

type PaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

const PaginationControlls = ({ hasNextPage, hasPrevPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "9";
  return (
    <div className="flex gap-2 items-center justify-center mt-10  px-2 py-1 rounded-md w-fit mx-auto">
      <Link
        className={`${
          !hasPrevPage
            ? "text-blue-300 dark:text-blue-300"
            : "text-blue-600 dark:text-blue-600"
        } flex justify-center items-center"`}
        href={`${
          hasPrevPage
            ? `posts/?page=${Number(page) - 1}&per_page=${per_page}`
            : `posts/?page=${Number(page)}&per_page=${per_page}`
        }`}
        {...(hasPrevPage ? {} : { disabled: true })}
      >
        <div className="px-2 py-1 rounded-md  flex gap-1 items-center">
          <ArrowLeftSquare size={16} />
          <p>Previous</p>
        </div>
      </Link>

      <div className="text-black dark:text-white flex gap-1">
        <span className="font-bold  w-8 text-center  rounded-sm bg-white dark:bg-slate-900 shadow-lg border">
          {hasPrevPage && Number(page) - 1}
        </span>

        <span className="font-bold px-3 py-0.5 rounded-sm shadow-lg bg-yellow-200 text-yellow-900 border scale-110 ml-2 mr-2">
          {page}
        </span>
        <span className="font-bold w-8 text-center border py-0.5 rounded-sm bg-white dark:bg-slate-900 shadow-lg">
          {hasNextPage && Number(page) + 1}
        </span>
      </div>

      <Link
        className={`${
          !hasNextPage
            ? "text-blue-300 dark:text-blue-300"
            : "text-blue-600 dark:text-blue-600"
        }  flex items-center justify-center"`}
        href={`${
          hasNextPage
            ? `posts/?page=${Number(page) + 1}&per_page=${per_page}`
            : `posts/?page=${Number(page)}&per_page=${per_page}`
        }`}
        {...(hasNextPage ? {} : { disabled: true })}
      >
        <div className="px-2 py-1 rounded-md flex gap-1 items-center">
          <p>Next</p>
          <ArrowRightSquare size={16} />
        </div>
      </Link>
    </div>
  );
};

export default PaginationControlls;
