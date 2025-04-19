"use server";

import queryArticle from "@/queries/selectArticleQuery";
import { ArticleType } from "./ArticleTypes";
import Connection from "./createDatabaseConnectionPool";

export const getArticle = async (articleType: ArticleType, blogId: string) => {
  const pool = await Connection.requestConnectionPool();

  const data = await queryArticle(pool, articleType, blogId);

  await Connection.requestConnectionPoolEnd();

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    slug: data.slug,
  };
};

export default getArticle;
