import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Lato } from "next/font/google";
import Logo from "./Logo";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700", "900"] });

const Footer = () => {
  return (
    <footer className="border-t py-6 px-4">
      <div className="max-w-screen-2xl mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Logo />
        </div>
        <nav className="flex gap-4">
          <Link href={"/"} className="hover:text-primary">
            Home
          </Link>
          <Link href={"/posts"} className="hover:text-primary">
            Posts
          </Link>
          <Link href={"/contacts"} className="hover:text-primary">
            Contact
          </Link>
        </nav>
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} Blog. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
