import { blogId } from "@/zod-objects/blogId";
import { CommonQueryMethods, sql } from "slonik";

export const insertNewBlogQuery = (
  connection: CommonQueryMethods,
  blogTitle: string,
  blogContent: string,
  blogSlug: string,
) =>
  connection.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.type(blogId)`
      INSERT INTO blogs (blog_title, blog_content, blog_created, blog_modified, blog_slug)
      VALUES (${blogTitle}, ${blogContent}, NOW(), NOW(), ${blogSlug})
      RETURNING blog_id;
    `);
  });
