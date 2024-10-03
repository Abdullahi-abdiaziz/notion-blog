import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="border-b py-3 px-4">
      <div className="md:max-w-6xl lg:max-w-[100rem]  mx-auto px-1">
        <div className="flex items-center justify-between">
          <Logo />
          <nav className="flex gap-4 sm:gap-6 lg:gap-10 ">
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
        </div>
      </div>
    </header>
  );
};

export default Header;
