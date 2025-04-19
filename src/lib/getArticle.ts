"use server";

import queryArticle from "@/queries/selectArticle";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { ArticleType } from "./ArticleTypes";

export const getArticle = async (articleType: ArticleType, blogId: string) => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await queryArticle(connection, articleType, blogId);
  });

  await pool.end();

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    slug: data.slug,
  };
};

export default getArticle;
