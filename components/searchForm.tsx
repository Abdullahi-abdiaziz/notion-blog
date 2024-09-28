"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Input } from "./ui/input";

function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    window.location.href = `?search=${encodedSearchTerm}`; // Redirect with search query param
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-8 p-4 max-w-xl">
      <Input
        type="search"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow p-4"
      />
      <Button type="submit" size="icon" className="w-10">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}

export default SearchForm;
