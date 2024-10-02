export const extractHeadings = (markdown: string) => {
  const headingMatches = markdown?.match(/^(#{1,6})\s+(.*)$/gm);
  if (!headingMatches) return [];

  return headingMatches.map((heading) => {
    const level = heading.indexOf(" ") - 1;
    const text = heading.replace(/^#+\s/, "").trim();

    const lower = text.replace(/[^\w]+/g, "-").toLowerCase();
    const id = lower.replace(/^-+|-+$/g, "");

    return { level, text, id };
  });
};
