"server-only";

import { blogItem } from "@/zod-objects/blogItem";
import { unstable_cache } from "next/cache";
import { CommonQueryMethods, sql } from "slonik";

export const queryAllBlogs = (connection: CommonQueryMethods) =>
  unstable_cache(
    () => {
      return connection.many(sql.type(blogItem)`
        SELECT blog_id, blog_title
        FROM blogs;
      `);
    },
    [],
    { tags: ["allBlogs"] },
  )();

export default queryAllBlogs;