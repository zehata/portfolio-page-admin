"use server";

import { queryAllArticles } from "@/queries/selectAllArticlesQuery";
import { ArticleType } from "./ArticleTypes";
import Connection from "./createDatabaseConnectionPool";

export const getAllArticles = async (articleType: ArticleType) => {
  const pool = await Connection.requestConnectionPool();

  const data = await queryAllArticles(pool, articleType);

  await Connection.requestConnectionPoolEnd();

  return data.map((data) => {
    return {
      id: data.id,
      title: data.title,
    };
  });
};

export default getAllArticles;
