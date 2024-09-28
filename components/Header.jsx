import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="border-b py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <Image src={"/image.png"} width={120} height={50} alt="logo" />
          <nav className="flex gap-10">
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
      </div>
    </header>
  );
};

export default Header;
