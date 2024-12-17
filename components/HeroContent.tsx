"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const HeroContent = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Best Practices", "Techniques", "Modern UI", "Design Patterns"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative z-1000">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <Button variant="secondary" size="sm" className="gap-4">
              <Link
                href={"#featured_posts"}
                className="flex items-center gap-2"
              >
                Read our featured articles
                <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-4xl md:text-6xl max-w-4xl py-1 px-0.5 tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">
                Accelerating Frontend Performance
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-sm md:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center mx-auto">
              Stay ahead in web development with expert insights, cutting-edge
              techniques, and proven strategies to build smarter, more efficient
              applications that transform user experiences and accelerate
              business success.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row  gap-3">
            <Button size="lg" className="gap-4" variant="outline">
              <Link href="/contact" className="flex items-center gap-2">
                Jump to contact <PhoneCall className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" className="gap-4">
              <Link href="/post" className="flex items-center gap-2">
                Browse Latest Posts <MoveRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
