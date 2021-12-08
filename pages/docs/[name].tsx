import React from "react";
import Head from "next/head";
import { Menubar, Container, Footer } from "@/components/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { readFile, readdir } from "fs/promises";
import MarkDownComponent from "@/components/markdown";
import path from "path";

type StaticPathParams = {
  name: string;
};
type StaticContentParams = {
  content: string;
};

const docsPath = path.join(process.cwd(), "docs");

export const getStaticPaths: GetStaticPaths<StaticPathParams> = async () => {
  const paths = (await readdir(docsPath)).map((c) => ({ params: { name: c.replace(".md", "") } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StaticContentParams, StaticPathParams> = async (
  context
) => {
  const content = await readFile(docsPath + `/${context.params?.name}.md`, {
    encoding: "utf-8",
  });
  if (!content) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { content },
  };
};

export default function InsiderJoinPage({ content }: { content: string }) {
  return (
    <>
      <Menubar />
      <Container>
        <div className="w-full max-w-4xl">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 sm:gap-8">
              <MarkDownComponent title content={content} />
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
