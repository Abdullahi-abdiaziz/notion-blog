"use client";
import React, { useState, useEffect } from "react";

interface SearchFormProps {
  onSearch: (query: string) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [query, setQuery] = useState("");

  // Debounce logic
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(query); // Trigger search after delay
    }, 300); // 300ms delay

    return () => clearTimeout(debounceTimer); // Cleanup on unmount or query change
  }, [query, onSearch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="mb-8">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search posts by title or tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="px-6 py-3 border-2 border-gray-300 bg-gray-200 text-gray-800 dark:text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
    </form>
  );
};

export default SearchForm;
