"use server";

import Connection from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
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

  revalidateTag(articleId);
};

export default deleteStamp;
