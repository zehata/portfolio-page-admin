import { ArticleType, tables } from "@/lib/ArticleTypes";
import { articleId } from "@/zod-objects/articleId";
import { CommonQueryMethods, sql } from "slonik";

export const insertNewArticleQuery = (
  connection: CommonQueryMethods,
  articleType: ArticleType,
  title: string,
  content: string,
  slug: string,
) =>
  connection.transaction(async (transactionConnection) => {
    return transactionConnection.query(sql.type(articleId)`
      INSERT INTO ${sql.identifier([tables[articleType]])} (title, content, created, modified, slug)
      VALUES (${title}, ${content}, NOW(), NOW(), ${slug})
      RETURNING id;
    `);
  });

export default insertNewArticleQuery;
