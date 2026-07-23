"use server";
import Connection from "./createDatabaseConnectionPool";
import { updateTag } from "next/cache";
import { ArticleType } from "./types";
import insertNewArticleStampQuery from "@/queries/insertNewArticleStampQuery";

export const createArticleStamp = async ({
  articleType,
  articleId,
}: {
  articleType: ArticleType;
  articleId: string;
}) => {
  const pool = await Connection.requestConnectionPool();

  const data = await insertNewArticleStampQuery(pool, articleType, articleId);

  await Connection.requestConnectionPoolEnd();

  updateTag(articleId);

  return Promise.resolve(data.rows[0].id);
};

export default createArticleStamp;
