"use server";

import queryArticle from "@/queries/selectArticleQuery";
import { ArticleType } from "./types";
import Connection from "./createDatabaseConnectionPool";
import { unstable_cache } from "next/cache";
import queryArticleStamps from "@/queries/selectArticleStampsQuery";
import { keyBy } from "lodash";

export const getArticle = async (articleType: ArticleType, id: string) =>
  unstable_cache(
    async (articleType: ArticleType, id: string) => {
      const pool = await Connection.requestConnectionPool();

      const [articleData, stampsData] = await Promise.all([
        queryArticle(pool, articleType, id),
        queryArticleStamps(pool, articleType, id),
      ]);

      await Connection.requestConnectionPoolEnd();

      return {
        id: articleData.id,
        title: articleData.title,
        content: articleData.content,
        slug: articleData.slug,
        stamps: keyBy(stampsData, "id"),
      };
    },
    [],
    { tags: [id] },
  )(articleType, id);

export default getArticle;
