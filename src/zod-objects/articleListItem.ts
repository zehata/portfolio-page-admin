import { z } from "zod";

export const articleListItem = z.object({
  id: z.string(),
  title: z.string(),
});
