"use client";

import Editor from "@/components/Editor";
import getBlog from "@/lib/getBlog";
import { writeBlog } from "@/lib/writeBlog";
import React from "react";

export const BlogPage = ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const [blog, setBlog] = React.useState<{
    id: string;
    title: string;
    content: string;
    slug: string;
  }>();

  React.useEffect(() => {
    params.then((params) => getBlog(params.id)).then(setBlog);
  }, [params]);

  return (
    <>
      {blog && (
        <Editor
          buttonLabel="Update"
          databaseArticle={blog}
          saveArticle={({
            title,
            content,
            slug,
          }: {
            title: string;
            content: string;
            slug: string;
          }) => {
            writeBlog({
              id: blog.id,
              title,
              content,
              slug,
            });
          }}
        />
      )}
    </>
  );
};

export default BlogPage;
