"server-only";

import { ArticleType, stampsTables } from "@/lib/types";
import { stamps } from "@/zod-objects/stamps";
import { DatabasePool, sql } from "slonik";

export const queryArticleStamps = async (
  pool: DatabasePool,
  articleType: ArticleType,
  articleId: string,
) =>
  pool.any(sql.type(stamps)`
    SELECT id, label, value, color, icon
    FROM ${sql.identifier([stampsTables[articleType]])}
    WHERE article_id=${sql.uuid(articleId)};
  `);

export default queryArticleStamps;
