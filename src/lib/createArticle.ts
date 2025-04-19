"use server";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
import { insertNewArticleQuery } from "@/queries/insertNewArticle";
import { redirect } from "next/navigation";
import { ArticleType, tables } from "./ArticleTypes";

export const createArticle = async ({
  articleType,
  title,
  content,
  slug,
}: {
  articleType: ArticleType;
  title: string;
  content: string;
  slug: string;
}) => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await insertNewArticleQuery(
      connection,
      articleType,
      title,
      content,
      slug,
    );
  });

  await pool.end();
  revalidateTag(tables[articleType]);
  redirect(`/${tables[articleType]}/${data.rows[0].id}`);
};

export default createArticle;
