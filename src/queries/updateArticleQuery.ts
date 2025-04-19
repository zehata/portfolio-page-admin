"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { createSqlTag, DatabasePool } from "slonik";
import { z } from "zod";

const sql = createSqlTag({
  typeAliases: {
    void: z.object({}).strict(),
  },
});

export const updateArticleQuery = async (
  pool: DatabasePool,
  articleType: ArticleType,
  id: string,
  title: string,
  content: string,
  slug: string,
) =>
  pool.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.typeAlias("void")`
      UPDATE ${sql.identifier([tables[articleType]])}
      SET title=${title}, content=${content}, modified=NOW(), slug=${slug}
      WHERE id=${sql.uuid(id)};
    `);
  });

export default updateArticleQuery;
