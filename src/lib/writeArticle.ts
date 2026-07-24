"use server";

import { updateArticleQuery } from "@/queries/updateArticleQuery";
import { updateTag } from "next/cache";
import { ArticleType, Stamps, tables } from "./types";
import updateStampQuery from "@/queries/updateStampQuery";
import { isEmpty } from "lodash";
import { createConnectionPool, endConnectionPool } from "./connections";

export const writeArticle = async ({
  articleType,
  id,
  title,
  content,
  slug,
  stamps,
}: {
  articleType: ArticleType;
  id: string;
  title: string;
  content: string;
  slug: string;
  stamps: Stamps;
}) => {
  const pool = await createConnectionPool();

  await updateArticleQuery(pool, articleType, id, title, content, slug);
  if (!isEmpty(stamps)) {
    await updateStampQuery(pool, articleType, stamps);
  }

  await endConnectionPool(pool);

  updateTag(id);
  updateTag(tables[articleType]);

  return Promise.resolve();
};

export default writeArticle;
