import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { twilight } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

const Code: React.FC<CodeProps> = ({ className, children, ...props }) => {
  // Extract the language from the className if present
  const match = /language-(\w+)/.exec(className || "");

  return match ? (
    <SyntaxHighlighter
      style={twilight}
      showLineNumbers={true}
      language={match[1]}
      className="bg-slate-100 dark:bg-slate-800"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code
      className="bg-neutral-900 dark:bg-neutral-100 text-stone-300 dark:text-pink-800 font-semibold text-sm m-0 rounded-sm px-2 p-1.5"
      {...props}
    >
      {children}
    </code>
  );
};

export default Code;
