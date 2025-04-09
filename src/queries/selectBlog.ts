"server-only";

import { blog } from "@/zod-objects/blog";
import { unstable_cache } from "next/cache";
import { CommonQueryMethods, sql } from "slonik";

export const queryBlog = (connection: CommonQueryMethods, blogId: string) =>
  unstable_cache(
    (blogId: string) => {
      return connection.one(sql.type(blog)`
        SELECT blog_id, blog_title, blog_created, blog_modified, blog_content, blog_slug
        FROM blogs
        WHERE blog_id=${sql.uuid(blogId)};
      `);
    },
    [],
    { tags: [blogId] },
  )(blogId);

export default queryBlog;