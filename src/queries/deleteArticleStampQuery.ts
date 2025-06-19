import { ArticleType, stampsTables } from "@/lib/types";
import { createSqlTag, DatabasePool } from "slonik";
import { z } from "zod";

const sql = createSqlTag({
  typeAliases: {
    void: z.object({}).strict(),
  },
});

export const deleteArticleStampQuery = async (
  pool: DatabasePool,
  articleType: ArticleType,
  id: string,
) => {
  pool.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.typeAlias("void")`
      DELETE FROM ${sql.identifier([stampsTables[articleType]])}
      WHERE id=${sql.uuid(id)};
    `);
  });
};

export default deleteArticleStampQuery;
