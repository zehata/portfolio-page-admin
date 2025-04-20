"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { articleListItem } from "@/zod-objects/articleListItem";
import { DatabasePool, sql } from "slonik";

export const queryAllArticles = async (
  pool: DatabasePool,
  articleType: ArticleType,
) =>
  pool.any(sql.type(articleListItem)`
    SELECT id, title
    FROM ${sql.identifier([tables[articleType]])}
    ORDER BY created DESC;
  `);

export default queryAllArticles;
