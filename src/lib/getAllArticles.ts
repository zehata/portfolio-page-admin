"use server";

import { queryAllArticles } from "@/queries/selectAllArticlesQuery";
import { ArticleType, tables } from "./types";
import { unstable_cache } from "next/cache";
import { createConnectionPool, endConnectionPool } from "./connections";

export const getAllArticles = async (articleType: ArticleType) =>
  unstable_cache(
    async (articleType: ArticleType) => {
      const pool = await createConnectionPool();

      const data = await queryAllArticles(pool, articleType);

      await endConnectionPool(pool);

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
