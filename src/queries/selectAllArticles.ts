"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { articleListItem } from "@/zod-objects/articleListItem";
import { unstable_cache } from "next/cache";
import { DatabasePool, sql } from "slonik";

export const queryAllArticles = (
  pool: DatabasePool,
  articleType: ArticleType,
) =>
  unstable_cache(
    (pool: DatabasePool, articleType: ArticleType) => {
      return pool.any(sql.type(articleListItem)`
        SELECT id, title
        FROM ${sql.identifier([tables[articleType]])};
      `);
    },
    [],
    { tags: [tables[articleType]] },
  )(pool, articleType);

export default queryAllArticles;
