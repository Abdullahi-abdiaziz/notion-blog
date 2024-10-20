import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Lato } from "next/font/google";
import Logo from "./Logo";
import { Github, Rss, Twitter } from "lucide-react";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

const Footer = () => {
  return (
    <footer className="flex flex-col justify-between gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        © 2023 TechBlog. All rights reserved.
      </p>
      <nav className=" flex gap-4 sm:gap-6">
        <Link className="text-sm hover:underline underline-offset-4" href="#">
          Terms of Service
        </Link>
        <Link className="text-sm hover:underline underline-offset-4" href="#">
          Privacy
        </Link>
      </nav>
      <div className="flex items-center space-x-4 ">
        <Link href="#">
          <Rss className="h-5 w-5" />
          <span className="sr-only">RSS</span>
        </Link>
        <Link href="#">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
        </Link>
        <Link href="#">
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
