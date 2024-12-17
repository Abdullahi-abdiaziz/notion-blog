import React from "react";
import { Button } from "./button";

const ReadMoreButton = () => {
  return (
    <Button className="ml-auto realtive group relative inline-flex items-center overflow-hidden rounded-md border-2  px-6 py-2 text-base font-medium ">
      <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full  opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
      <span className="ease absolute right-0 flex h-5 w-5 translate-x-full transform items-center justify-start duration-500 group-hover:-translate-x-2">
        <svg
          className="h-3 w-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </span>
      <span className="relative text-sm transform duration-700 group-hover:-translate-x-2">
        Read more
      </span>
    </Button>
  );
};

export default ReadMoreButton;
