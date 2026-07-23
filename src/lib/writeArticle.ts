"use server";

import { updateArticleQuery } from "@/queries/updateArticleQuery";
import Connection from "./createDatabaseConnectionPool";
import { updateTag } from "next/cache";
import { ArticleType, Stamps, tables } from "./types";
import updateStampQuery from "@/queries/updateStampQuery";

export const writeArticle = async ({
  articleType,
  id,
  title,
  content,
  slug,
  stamps,
}: {
  articleType: ArticleType;
  id: string;
  title: string;
  content: string;
  slug: string;
  stamps: Stamps;
}) => {
  const pool = await Connection.requestConnectionPool();

  await updateArticleQuery(pool, articleType, id, title, content, slug);
  await updateStampQuery(pool, articleType, stamps);

  await Connection.requestConnectionPoolEnd();

  updateTag(id);
  updateTag(tables[articleType]);

  return Promise.resolve();
};

export default writeArticle;
