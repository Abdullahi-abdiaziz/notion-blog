import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuToggle = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger
          className="rounded-md bg-gray-300 dark:bg-gray-700 px-2 py-2 text-sm font-semibold text-gray-900 dark:text-gray-50 hover:bg-gray-300 md:hidden"
          aria-label="menu toggle"
        >
          <MenuIcon size={16} />
        </SheetTrigger>
        <SheetContent side={"top"}>
          <nav className="flex gap-10  items-center flex-col justify-center mt-10 ">
            <Link
              href={"/"}
              className={`${
                pathname === "/" &&
                "font-bold px-1 py-0.5 rounded-sm bg-yellow-200 dark:text-slate-800"
              } hover:text-slate-700`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href={"/posts"}
              className={`${
                pathname === "/posts" &&
                "font-bold px-1 py-0.5 rounded-sm bg-yellow-200 dark:text-slate-800"
              } hover:text-slate-700`}
              onClick={() => setIsOpen(false)}
            >
              Posts
            </Link>
            <Link
              href={"/contact"}
              className={`${
                pathname === "/contact" &&
                "font-bold px-1 py-0.5 rounded-sm bg-yellow-200 dark:text-slate-800"
              } hover:text-slate-700`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MenuToggle;
