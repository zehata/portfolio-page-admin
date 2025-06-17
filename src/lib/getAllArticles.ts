"use server";

import { queryAllArticles } from "@/queries/selectAllArticlesQuery";
import { ArticleType, tables } from "./types";
import Connection from "./createDatabaseConnectionPool";
import { unstable_cache } from "next/cache";

export const getAllArticles = async (articleType: ArticleType) =>
  unstable_cache(
    async (articleType: ArticleType) => {
      const pool = await Connection.requestConnectionPool();

      const data = await queryAllArticles(pool, articleType);

      await Connection.requestConnectionPoolEnd();

      return data.map((data) => {
        return {
          id: data.id,
          title: data.title,
        };
      });
    },
    [],
    { tags: [tables[articleType]] },
  )(articleType);

export default getAllArticles;
