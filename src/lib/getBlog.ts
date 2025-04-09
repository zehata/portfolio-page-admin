"use server";

import queryBlog from "@/queries/selectBlog";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";

export const getBlog = async (blogId: string) => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await queryBlog(connection, blogId);
  });

  await pool.end();

  return {
    id: data.blog_id,
    title: data.blog_title,
    content: data.blog_content,
    slug: data.blog_slug,
  };
};

export default getBlog;
