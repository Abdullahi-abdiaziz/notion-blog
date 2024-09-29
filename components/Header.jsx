import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={"/image.png"} width={90} height={50} alt="logo" />
          </Link>
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
