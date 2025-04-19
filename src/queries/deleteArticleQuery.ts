import { ArticleType, tables } from "@/lib/ArticleTypes";
import { createSqlTag, DatabasePool } from "slonik";
import { z } from "zod";

const sql = createSqlTag({
  typeAliases: {
    void: z.object({}).strict(),
  },
});

export const deleteArticleQuery = async (
  pool: DatabasePool,
  articleType: ArticleType,
  id: string,
) => {
  pool.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.typeAlias("void")`
      DELETE FROM ${sql.identifier([tables[articleType]])}
      WHERE id=${sql.uuid(id)};
    `);
  });
};

export default deleteArticleQuery;
