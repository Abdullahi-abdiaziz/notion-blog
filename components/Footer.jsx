import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-6 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <Link href={"/"}>
            <Image src={"/image.png"} width={90} height={50} alt="logo" />
          </Link>
        </div>
        <nav className="flex gap-4">
          <Link href={"/"} className="hover:text-primary">
            Home
          </Link>
          <Link href={"/posts"} className="hover:text-primary">
            Posts
          </Link>
          <Link href={"/contact"} className="hover:text-primary">
            Contact
          </Link>
        </nav>
      </div>
      <div className="mt-4 text-center text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} TechTastic Blog. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
