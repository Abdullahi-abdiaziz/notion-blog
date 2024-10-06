"use client";
import Link from "next/link";
import React from "react";
import { useTheme } from "@/contexts/theme";
import Logo from "./Logo";
import { MoonIcon, SunIcon } from "lucide-react";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="border-b py-3 px-4 bg-gray-100 dark:bg-gray-950 m-0">
      <div className="md:max-w-6xl lg:max-w-[100rem] mx-auto px-1">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex gap-4 sm:gap-6 lg:gap-10 items-center">
            <Link href={"/"} className="hover:text-primary">
              Home
            </Link>
            <Link href={"/posts"} className="hover:text-primary">
              Posts
            </Link>
            <Link href={"/contacts"} className="hover:text-primary">
              Contact
            </Link>

            <button
              className="rounded-md bg-gray-200 dark:bg-gray-800 px-2 py-2 text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-300"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <MoonIcon size={16} />
              ) : (
                <SunIcon size={16} />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
