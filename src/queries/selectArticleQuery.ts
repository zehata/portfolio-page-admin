"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { article } from "@/zod-objects/article";
import { DatabasePool, sql } from "slonik";

export const queryArticle = async (
  pool: DatabasePool,
  articleType: ArticleType,
  blogId: string,
) =>
  pool.one(sql.type(article)`
    SELECT id, title, created, modified, content, slug
    FROM ${sql.identifier([tables[articleType]])}
    WHERE id=${sql.uuid(blogId)};
  `);

export default queryArticle;
