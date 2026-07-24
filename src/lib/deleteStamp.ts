"use server";
import { updateTag } from "next/cache";
import { ArticleType } from "./types";
import deleteArticleStampQuery from "@/queries/deleteArticleStampQuery";
import { createConnectionPool, endConnectionPool } from "./connections";

export const deleteStamp = async ({
  articleType,
  articleId,
  id,
}: {
  articleType: ArticleType;
  articleId: string;
  id: string;
}) => {
  const pool = await createConnectionPool();

  await deleteArticleStampQuery(pool, articleType, id);

  await endConnectionPool(pool);

  updateTag(articleId);
};

export default deleteStamp;
