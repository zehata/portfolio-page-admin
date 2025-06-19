"use server";
import Connection from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
import { insertNewArticleQuery } from "@/queries/insertNewArticleQuery";
import { redirect } from "next/navigation";
import { ArticleType, tables } from "./types";

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

  revalidateTag(tables[articleType]);
  redirect(`/${tables[articleType]}/${data.rows[0].id}`);

  return Promise.resolve();
};

export default createArticle;
