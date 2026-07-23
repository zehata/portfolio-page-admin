"use server";

import Connection from "./createDatabaseConnectionPool";
import { updateTag } from "next/cache";
import { ArticleType } from "./types";
import deleteArticleStampQuery from "@/queries/deleteArticleStampQuery";

export const deleteStamp = async ({
  articleType,
  articleId,
  id,
}: {
  articleType: ArticleType;
  articleId: string;
  id: string;
}) => {
  const pool = await Connection.requestConnectionPool();

  await deleteArticleStampQuery(pool, articleType, id);

  await Connection.requestConnectionPoolEnd();

  updateTag(articleId);
};

export default deleteStamp;
