"use server";

import { queryAllArticles } from "@/queries/selectAllArticles";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { ArticleType } from "./ArticleTypes";

export const getAllArticles = async (articleType: ArticleType) => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await queryAllArticles(connection, articleType);
  });

  await pool.end();

  return data.map((data) => {
    return {
      id: data.id,
      title: data.title,
    };
  });
};

export default getAllArticles;
