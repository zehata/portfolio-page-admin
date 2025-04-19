"server-only";

import { ArticleType, tables } from "@/lib/ArticleTypes";
import { article } from "@/zod-objects/article";
import { unstable_cache } from "next/cache";
import { CommonQueryMethods, sql } from "slonik";

export const queryArticle = (
  connection: CommonQueryMethods,
  articleType: ArticleType,
  blogId: string,
) =>
  unstable_cache(
    (articleType: ArticleType, blogId: string) => {
      return connection.one(sql.type(article)`
        SELECT id, title, created, modified, content, slug
        FROM ${sql.identifier([tables[articleType]])}
        WHERE id=${sql.uuid(blogId)};
      `);
    },
    [],
    { tags: [blogId] },
  )(articleType, blogId);

export default queryArticle;
