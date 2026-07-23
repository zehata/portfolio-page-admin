"use server";

import { updateTag } from "next/cache";
import { ArticleType, tables } from "./types";

export const revalidateItems = async (articleType: ArticleType) => {
  updateTag(tables[articleType]);
};
