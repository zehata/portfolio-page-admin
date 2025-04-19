"use server";

import { updateArticleQuery } from "@/queries/updateArticle";
import Connection from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
import { ArticleType, tables } from "./ArticleTypes";

export const writeArticle = async ({
  articleType,
  id,
  title,
  content,
  slug,
}: {
  articleType: ArticleType;
  id: string;
  title: string;
  content: string;
  slug: string;
}) => {
  const pool = await Connection.requestConnectionPool();

  await updateArticleQuery(pool, articleType, id, title, content, slug);

  await Connection.requestConnectionPoolEnd();

  revalidateTag(id);
  revalidateTag(tables[articleType]);
};

export default writeArticle;
