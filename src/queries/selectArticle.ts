"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { article } from "@/zod-objects/article";
import { unstable_cache } from "next/cache";
import { DatabasePool, sql } from "slonik";

export const queryArticle = (
  pool: DatabasePool,
  articleType: ArticleType,
  blogId: string,
) =>
  unstable_cache(
    (pool: DatabasePool, articleType: ArticleType, blogId: string) => {
      return pool.one(sql.type(article)`
        SELECT id, title, created, modified, content, slug
        FROM ${sql.identifier([tables[articleType]])}
        WHERE id=${sql.uuid(blogId)};
      `);
    },
    [],
    { tags: [blogId] },
  )(pool, articleType, blogId);

export default queryArticle;
