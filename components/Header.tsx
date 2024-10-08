"use client";
import Link from "next/link";
import React from "react";
import { useTheme } from "@/contexts/theme";
import Logo from "./Logo";
import { MoonIcon, SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="border-b py-3 px-4 bg-gray-100 dark:bg-gray-950 m-0">
      <div className="md:max-w-6xl lg:max-w-[100rem] mx-auto px-1">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex gap-2 sm:gap-6 lg:gap-10 items-center">
            <Link
              href={"/"}
              className={`${
                pathname === "/" && "font-bold underline underline-offset-2"
              } hover:text-slate-700`}
            >
              Home
            </Link>
            <Link
              href={"/posts"}
              className={`${
                pathname === "/posts" &&
                "font-bold underline underline-offset-2"
              } hover:text-slate-700`}
            >
              Posts
            </Link>
            <Link
              href={"/contact"}
              className={`${
                pathname === "/contact" &&
                "font-bold underline underline-offset-2"
              } hover:text-slate-700`}
            >
              Contact
            </Link>

            <button
              className="rounded-md bg-gray-200 dark:bg-gray-800 px-2 py-2 text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-300"
              aria-label="Toggle theme"
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
