import { z } from "zod";

export const article = z.object({
  id: z.string(),
  title: z.string(),
  created: z.string(),
  modified: z.string(),
  content: z.string(),
  slug: z.string(),
});
