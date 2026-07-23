"use server";
import Connection from "./createDatabaseConnectionPool";
import { insertNewArticleQuery } from "@/queries/insertNewArticleQuery";
import { redirect } from "next/navigation";
import { ArticleType, tables } from "./types";
import { updateTag } from "next/cache";

export const createArticle = async ({
  articleType,
  title,
  content,
  slug,
}: {
  articleType: ArticleType;
  title: string;
  content: string;
  slug: string;
}) => {
  const pool = await Connection.requestConnectionPool();

  const data = await insertNewArticleQuery(
    pool,
    articleType,
    title,
    content,
    slug,
  );

  await Connection.requestConnectionPoolEnd();

  updateTag(tables[articleType]);
  redirect(`/${tables[articleType]}/${data.rows[0].id}`);

  return Promise.resolve();
};

export default createArticle;
