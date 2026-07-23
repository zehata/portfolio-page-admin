"use server";

import { updateTag } from "next/cache";

export const revalidateArticle = async (articleId: string) => {
  updateTag(articleId);
};
