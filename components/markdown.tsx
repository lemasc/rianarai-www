/* eslint-disable react/display-name */
import Link from "next/link";
import ReactMarkdown, { Components } from "react-markdown";
import gfm from "remark-gfm";
import Head from "next/head";
import { useState } from "react";

export default function MarkDownComponent({
  content,
  title,
}: {
  content: string;
  title?: boolean;
}): JSX.Element {
  const [contentTitle, setContentTitle] = useState<string | undefined>();
  const components: Components = {
    h1: ({ node, ...props }) => {
      if (title) setContentTitle((node.children[0] as any).value);
      return <h1 {...props} />;
    },
    li: ({ node, ordered, children, ...props }) => (
      <li {...props}>
        <div className="content-sublist">{children}</div>
      </li>
    ),
    a: ({ node, href, ...props }) => {
      if (href && (href.charAt(0) === "/" || href.charAt(0) === "#")) {
        // Use next/link for client navigation
        return (
          <Link href={href}>
            <a {...props} />
          </Link>
        );
      }
      return (
        // eslint-disable-next-line react/jsx-no-target-blank
        <a
          target={href?.includes("http") ? "_blank" : undefined}
          rel={href?.includes("http") ? "noreferrer" : undefined}
          href={href}
          {...props}
        />
      );
    },
  };
  return (
    <>
      {title && (
        <Head>
          <title>{contentTitle ? `${contentTitle} : ` : ""} RianArai Insider</title>
        </Head>
      )}
      <ReactMarkdown className="content" components={components} remarkPlugins={[gfm]}>
        {content}
      </ReactMarkdown>
    </>
  );
}
