"use server";

import Connection from "./createDatabaseConnectionPool";
import { updateTag } from "next/cache";
import { ArticleType, tables } from "./types";
import deleteArticleQuery from "@/queries/deleteArticleQuery";
import { redirect } from "next/navigation";

export const deleteArticle = async ({
  articleType,
  id,
}: {
  articleType: ArticleType;
  id: string;
}) => {
  const pool = await Connection.requestConnectionPool();

  await deleteArticleQuery(pool, articleType, id);

  await Connection.requestConnectionPoolEnd();

  updateTag(id);
  updateTag(tables[articleType]);

  redirect(`/${tables[articleType]}`);
};

export default deleteArticle;
