"use client"; // For using browser features

import React, { useEffect, useState } from "react";
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
      { threshold: 0.9 }
    ); // Adjust threshold as needed

    // Observe each heading
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Cleanup function
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
      <h3 className="font-bold text-xl mb-3">Table of Contents</h3>
      <ul className="mt-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              style={{ marginLeft: heading.level + "rem" }}
              href={`#${heading.id}`}
              className={`hover:text-blue-600 block mt-3 text-gray-500 ${
                activeId === heading.id ? "font-bold text-gray-900" : ""
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

export default TableOfContents;
