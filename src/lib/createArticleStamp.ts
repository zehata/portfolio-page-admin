"use server";
import { updateTag } from "next/cache";
import { ArticleType } from "./types";
import insertNewArticleStampQuery from "@/queries/insertNewArticleStampQuery";
import { createConnectionPool, endConnectionPool } from "./connections";

export const createArticleStamp = async ({
  articleType,
  articleId,
}: {
  articleType: ArticleType;
  articleId: string;
}) => {
  const pool = await createConnectionPool();

  const data = await insertNewArticleStampQuery(pool, articleType, articleId);

  await endConnectionPool(pool);

  updateTag(articleId);

  return Promise.resolve(data.rows[0].id);
};

export default createArticleStamp;
