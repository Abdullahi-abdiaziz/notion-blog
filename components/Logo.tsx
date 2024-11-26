import Link from "next/link";
import React from "react";
import { Bokor } from "next/font/google";

const bokor = Bokor({ subsets: ["latin"], weight: "400" });

const Logo = () => {
  return (
    <Link
      href={"/"}
      className={`${bokor.className} text-3xl font-extrabold tracking-wide`}
    >
      KAWTECH.
    </Link>
  );
};

export default Logo;
