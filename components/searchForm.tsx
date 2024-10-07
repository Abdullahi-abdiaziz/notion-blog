"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    router.push(`/posts/?title=${encodedSearchTerm}`); // Redirect with search query param
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex gap-2 mb-16 items-center max-w-xl bg-slate-100  dark:bg-slate-800 rounded-lg border-2 border-gray-300 dark:border-gray-600"
    >
      <Input
        type="search"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-5 border-none outline-none  focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent shadow-none"
      />
      <Button
        type="submit"
        size="icon"
        className="w-12 border-none mr-1 bg-transparent shadow-none hover:bg-slate-300 dark:hover:bg-slate-700"
      >
        <Search className="h-5 w-5 text-gray-900 dark:text-gray-100" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}

export default SearchForm;
