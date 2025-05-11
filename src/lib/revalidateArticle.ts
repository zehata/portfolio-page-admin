"use server";

import { revalidateTag } from "next/cache";

export const revalidateArticle = async (articleId: string) => {
  revalidateTag(articleId);
};
