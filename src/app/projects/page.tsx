"use client";

import Editor from "@/components/Editor";
import createArticle from "@/lib/createArticle";
import { ArticleType } from "@/lib/ArticleTypes";
import React from "react";

const ProjectPage = () => {
  return (
    <Editor
      buttonLabel="Create project"
      databaseArticle={{
        title: "",
        content: "",
        slug: "",
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
          articleType: ArticleType.Project,
          title,
          content,
          slug,
        });
      }}
    />
  );
};

export default ProjectPage;
