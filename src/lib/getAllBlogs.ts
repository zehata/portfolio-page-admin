"use server";

import { queryAllBlogs } from "@/queries/selectAllBlogs";
import { createDatabaseConnectionPool } from "./createDatabaseConnectionPool";

export const getAllBlogs = async () => {
  const pool = await createDatabaseConnectionPool();

  const data = await pool.connect(async (connection) => {
    return await queryAllBlogs(connection);
  });

  await pool.end();

  return data.map((data) => {
    return {
      blogId: data.blog_id,
      blogTitle: data.blog_title,
    };
  });
};

export default getAllBlogs;
