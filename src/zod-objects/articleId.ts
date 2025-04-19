import { z } from "zod";

export const articleId = z.object({
  id: z.string(),
});
