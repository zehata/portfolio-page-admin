"use server";

import { updateArticleQuery } from "@/queries/updateArticle";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
import { ArticleType, tables } from "./ArticleTypes";

export const writeArticle = async ({
  articleType,
  id,
  title,
  content,
  slug,
}: {
  articleType: ArticleType;
  id: string;
  title: string;
  content: string;
  slug: string;
}) => {
  const pool = await createDatabaseConnectionPool();

  await pool.connect(async (connection) => {
    return await updateArticleQuery(
      connection,
      articleType,
      id,
      title,
      content,
      slug,
    );
  });

  await pool.end();
  revalidateTag(id);
  revalidateTag(tables[articleType]);
};

export default writeArticle;
