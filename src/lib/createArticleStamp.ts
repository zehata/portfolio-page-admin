"use server";
import Connection from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
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

  revalidateTag(articleId);

  return Promise.resolve(data.rows[0].id);
};

export default createArticleStamp;
