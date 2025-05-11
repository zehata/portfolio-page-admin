"use client";

import Editor from "@/components/Editor";
import { ArticleType } from "@/lib/ArticleTypes";
import deleteArticle from "@/lib/deleteArticle";
import getArticle from "@/lib/getArticle";
import { revalidateArticle } from "@/lib/revalidateArticle";
import writeArticle from "@/lib/writeArticle";
import React from "react";

const ProjectPage = ({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const [project, setProject] = React.useState<{
    id: string;
    title: string;
    content: string;
    slug: string;
  }>();

  React.useEffect(() => {
    params
      .then((params) => getArticle(ArticleType.Project, params.id))
      .then(setProject);
  }, [params]);

  return (
    <>
      {project && (
        <Editor
          buttonLabel="Update project"
          databaseArticle={project}
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
              articleType: ArticleType.Project,
              id: project.id,
              title,
              content,
              slug,
            });
          }}
          revalidateArticle={() => revalidateArticle(project.id)}
          deleteArticle={() =>
            deleteArticle({
              articleType: ArticleType.Project,
              id: project.id,
            })
          }
        />
      )}
    </>
  );
};

export default ProjectPage;
