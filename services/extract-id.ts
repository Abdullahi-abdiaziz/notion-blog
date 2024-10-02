import React from "react";

export const extractId = (
  children: React.ReactNode,
  headings: { level: number; text: string; id: string }[],
  level: number
): string => {
  const text = React.Children.toArray(children)
    .map((child) =>
      typeof child === "string"
        ? child
        : (child as React.ReactElement)?.props?.children ?? ""
    )
    .filter(Boolean)
    .join("")
    .trim();

  const kebabCaseText = text
    .replace(/[^\w\s/.]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/[/.]+/g, "-")
    .replace(/--+/g, "-")
    .toLowerCase();

  const matchingHeading = headings.find(
    (heading) => heading.level === level && heading.text === text
  );

  return matchingHeading?.id ?? kebabCaseText;
};
