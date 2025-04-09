"server-only";

import { CommonQueryMethods, createSqlTag } from "slonik";
import { z } from "zod";

const sql = createSqlTag({
  typeAliases: {
    void: z.object({}).strict(),
  },
});

export const updateBlogQuery = (
  connection: CommonQueryMethods,
  blogId: string,
  blogTitle: string,
  blogContent: string,
  blogSlug: string,
) =>
  connection.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.typeAlias("void")`
      UPDATE blogs
      SET blog_title=${blogTitle}, blog_content=${blogContent}, blog_modified=NOW(), blog_slug=${blogSlug}
      WHERE blog_id=${sql.uuid(blogId)};
    `);
  });
