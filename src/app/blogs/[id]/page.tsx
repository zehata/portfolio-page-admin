"use client";

import Editor from "@/components/Editor";
import { ArticleType } from "@/lib/ArticleTypes";
import deleteArticle from "@/lib/deleteArticle";
import getArticle from "@/lib/getArticle";
import writeArticle from "@/lib/writeArticle";
import React from "react";

const BlogPage = ({
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
    params
      .then((params) => getArticle(ArticleType.Blog, params.id))
      .then(setBlog);
  }, [params]);

  return (
    <>
      {blog && (
        <Editor
          buttonLabel="Update blog"
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
            return writeArticle({
              id: blog.id,
              articleType: ArticleType.Blog,
              title,
              content,
              slug,
            });
          }}
          deleteArticle={() =>
            deleteArticle({
              articleType: ArticleType.Blog,
              id: blog.id,
            })
          }
        />
      )}
    </>
  );
};

export default BlogPage;
