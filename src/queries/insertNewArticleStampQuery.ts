import { ArticleType, stampsTables } from "@/lib/types";
import { stampId } from "@/zod-objects/stampId";
import { DatabasePool, sql } from "slonik";

export const insertNewArticleStampQuery = async (
  pool: DatabasePool,
  articleType: ArticleType,
  articleId: string,
) =>
  pool.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.type(stampId)`
      INSERT INTO ${sql.identifier([stampsTables[articleType]])} (article_id, label, value, color, icon)
      VALUES (${sql.uuid(articleId)}, '', '', '#000', '')
      RETURNING id;
    `);
  });

export default insertNewArticleStampQuery;
