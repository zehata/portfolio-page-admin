"use client";

import Editor from "@/components/Editor";
import createArticle from "@/lib/createArticle";
import { ArticleType } from "@/lib/types";
import React from "react";

const BlogPage = () => {
  return (
    <Editor
      buttonLabel="Create blog"
      databaseArticle={{
        title: "",
        content: "",
        slug: "",
        stamps: {},
      }}
      saveArticle={({
        title,
        content,
        slug,
      }: {
        title: string;
        content: string;
        slug: string;
      }) => {
        return createArticle({
          articleType: ArticleType.Blog,
          title,
          content,
          slug,
        });
      }}
    />
  );
};

export default BlogPage;
