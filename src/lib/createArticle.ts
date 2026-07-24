"use server";
import { insertNewArticleQuery } from "@/queries/insertNewArticleQuery";
import { redirect } from "next/navigation";
import { ArticleType, tables } from "./types";
import { updateTag } from "next/cache";
import { createConnectionPool, endConnectionPool } from "./connections";

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
  const pool = await createConnectionPool();

  const data = await insertNewArticleQuery(
    pool,
    articleType,
    title,
    content,
    slug,
  );

  await endConnectionPool(pool);

  updateTag(tables[articleType]);
  redirect(`/${tables[articleType]}/${data.rows[0].id}`);
};

export default createArticle;
