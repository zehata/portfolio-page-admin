"use server";

import Connection from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
import { ArticleType, tables } from "./ArticleTypes";
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

  revalidateTag(id);
  revalidateTag(tables[articleType]);

  redirect(`/${tables[articleType]}`);
};

export default deleteArticle;
