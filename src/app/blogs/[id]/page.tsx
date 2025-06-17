"use client";

import Editor from "@/components/Editor";
import { ArticleType, Stamps } from "@/lib/types";
import createArticleStamp from "@/lib/createArticleStamp";
import deleteArticle from "@/lib/deleteArticle";
import deleteStamp from "@/lib/deleteStamp";
import getArticle from "@/lib/getArticle";
import { revalidateArticle } from "@/lib/revalidateArticle";
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
    stamps: Stamps;
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
            stamps,
          }: {
            title: string;
            content: string;
            slug: string;
            stamps: Stamps;
          }) =>
            writeArticle({
              id: blog.id,
              articleType: ArticleType.Blog,
              title,
              content,
              slug,
              stamps,
            })
          }
          revalidateArticle={() => revalidateArticle(blog.id)}
          deleteArticle={() =>
            deleteArticle({
              articleType: ArticleType.Blog,
              id: blog.id,
            })
          }
          createStamp={() =>
            createArticleStamp({
              articleType: ArticleType.Blog,
              articleId: blog.id,
            })
          }
          deleteStamp={(id: string) =>
            deleteStamp({
              articleType: ArticleType.Blog,
              articleId: blog.id,
              id,
            })
          }
        />
      )}
    </>
  );
};

export default BlogPage;
