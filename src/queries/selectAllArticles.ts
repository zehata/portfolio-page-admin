"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { articleListItem } from "@/zod-objects/articleListItem";
import { unstable_cache } from "next/cache";
import { CommonQueryMethods, sql } from "slonik";

export const queryAllArticles = (
  connection: CommonQueryMethods,
  articleType: ArticleType,
) =>
  unstable_cache(
    (articleType: ArticleType) => {
      return connection.any(sql.type(articleListItem)`
        SELECT id, title
        FROM ${sql.identifier([tables[articleType]])};
      `);
    },
    [],
    { tags: [tables[articleType]] },
  )(articleType);

export default queryAllArticles;
