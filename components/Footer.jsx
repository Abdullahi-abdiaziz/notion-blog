import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-6 px-4">
      <div className="max-w-screen-2xl mx-auto px-2 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href={"/"} className="text-3xl font-extrabold">
            BLOG.
          </Link>
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
