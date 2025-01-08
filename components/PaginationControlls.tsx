"use client";
import React from "react";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
  currentPage: number;
  totalPages: number;
}

const PaginationControls = ({
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
  currentPage,
  totalPages,
}: PaginationControlsProps) => {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className={`px-4 py-2 rounded-lg ${
          hasPrevPage
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        Previous
      </button>

      <span className="text-gray-700 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={onNextPage}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-lg ${
          hasNextPage
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
