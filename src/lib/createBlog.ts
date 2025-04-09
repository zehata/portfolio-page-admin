"use server";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";
import { revalidateTag } from "next/cache";
import { insertNewBlogQuery } from "@/queries/insertNewBlog";
import { redirect } from "next/navigation";

export const createBlog = async ({
  title,
  content,
  slug,
}: {
  title: string;
  content: string;
  slug: string;
}) => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await insertNewBlogQuery(connection, title, content, slug);
  });

  await pool.end();
  revalidateTag("allBlogs");
  redirect(`/blogs/${data.rows[0].blog_id}`);
};
