"use client";

import Editor from "@/components/Editor";
import { ArticleType, Stamps } from "@/lib/types";
import deleteArticle from "@/lib/deleteArticle";
import getArticle from "@/lib/getArticle";
import { revalidateArticle } from "@/lib/revalidateArticle";
import writeArticle from "@/lib/writeArticle";
import React from "react";
import createArticleStamp from "@/lib/createArticleStamp";
import deleteStamp from "@/lib/deleteStamp";

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
    stamps: Stamps;
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
            stamps,
          }: {
            title: string;
            content: string;
            slug: string;
            stamps: Stamps;
          }) => {
            return writeArticle({
              articleType: ArticleType.Project,
              id: project.id,
              title,
              content,
              slug,
              stamps,
            });
          }}
          revalidateArticle={() => revalidateArticle(project.id)}
          deleteArticle={() =>
            deleteArticle({
              articleType: ArticleType.Project,
              id: project.id,
            })
          }
          createStamp={() =>
            createArticleStamp({
              articleType: ArticleType.Project,
              articleId: project.id,
            })
          }
          deleteStamp={(id: string) =>
            deleteStamp({
              articleType: ArticleType.Project,
              articleId: project.id,
              id,
            })
          }
        />
      )}
    </>
  );
};

export default ProjectPage;
