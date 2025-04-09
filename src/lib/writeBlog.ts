"use server";

import { updateBlogQuery } from "@/queries/updateBlog";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";

export const writeBlog = async ({
  id,
  title,
  content,
  slug,
}: {
  id: string;
  title: string;
  content: string;
  slug: string;
}) => {
  const pool = await createDatabaseConnectionPool();

  await pool.connect(async (connection) => {
    return await updateBlogQuery(connection, id, title, content, slug);
  });

  await pool.end();
  revalidateTag(id);
  revalidateTag("allBlogs");
};
