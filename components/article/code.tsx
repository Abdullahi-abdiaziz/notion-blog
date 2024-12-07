import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return match ? (
    // @ts-ignore
    <SyntaxHighlighter
      children={String(children).replace(/\n$/, "")}
      theme={xcode}
      // style={github as any}
      className={`bg-transparent`}
      language={match[1]}
      {...props}
    />
  ) : (
    <code
      className={`bg-rose-100 dark:bg-rose-100 text-pink-800 dark:text-pink-800 font- font-semibold text-sm m-0 rounded-sm`}
      {...props}
    >
      {children}
    </code>
  );
};

export default Code;
