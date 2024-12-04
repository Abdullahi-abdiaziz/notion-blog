"use client"; // For using browser features

import React, { memo, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // For handling route changes
import { extractHeadings } from "@/services/extract-heading";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents: React.FC<{ markdown: string }> = ({ markdown }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null); // State for active heading
  const pathname = usePathname();

  // Scroll to heading when the hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [pathname]);

  // Extract headings when the Markdown content changes
  useEffect(() => {
    const extractedHeadings = extractHeadings(markdown);
    setHeadings(extractedHeadings);
  }, [markdown]);

  // Set up the Intersection Observer to highlight current heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id); // Update active heading
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px 0px -90% 0px", // Trigger when top aligns with the viewport
        threshold: 0.1, // Trigger as soon as the condition is met
      }
    );

    // Observe each heading
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Cleanup
    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  return (
    <nav className="toc rounded-md p-5 mt-10">
      {/* Conditionally render the content */}
      <h3 className="font-bold text-xl mb-3 dark:text-white">
        Table of Contents
      </h3>
      <ul className="mt-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              style={{ marginLeft: heading.level + "rem" }}
              href={`#${heading.id}`}
              className={`text-sm hover:text-gray-800 dark:hover:text-gray-200 block mt-3 text-gray-600 dark:text-gray-400 ${
                activeId === heading.id
                  ? "font-bold text-gray-900 border-l-4 p-1 pl-2 bg-slate-200 rounded-sm dark:bg-slate-800 border-green-600 dark:text-white"
                  : ""
              }`} // Highlight active heading
              target="_self"
              rel="noopener noreferrer"
              title={`Jump to ${heading.text}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                const element = document.getElementById(heading.id);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                window.history.pushState(null, "", `#${heading.id}`); // Update the URL hash
              }}
            >
              <div className="truncate">
                {heading.text.replace(/\*\*/g, "")}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default memo(TableOfContents);
