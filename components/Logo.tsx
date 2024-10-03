import Link from "next/link";
import React from "react";
import { Bungee_Spice } from "next/font/google";

const bungee = Bungee_Spice({ subsets: ["latin"], weight: "400" });

const Logo = () => {
  return (
    <Link href={"/"} className={`${bungee.className} text-3xl font-extrabold`}>
      BLOG.
    </Link>
  );
};

export default Logo;
