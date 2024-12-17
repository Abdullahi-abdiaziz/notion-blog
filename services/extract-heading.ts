export const extractHeadings = (markdown: string) => {
  const headingMatches = markdown?.match(/^(#{1,6})\s+(.*)$/gm);
  if (!headingMatches) return [];

  return headingMatches.map((heading) => {
    const level = heading.indexOf(" ") - 1;
    const text = heading.replace(/^#+\s/, "").trim();

    const id = text
      .replace(/[^\w\s/.]+/g, "")
      .replace(/\s+/g, "-")
      .replace(/[/.]+/g, "-")
      .replace(/(^-+|-+$)/g, "")
      .replace(/--+/g, "-")
      .toLowerCase();

    return { level, text, id };
  });
};
