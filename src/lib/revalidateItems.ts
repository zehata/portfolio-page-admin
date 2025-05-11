"use server";

import { revalidateTag } from "next/cache";
import { ArticleType, tables } from "./ArticleTypes";

export const revalidateItems = async (articleType: ArticleType) => {
  revalidateTag(tables[articleType]);
};
