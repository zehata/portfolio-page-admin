"use client";

import Editor from "@/components/Editor";
import { createBlog } from "@/lib/createBlog";
import getBlog from "@/lib/getBlog";
import { writeBlog } from "@/lib/writeBlog";
import React from "react";

export const BlogPage = () => {
  return <Editor
    buttonLabel="Create"
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
      createBlog({
        title,
        content,
        slug,
      })
    }}
  />
}

export default BlogPage;