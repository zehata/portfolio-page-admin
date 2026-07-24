"use server";

import { updateTag } from "next/cache";
import { ArticleType, tables } from "./types";
import deleteArticleQuery from "@/queries/deleteArticleQuery";
import { redirect } from "next/navigation";
import { createConnectionPool, endConnectionPool } from "./connections";

export const deleteArticle = async ({
  articleType,
  id,
}: {
  articleType: ArticleType;
  id: string;
}) => {
  const pool = await createConnectionPool();

  await deleteArticleQuery(pool, articleType, id);

  await endConnectionPool(pool);

  updateTag(id);
  updateTag(tables[articleType]);

  redirect(`/${tables[articleType]}`);
};

export default deleteArticle;
