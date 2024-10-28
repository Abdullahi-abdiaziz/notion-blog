"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/contexts/theme";
import Logo from "./Logo";
import { MoonIcon, SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import MenuToggle from "./MenuToggle";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScrollY = document.body.scrollHeight - window.innerHeight;

      if (currentScrollY < prevScrollY || currentScrollY >= maxScrollY) {
        // Scrolling up or at the bottom
        setIsVisible(true);
      } else {
        // Scrolling down
        setIsVisible(false);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <header
      className={`py-1 px-3 mx-0.5 top-0.5 shadow-lg border-2 rounded-md sticky bg-white z-10  transition-all duration-300${
        isVisible ? " dark:bg-black " : "transform -translate-y-full"
      }`}
    >
      <div className="md:max-w-6xl lg:max-w-[100rem] mx-auto px-1">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-5">
            <nav className="md:flex gap-2 sm:gap-6 lg:gap-10 items-center hidden">
              <Link
                href={"/"}
                className={`${
                  pathname === "/" &&
                  "font-bold bg-yellow-200  px-1 py-0.5 rounded-sm dark:text-slate-800 hover:text-slate-600 dark:hover:text-slate-700"
                } hover:text-slate-700 dark:hover:text-slate-200`}
              >
                Home
              </Link>
              <Link
                href={"/posts"}
                className={`${
                  pathname === "/posts" &&
                  "font-bold bg-yellow-200  px-1 py-0.5 rounded-sm dark:text-slate-800 hover:text-slate-600 dark:hover:text-slate-700"
                } hover:text-slate-700 dark:hover:text-slate-200 `}
              >
                Posts
              </Link>
              <Link
                href={"/contact"}
                className={`${
                  pathname === "/contact" &&
                  "font-bold bg-yellow-200  px-1 py-0.5 rounded-sm dark:text-slate-800 hover:text-slate-600 dark:hover:text-slate-700"
                } hover:text-slate-600 dark:hover:text-slate-200`}
              >
                Contact
              </Link>
            </nav>
            <MenuToggle />
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
