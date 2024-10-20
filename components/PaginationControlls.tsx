"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import Link from "next/link";

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
    <div className="flex gap-2 items-center justify-center mt-10 bg-green-50 dark:bg-green-950 px-2 py-1 rounded-md w-fit mx-auto">
      <Link
        className={`${
          !hasPrevPage
            ? "text-gray-400 dark:text-gray-600"
            : "text-black dark:text-white"
        } flex justify-center items-center"`}
        href={`${
          hasPrevPage
            ? `posts/?page=${Number(page) - 1}&per_page=${per_page}`
            : `posts/?page=${Number(page)}&per_page=${per_page}`
        }`}
        {...(hasPrevPage ? {} : { disabled: true })}
      >
        <BiSolidLeftArrow />
      </Link>

      <div className="text-black dark:text-white">
        page <span className="font-bold">{page}</span> of{" "}
        <span className="font-bold">{Math.ceil(10 / Number(per_page))}</span>
      </div>

      <Link
        className={`${
          !hasNextPage
            ? "text-gray-400 dark:text-gray-600"
            : "text-black dark:text-white"
        }  flex items-center justify-center"`}
        href={`${
          hasNextPage
            ? `posts/?page=${Number(page) + 1}&per_page=${per_page}`
            : `posts/?page=${Number(page)}&per_page=${per_page}`
        }`}
        {...(hasNextPage ? {} : { disabled: true })}
      >
        <BiSolidRightArrow />
      </Link>
    </div>
  );
};

export default PaginationControlls;
