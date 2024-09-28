import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t py-8 px-4">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold mb-2 flex items-center text-primary">
            <Rocket className="mr-2" />
            TechTastic Blog
          </h2>
          <p className="text-muted-foreground">
            Exploring the fun side of technology!
          </p>
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
