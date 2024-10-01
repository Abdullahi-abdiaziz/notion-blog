"use client"; // For using browser features

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // For handling route changes

interface Heading {
  id: string;
  text: string;
  level: number;
}

const extractHeadings = (markdown: string) => {
  const headingMatches = markdown.match(/^(#{1,6})\s+(.*)$/gm);
  if (!headingMatches) return [];

  return headingMatches.map((heading) => {
    const level = heading.indexOf(" ") - 1;
    const text = heading.replace(/^#+\s/, "").trim();
    const lower = text.replace(/[^\w]+/g, "-").toLowerCase(); // Clean <ID></ID>
    const id = lower.replace(/^-+|-+$/g, "");

    return { level, text, id };
  });
};

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
    <nav className="toc border rounded-md bg-slate-100 p-5">
      <h1>Contents</h1>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              style={{ marginLeft: heading.level + "rem" }}
              href={`#${heading.id}`}
              className={`hover:text-blue-600 mt-3 block m-${
                heading.level * 4
              }  ${activeId === heading.id ? "font-bold text-blue-600" : ""}`} // Highlight active heading
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
              {heading.text.replace(/\*\*/g, "")}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;